import mongoose from "mongoose"
import env from "../server/data"










 



export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return; // already connected
  return mongoose.connect(env.MONGO_URI);
}