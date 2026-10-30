import {v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'
import { AppError } from "./AppError";


type CloudinaryUploadResult = {
  url: string;
  publicId: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function uploadSingleBufferToCloudinary(
  fileBuffer: Buffer,
  folder = "CartCraze-video/products",
): Promise<CloudinaryUploadResult> {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.log("⚠️ Cloudinary credentials missing in .env - falling back to mock placeholder image.");
    return Promise.resolve({
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
      publicId: `dummy_cloudinary_${Date.now()}`,
    });
  }

  return new Promise((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.warn("⚠️ Cloudinary upload failed (check credentials). Falling back to mock image:", error.message);
          return resolve({
            url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
            publicId: `dummy_cloudinary_${Date.now()}`,
          });
        }

        if (!result) {
          console.warn("⚠️ Cloudinary upload failed (empty result). Falling back to mock image.");
          return resolve({
            url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
            publicId: `dummy_cloudinary_${Date.now()}`,
          });
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
}

export async function uploadManyBuffersToCloudinary(
  files: Buffer[],
  folder = "CartCraze-video/products",
): Promise<CloudinaryUploadResult[]> {
  return Promise.all(
    files.map((file) => uploadSingleBufferToCloudinary(file, folder)),
  );
}

export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  if (publicId.startsWith("dummy_cloudinary_")) return;

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new AppError(503, "Cloudinary credentials are required to delete this banner");
  }

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new AppError(502, "Cloudinary could not delete this banner image");
  }
}
