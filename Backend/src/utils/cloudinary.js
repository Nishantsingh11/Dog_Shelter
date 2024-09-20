import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

console.log("username", process.env.CLOUDNARY_USER_NAME);
console.log("key", process.env.CLOUDNARY_API_KEY);
console.log("secteer", process.env.CLOUDNARY_API_SECRET);
cloudinary.config({

    cloud_name: process.env.CLOUDNARY_USER_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET
})
const uploadImage = async (localpath) => {
    console.log("localpath", localpath);
    try {
        console.log("localpath", localpath);
        if (!localpath) return null
        const res = await cloudinary.uploader.upload(localpath, {
            folder: "Dog_shelter",
            resource_type: "image",
            quality: "auto",
            fetch_format: "auto"
        })
        console.log("res", res);
        // if file is uploaded successfully then remove the local file
        // remove the file from the local storage
        fs.unlinkSync(localpath)
        return res.secure_url
    } catch (error) {
        fs.unlinkSync(localpath)
        console.log("Error in uploading image", error);
        return null

    }
}

export { uploadImage }