import { v2 as cloudinary } from 'cloudinary';
import fs from "node:fs"
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: 'dclmrpuiq',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Original — keep this, used nowhere now but safe to leave
const uploadToCloudinary = async (filePath) => {
    const uploadResult = await cloudinary.uploader
        .upload(filePath, { resource_type: "auto" })
        .catch((error) => {
            console.log(error);
            fs.unlinkSync(filePath)
        });
    return uploadResult
}

// New — uploads a buffer directly, no temp file needed
export const uploadBufferToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "posts" },
            (error, result) => {
                if (error) reject(error)
                else resolve(result)
            }
        )
        stream.end(buffer)
    })
}

export default uploadToCloudinary