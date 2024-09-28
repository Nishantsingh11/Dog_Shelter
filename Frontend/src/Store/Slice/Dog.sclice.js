import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddNewDog, DeleteDog, GetDogById, GetDogs, UpdateDog, UpdateAdoptedStatus, GetUserDogs } from "../../Apis/DogApi"

const initialState = {
    dogs: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
}
export const addNewDog = createAsyncThunk("dog/addNewDog", async (data, { rejectWithValue }) => {
    try {
        console.log("data", data);

        const formData = new FormData()

        for (let key in data) {
            if (key === "dogImages") {
                data[key].forEach(file => formData.append("dogImages", file)
                );

            }   
            else {
                formData.append(key, data[key])
            }
        }
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        
        const response = await AddNewDog(formData)
        console.log("response", response);

        return response
    }
    catch (error) {
        return rejectWithValue(error)
    }
})
export const getDogs = createAsyncThunk("dog/getDogs", async (_, { rejectWithValue }) => {
    try {
        const response = await GetDogs()
        return response
    }
    catch (error) {
        return rejectWithValue(error)
    }
})
export const getDogById = createAsyncThunk("dog/getDogById", async (id, { rejectWithValue }) => {
    try {
        const response = await GetDogById(id)
        return response
    }
    catch (error) {
        return rejectWithValue(error)
    }
}
)
export const updateDog = createAsyncThunk("dog/updateDog", async (data, { rejectWithValue }) => {
    try {
        const response = await UpdateDog(data)
        return response
    }
    catch (error) {
        return rejectWithValue(error)
    }
})
export const deleteDog = createAsyncThunk("dog/deleteDog", async (id, { rejectWithValue }) => {
    try {
        const response = await DeleteDog(id)
        return response
    }
    catch (error) {
        return rejectWithValue(error)
    }
})
export const updateAdoptedStatus = createAsyncThunk("dog/updateAdoptedStatus", async (data, { rejectWithValue }) => {
    try {
        const response = await UpdateAdoptedStatus(data)
        return response
    }
    catch (error) {
        return rejectWithValue(error)
    }
})
export const getUserDogs = createAsyncThunk("dog/getUserDogs", async (_, { rejectWithValue }) => {
    try {
        const response = await GetUserDogs()
        console.log(response.data);
        return response.data

    }
    catch (error) {
        return rejectWithValue(error)
    }
})

const handlePending = (state) => {
    state.isFetching = true
    state.isSuccess = false
    state.isError = false
    state.errorMessage = ""
}
const handleFulfilled = (state, action) => {
    state.isFetching = false
    state.isSuccess = true
    state.isError = false
    state.errorMessage = ""
    state.dogs = action.payload
}
const handleRejected = (state, action) => {
    state.isFetching = false
    state.isSuccess = false
    state.isError = true
    state.errorMessage = action.payload
}


const DogSlice = createSlice({
    name: "dog",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addNewDog.pending, handlePending)
            .addCase(addNewDog.fulfilled, (state, action) => handleFulfilled(state, action, "dog"))
            .addCase(addNewDog.rejected, handleRejected)
            .addCase(getDogs.pending, handlePending)
            .addCase(getDogs.fulfilled, (state, action) => handleFulfilled(state, action, "dog"))
            .addCase(getDogs.rejected, handleRejected)
            .addCase(getDogById.pending, handlePending)
            .addCase(getDogById.fulfilled, (state, action) => handleFulfilled(state, action, "dog"))
            .addCase(getDogById.rejected, handleRejected)
            .addCase(updateDog.pending, handlePending)
            .addCase(updateDog.fulfilled, (state, action) => handleFulfilled(state, action, "dog"))
            .addCase(updateDog.rejected, handleRejected)
            .addCase(deleteDog.pending, handlePending)
            .addCase(deleteDog.fulfilled, (state, action) => handleFulfilled(state, action, "dog"))
            .addCase(deleteDog.rejected, handleRejected)
            .addCase(updateAdoptedStatus.pending, handlePending)
            .addCase(updateAdoptedStatus.fulfilled, (state, action) => handleFulfilled(state, action, "dog"))
            .addCase(updateAdoptedStatus.rejected, handleRejected)
            .addCase(getUserDogs.pending, handlePending)
            .addCase(getUserDogs.fulfilled, (state, action) => handleFulfilled(state, action, "dog"))
            .addCase(getUserDogs.rejected, handleRejected)

    }
})


export default DogSlice.reducer