import os,copy
try:
    from pymongo import MongoClient
except ImportError:
    MongoClient=None
class Database:
    def __init__(self):
        self.memory={"shipments":[],"sensor_readings":[],"alerts":[],"traceability":[]}; self.db=None
        if MongoClient:
            try:
                c=MongoClient(os.getenv("MONGO_URI","mongodb://127.0.0.1:27017"),serverSelectionTimeoutMS=1000); c.admin.command("ping"); self.db=c[os.getenv("MONGO_DB_NAME","freshguard")]
            except Exception: self.db=None
    def insert_one(self,col,doc):
        if self.db is not None: return str(self.db[col].insert_one(copy.deepcopy(doc)).inserted_id)
        self.memory.setdefault(col,[]).append(copy.deepcopy(doc)); return str(doc.get("_id",doc.get("shipment_id",doc.get("reading_id",""))))
    def find_many(self,col,q=None):
        q=q or {}
        if self.db is not None: return list(self.db[col].find(q,{"_id":0}))
        return [copy.deepcopy(x) for x in self.memory.get(col,[]) if all(x.get(k)==v for k,v in q.items())]
    def find_one(self,col,q):
        if self.db is not None: return self.db[col].find_one(q,{"_id":0})
        return next((copy.deepcopy(x) for x in self.memory.get(col,[]) if all(x.get(k)==v for k,v in q.items())),None)
db=Database()
