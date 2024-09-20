import Dog from "../models/dog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { uploadImage } from "../utils/cloudinary.js";
const validateRequiredFields = (fields) => {
    for (const field of fields) {
        if (!field.value) {
            throw new ApiError(400, `${field.name} is required`);
        }
    }
}
const notFoundError = (message = "Resource not found") => {
    throw new ApiError(404, message);
}
const AddNewDog = asyncHandler(async (req, res) => {
    const { name, breed, age, description } = req.body;
    validateRequiredFields([
        { value: name, name: "Name" },
        { value: breed, name: "Breed" },
        { value: age, name: "Age" },
        { value: description, name: "Description" },
    ])
    // upload multiple images
    const files = req.files;
    let dogImages = [];
    for (const file of files) {
        const { path } = file;
        const imageUrl = await uploadImage(path)
        dogImages.push(imageUrl)
    }
    // console.log("dogImage", dogImage);
    const dog = await Dog.create({ name, breed, age, dogImages, description, owner: req.user._id });
    res.status(201).json(new ApiResponse(201, dog, "Dog created successfully"))
})

const GetDogs = asyncHandler(async (req, res) => {
    const dogs = await Dog.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            }
        },
        {
            $unwind: "$owner"
        },
        {
            $project: {
                name: 1,
                breed: 1,
                age: 1,
                description: 1,
                owner: {
                    name: 1,
                    email: 1
                }
            }
        }, { $sort: { createdAt: -1 } }
    ])
    if (dogs.length === 0) {
        notFoundError("No dogs found")
    }
    res.status(200).json(new ApiResponse(200, dogs, "Dogs fetched successfully"))

})


const GetDog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id); // Convert to ObjectId


    const dog = await Dog.aggregate([
        { $match: { _id: objectId } },

        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            },

        },
        {
            $project: {
                name: 1,
                breed: 1,
                age: 1,
                description: 1,
                owner: {
                    name: 1,
                    email: 1
                }
            }
        }
    ])

    if (dog.length === 0) {
        notFoundError("Dog not found")
    }
    res.status(200).json(new ApiResponse(200, dog, "Dog fetched successfully"))

})
const UpdateDogDetails = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, breed, age, description } = req.body
    const dog = await Dog.findById(id)
    if (!dog) {
        notFoundError("Dog not found")
    }
    // check the user is made the profile for the dog
    if (dog.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this dog")
    }
    dog.name = name
    dog.breed = breed
    dog.age = age
    dog.description = description
    await dog.save()
    res.status(200).json(new ApiResponse(200, dog, "Dog updated successfully"))
})

const DeleteDog = asyncHandler(async (req, res) => {
    const { id } = req.params
    const dog = await Dog.findById(id)
    if (!dog) {
        notFoundError("Dog not found")
    }
    // check the user is made the profile for the dog
    if (dog.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this dog")
    }
    await Dog.deleteOne({ _id: id });
    res.status(200).json(new ApiResponse(200, null, "Dog deleted successfully"))
})
// update the adopted status of the dog
const UpdateAdoptedStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { adoptedBy, adoptedAt } = req.body
    validateRequiredFields([
        { value: adoptedBy, name: "Adopted By" },
        // { value: adoptedAt, name: "Adopted At" }
    ])
    const dog = await Dog.findById(id)
    if (!dog) {
        notFoundError("Dog not found")
    }
    // check the user is made the profile for the dog
    if (dog.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this dog")
    }
    dog.adopted = true
    dog.adoptedBy = adoptedBy
    dog.adoptedAt = adoptedAt
    await dog.save()
    res.status(200).json(new ApiResponse(200, dog, "Dog adopted successfully"))
})


export { AddNewDog, GetDogs, GetDog, UpdateDogDetails, DeleteDog, UpdateAdoptedStatus }