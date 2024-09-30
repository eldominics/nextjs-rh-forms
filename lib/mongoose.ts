import mongoose from "mongoose";

let isConnected: boolean = false;
export default async function connectToMongoDB() {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("MongoDB connection string missing");
  }

  if (isConnected) {
    return console.log("MongoDb already connected");
  }
  try {
    mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "NextJSProduct",
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
}
