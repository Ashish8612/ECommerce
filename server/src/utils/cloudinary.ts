import {v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'


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
