import copy, os
try:
    from pymongo import MongoClient
except ImportError:
    MongoClient = None

class Database:
    collections = ('shipments', 'sensor_readings', 'alerts', 'traceability')
    def __init__(self):
        self.memory = {name: [] for name in self.collections}
        self.db = None
        self.mode = 'memory'
        if MongoClient:
            try:
                client = MongoClient(os.getenv('MONGO_URI', 'mongodb://127.0.0.1:27017'), serverSelectionTimeoutMS=1200)
                client.admin.command('ping')
                self.db = client[os.getenv('MONGO_DB_NAME', 'freshguard')]
                self.mode = 'mongodb'
                self.db.sensor_readings.create_index('reading_id', unique=True)
            except Exception:
                self.db = None

    def insert_one(self, col, doc):
        if self.db is not None:
            try: return str(self.db[col].insert_one(copy.deepcopy(doc)).inserted_id)
            except Exception as exc:
                if 'duplicate key' in str(exc).lower(): return str(doc.get('reading_id', 'duplicate'))
                raise
        self.memory.setdefault(col, []).append(copy.deepcopy(doc))
        return str(doc.get('reading_id', doc.get('shipment_id', '')))

    def find_many(self, col, query=None):
        query = query or {}
        if self.db is not None: return list(self.db[col].find(query, {'_id': 0}).sort('timestamp', 1))
        return [copy.deepcopy(x) for x in self.memory.get(col, []) if all(x.get(k) == v for k, v in query.items())]

    def find_one(self, col, query):
        if self.db is not None: return self.db[col].find_one(query, {'_id': 0})
        return next((copy.deepcopy(x) for x in self.memory.get(col, []) if all(x.get(k) == v for k, v in query.items())), None)

db = Database()
