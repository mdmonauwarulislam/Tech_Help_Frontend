import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    user: null,
    token : null,
    isProfileUpdated : false,
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        login : (state, action) => {
            state.isAuthenticated = true,
            state.user = action.payload.user,
            state.token = action.payload.token
        },
        logout : (state, ) => {
            state.isAuthenticated = false,
            state.user = null,
            state.token = null
            localStorage.removeItem('token');
        },
        updateProfile : (state) => {
            state.isProfileUpdated = !state.isProfileUpdated;
        }
    }
})

export const { login, logout,updateProfile } = userSlice.actions;
export default userSlice.reducer;