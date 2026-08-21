import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL!, {
  //  serverSelectionTimeoutMS: 10000, // fail fast: 10s timeout instead of hanging
  });
  console.log("✅ DB connected");
}
