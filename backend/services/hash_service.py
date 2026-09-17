import hashlib
import json

def calculate_record_hash(record):
    clean = {k: v for k, v in record.items() if k not in {'record_hash', '_id'}}
    raw = json.dumps(clean, sort_keys=True, separators=(',', ':'), default=str)
    return hashlib.sha256(raw.encode()).hexdigest()

def verify_hash(payload):
    if not payload.get('record') or not payload.get('expected_hash'):
        return {'success': False, 'error': 'record and expected_hash are required'}

    record = payload['record']

    if isinstance(record, str):
        try:
            record = json.loads(record)
        except json.JSONDecodeError:
            return {'success': False, 'error': 'record must contain valid JSON'}

    if not isinstance(record, dict):
        return {'success': False, 'error': 'record must be a JSON object'}

    calculated = calculate_record_hash(record)
    expected = str(payload['expected_hash']).lower()

    return {
        'success': True,
        'valid': calculated == expected,
        'calculated_hash': calculated,
        'expected_hash': expected
    }
