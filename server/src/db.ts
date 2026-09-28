import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL!, {

  });
  console.log("✅ DB connected");
}
