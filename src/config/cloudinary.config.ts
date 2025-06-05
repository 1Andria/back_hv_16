import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_API_SECRET as string,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async () => {
    return {
      folder: "uploads",
      allowed_formats: ["jpg", "png", "jpeg", "svg"],
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

const deleteFromCloudinary = async (publicFileId: string): Promise<void> => {
  try {
    const result = await cloudinary.uploader.destroy(publicFileId);
    console.log("Deleted", result);
  } catch (error) {
    console.error("Deleting error", error);
  }
};

export { upload, deleteFromCloudinary };
