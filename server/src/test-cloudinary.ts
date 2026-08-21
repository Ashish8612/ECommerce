import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function test() {
  console.log("Testing Cloudinary credentials...");
  console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("API Key:", process.env.CLOUDINARY_API_KEY);
  console.log("API Secret Length:", process.env.CLOUDINARY_API_SECRET?.length);

  try {
    const res = await cloudinary.api.ping();
    console.log("✅ Cloudinary connection successful:", res);
  } catch (error) {
    console.error("❌ Cloudinary connection failed:", error);
  }
}

void test();
