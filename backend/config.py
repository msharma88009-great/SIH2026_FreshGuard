import os
class Config:
    HOST=os.getenv("FLASK_HOST","127.0.0.1")
    PORT=int(os.getenv("FLASK_PORT","5000"))
    DEBUG=os.getenv("FLASK_DEBUG","1")=="1"
    MONGO_URI=os.getenv("MONGO_URI","mongodb://127.0.0.1:27017/freshguard")
    MONGO_DB_NAME=os.getenv("MONGO_DB_NAME","freshguard")
    BLOCKCHAIN_URL=os.getenv("BLOCKCHAIN_URL","")
