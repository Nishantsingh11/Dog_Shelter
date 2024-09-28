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
    const { name, breed, age, description, gender, size, weight, disability, location, dateArrived, medicalNeeds, isHouseTrained, isGoodWithKids, isGoodWithOtherDogs, isGoodWithCats } = req.body;

    validateRequiredFields([
        { value: name, name: "Name" },
        { value: breed, name: "Breed" },
        { value: age, name: "Age" },
        {
            value: description, name:
                "Description"
        },
        { value: gender, name: "Gender" },
        { value: size, name: "Size" },
        { value: weight, name: "Weight" },
        { value: location, name: "Location" },
        { value: dateArrived, name: "Date Arrived" },

    ])
    // upload multiple images
    const files = req.files;
    console.log("req",req);
    
    console.log("files", files);
    console.log("req.files", req.files);

    let dogImages = [];
    if (files) {
        for (const file of files) {
            const { path } = file;
            const imageUrl = await uploadImage(path)
            dogImages.push(imageUrl)
        }
    }
    console.log("dogImages", dogImages);
    if (dogImages.length === 0) {
        throw new ApiError(400, "Please upload at least one image")
    }

    // console.log("dogImage", dogImage);
    const dog = await Dog.create({
        name, breed, age, dogImages, description, owner: req.user._id,
        weight, size, gender,
        disability, location, dateArrived, medicalNeeds, isHouseTrained, isGoodWithKids, isGoodWithOtherDogs, isGoodWithCats
    });
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
                dogImages: 1,



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
    res.status(200).json(new ApiResponse(200,
        dogs, "Dogs fetched successfully"))

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
                weight: 1,
                size: 1,
                gender: 1,
                disability: 1,
                location: 1,
                dateArrived: 1,
                medicalNeeds: 1,
                isHouseTrained: 1,
                isGoodWithKids: 1,
                isGoodWithOtherDogs: 1,
                isGoodWithCats: 1,
                dogImages: 1,
                adopted: 1,
                adoptedBy: 1,
                adoptedAt: 1,

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
    res.status(200).json(new ApiResponse(200, dog[0], "Dog fetched successfully"))

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

const GetUserDogs = asyncHandler(async (req, res) => {
    const dogs = await Dog.find({ owner: req.user._id })
    if (dogs.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "No dogs found"))
    }

    res.status(200).json(new ApiResponse(200, dogs, "Dogs fetched successfully"))
})

export { AddNewDog, GetDogs, GetDog, UpdateDogDetails, DeleteDog, UpdateAdoptedStatus, GetUserDogs }