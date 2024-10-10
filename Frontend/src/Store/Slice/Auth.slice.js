import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetCurrentUser, LoginUser, LogoutUser, RegisterUserr, UpdateUser, ChanagePassword, NewAccessToken } from "../../Apis/AuthApi"


const initialState = {
    user: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    isLogin: false,
    errorMessage: "",
}

export const registerUser = createAsyncThunk(
    "auth/registerUser", async (credentials, { rejectWithValue }) => {
        try {
            const formData = new FormData()
            for (let key in credentials) {
                formData.append(key, credentials[key])
            }
            const response = await RegisterUserr(formData)
            console.log(response);
            

            return response
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const loginUser = createAsyncThunk(
    "auth/loginUser", async (credentials, { rejectWithValue }) => {
        try {
            const response = await LoginUser(credentials)
            localStorage.setItem("accessToken", response.data)
            return response
            

        }
        catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logoutUser", async (_, { rejectWithValue }) => {
        try {
            const response = await LogoutUser()
            return response
        }
        catch (error) {
            console.log(error);
            return rejectWithValue(error)
        }
    }
)
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser", async (_, { rejectWithValue }) => {
        try {
            const response = await GetCurrentUser()
            console.log(response);
            return response

        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const updateUser = createAsyncThunk(
    "auth/updateUser", async (credentials, { rejectWithValue }) => {
        try {
            const response = await UpdateUser(credentials)
            return response
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const changePassword = createAsyncThunk("auth/changePassword", async (credentials, { rejectWithValue }) => {
    try {
        const response = await ChanagePassword(credentials)
        return response
    }
    catch (error) {
        return rejectWithValue(error)
    }
})
export const newAccessToken = createAsyncThunk("auth/newAccessToken", async (_, { rejectWithValue }) => {
    try {
        const response = await NewAccessToken()
        console.log(response);

        return response
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
    state.user = action.payload
}
const handleRejected = (state, action) => {
    state.isFetching = false
    state.isSuccess = false
    state.isError = true
    state.errorMessage = action.payload
}

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Add a new reducer to manually set login state from localStorage
        setLoginState: (state, action) => {
            state.isLogin = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, handlePending)
            .addCase(registerUser.fulfilled, (state, action) => {
                handleFulfilled(state, action, "auth"),
                    state.isLogin = true
            })
            .addCase(registerUser.rejected, handleRejected)
            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.fulfilled, (state, action) => { handleFulfilled(state, action, "auth"), state.isLogin = true })
            .addCase(loginUser.rejected, handleRejected)
            .addCase(logoutUser.pending, handlePending)
            .addCase(logoutUser.fulfilled, (state) => {
                state.isFetching = false
                state.isSuccess = true
                state.isError = false
                state.errorMessage = ""
                state.user = null
                state.isLogin = false
            })
            .addCase(logoutUser.rejected, handleRejected)
            .addCase(getCurrentUser.pending, handlePending)
            .addCase(getCurrentUser.fulfilled, (state, action) => handleFulfilled(state, action, "auth"))
            .addCase(getCurrentUser.rejected, handleRejected)
            .addCase(updateUser.pending, handlePending)
            .addCase(updateUser.fulfilled, (state, action) => handleFulfilled(state, action, "auth"))
            .addCase(updateUser.rejected, handleRejected)
            .addCase(changePassword.pending, handlePending)
            .addCase(changePassword.fulfilled, (state, action) => handleFulfilled(state, action, "auth"))
            .addCase(changePassword.rejected, handleRejected)
            .addCase(newAccessToken.pending, handlePending)
            .addCase(newAccessToken.fulfilled, (state, action) => handleFulfilled(state, action, "auth"))
            .addCase(newAccessToken.rejected, handleRejected)



    }
})
export const { setLoginState } = userSlice.actions// Export the manual action

export default userSlice.reducer