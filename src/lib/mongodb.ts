import env from "../server/data"
import { MongoClient } from "mongodb"


if(!process.env.MONGO_URI) {
    throw new Error("Mongo URI not found")
}



let client : MongoClient


if(!global._mongoClientPromise  ){
     client = new MongoClient(env.MONGO_URI, {})
    global._mongoClientPromise =  client.connect()
}

 const clientPromise = global._mongoClientPromise;  


export async function getCollection(collectionName : string){
    const client = await clientPromise;
    const db = client.db('resume-builder')
    if(client) {
        return db.collection(collectionName)
    }
    return null
}