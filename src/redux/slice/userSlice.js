import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    user: null,
    token : null,
    isProfileUpdated : false,
    isLoggedIn: false,
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        login : (state, action) => {
            state.isAuthenticated = true,
            state.user = action.payload.user,
            state.token = action.payload.token
            state.isLoggedIn = true;
            localStorage.setItem("token", action.payload.token);
        },
        logout : (state, ) => {
            state.isAuthenticated = false,
            state.user = null,
            state.token = null
            state.isLoggedIn = false;
            localStorage.removeItem("token");
        },
        updateProfile : (state) => {
            state.isProfileUpdated = !state.isProfileUpdated;
        },
        loadUser:(state, action) => {
            state.isAuthenticated = true,
            state.user = action.payload.user,
            state.isLoggedIn = true;
        }
    }
})

export const { login, logout,updateProfile ,loadUser} = userSlice.actions;
export default userSlice.reducer;