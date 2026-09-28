import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User";

dotenv.config();

async function seedPoints() {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("✅ Database Connected.");

    const result = await User.updateMany({}, { $set: { points: 10000 } });
    console.log(`🎉 Successfully awarded 10,000 points to ${result.modifiedCount} user accounts!`);
  } catch (error) {
    console.error("❌ Failed to seed points:", error);
  } finally {
    await mongoose.disconnect();
  }
}

void seedPoints();
