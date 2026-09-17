from datetime import datetime, timezone
from uuid import uuid4
from services.freshness_service import calculate_freshness_score
from services.hash_service import calculate_record_hash
from utils.database import db

def now():
    return datetime.now(timezone.utc).isoformat()

def get_shipments(): return db.find_many('shipments')
def get_shipment(sid): return db.find_one('shipments', {'shipment_id': sid})

def create_shipment(p):
    missing = [x for x in ('product', 'origin', 'destination') if not p.get(x)]
    if missing: return {'success': False, 'error': 'Missing fields: ' + ', '.join(missing)}
    x = {'shipment_id': p.get('shipment_id') or 'FG-' + uuid4().hex[:8].upper(), 'product': p['product'], 'origin': p['origin'], 'destination': p['destination'], 'status': p.get('status', 'Active'), 'freshness_score': float(p.get('freshness_score', 100)), 'created_at': now()}
    db.insert_one('shipments', x)
    return {'success': True, 'data': x}

def get_sensor_readings(sid=None):
    return db.find_many('sensor_readings', {'shipment_id': sid} if sid else {})

def create_sensor_alerts(shipment_id, temperature, humidity, gas_level, vibration=False, reed_open=False):
    alerts = []
    if temperature > 8: alerts.append(('Temperature', 'Critical' if temperature > 10 else 'High', f'Temperature is too high: {temperature}°C'))
    if humidity > 75: alerts.append(('Humidity', 'Medium', f'Humidity is above safe level: {humidity}%'))
    if gas_level > 100: alerts.append(('Gas', 'Critical', f'Gas reading is above threshold: {gas_level} raw'))
    if vibration: alerts.append(('Vibration', 'High', 'Vibration detected during shipment. Possible rough handling or impact.'))
    if reed_open: alerts.append(('Container', 'Critical', 'Container access detected. Reed switch is open.'))
    result = []
    for alert_type, severity, message in alerts:
        item = {'alert_id': 'AL-' + uuid4().hex[:10].upper(), 'shipment_id': shipment_id, 'alert_type': alert_type, 'severity': severity, 'message': message, 'timestamp': now(), 'acknowledged': False}
        db.insert_one('alerts', item); result.append(item)
    return result

def _normalize_record(p):
    temperature = float(p['temperature']); humidity = float(p['humidity']); gas = float(p['gas_level'])
    x = {'reading_id': p.get('reading_id') or 'RD-' + uuid4().hex[:10].upper(), 'shipment_id': str(p['shipment_id']), 'device_id': p.get('device_id', 'FG-ESP32-01'), 'temperature': temperature, 'humidity': humidity, 'gas_level': gas, 'vibration': bool(p.get('vibration', False)), 'reed_open': bool(p.get('reed_open', False)), 'timestamp': p.get('timestamp', now()), 'location': p.get('location', {}), 'storage_mode': p.get('storage_mode', 'online')}
    x['freshness_score'] = calculate_freshness_score(temperature, humidity, gas)
    x['record_hash'] = calculate_record_hash(x)
    return x

def add_sensor_reading(p):
    missing = [x for x in ('shipment_id', 'temperature', 'humidity', 'gas_level') if x not in p]
    if missing: return {'success': False, 'error': 'Missing fields: ' + ', '.join(missing)}
    existing = db.find_one('sensor_readings', {'reading_id': p.get('reading_id')}) if p.get('reading_id') else None
    if existing: return {'success': True, 'duplicate': True, 'data': existing, 'alerts_generated': 0}
    x = _normalize_record(p); db.insert_one('sensor_readings', x)
    alerts = create_sensor_alerts(x['shipment_id'], x['temperature'], x['humidity'], x['gas_level'], x['vibration'], x['reed_open'])
    return {'success': True, 'duplicate': False, 'data': x, 'alerts_generated': len(alerts)}

def sync_sensor_readings(records):
    if not isinstance(records, list): return {'success': False, 'error': 'records must be an array'}
    synced = 0; duplicates = 0; errors = []
    for index, record in enumerate(records):
        try:
            result = add_sensor_reading({**record, 'storage_mode': 'synced_from_sd'})
            if result.get('duplicate'): duplicates += 1
            elif result.get('success'): synced += 1
        except (TypeError, ValueError, KeyError) as exc: errors.append({'index': index, 'error': str(exc)})
    return {'success': len(errors) == 0, 'synced': synced, 'duplicates': duplicates, 'errors': errors}

def get_alerts(): return db.find_many('alerts')

def add_traceability_event(p):
    missing = [x for x in ('shipment_id', 'stage', 'location') if not p.get(x)]
    if missing: return {'success': False, 'error': 'Missing fields: ' + ', '.join(missing)}
    x = {'event_id': p.get('event_id') or 'EV-' + uuid4().hex[:10].upper(), 'shipment_id': p['shipment_id'], 'stage': p['stage'], 'actor': p.get('actor', 'Fresh Guard'), 'location': p['location'], 'timestamp': p.get('timestamp', now()), 'metadata': p.get('metadata', {})}
    db.insert_one('traceability', x); return {'success': True, 'data': x}

def get_traceability(sid): return db.find_many('traceability', {'shipment_id': sid})
