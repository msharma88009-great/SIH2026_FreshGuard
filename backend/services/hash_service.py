import hashlib,json
def calculate_record_hash(record):
    raw=json.dumps(record,sort_keys=True,separators=(",",":"),default=str)
    return hashlib.sha256(raw.encode()).hexdigest()
def verify_hash(p):
    if p.get("record") is None or not p.get("expected_hash"): return {"success":False,"error":"record and expected_hash are required"}
    calculated=calculate_record_hash(p["record"]); return {"success":True,"valid":calculated==str(p["expected_hash"]).lower(),"calculated_hash":calculated,"expected_hash":p["expected_hash"]}
