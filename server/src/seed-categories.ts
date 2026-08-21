import mongoose from "mongoose";
import dotenv from "dotenv";
import { Category } from "./models/Category";

dotenv.config();

async function seed() {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("✅ Database Connected.");

    const categoriesToSeed = [
      "Sneakers",
      "Apparel",
      "Accessories",
      "Activewear",
      "Bags",
    ];

    for (const name of categoriesToSeed) {
      const existing = await Category.findOne({ name });
      if (!existing) {
        await Category.create({ name });
        console.log(`Created category: ${name}`);
      } else {
        console.log(`Category already exists: ${name}`);
      }
    }

    console.log("🎉 Seeding categories complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

void seed();
