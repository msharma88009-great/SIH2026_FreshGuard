def require_fields(payload,fields): return [f for f in fields if payload.get(f) in (None,"")]
def is_number(value):
    try: float(value); return True
    except (TypeError,ValueError): return False
