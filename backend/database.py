from motor import motor_asyncio
import asyncstdlib as a
from model import TechRating

client = motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017/")
db_name = "Wasteful_Insights"
collection_name = "Exercise-1"
database = client[db_name]

collection = database[collection_name]

async def getRatingsFromDb():
    res = []
    cursor = collection.find()
    async for index,document in a.enumerate(cursor):
        # print(document)
        res.append(TechRating(**document))
    return res
