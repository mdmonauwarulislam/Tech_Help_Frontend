import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import projectReducer from "./slice/projectSlice";
import authReducer from "./slice/authSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectReducer,
        auth: authReducer,
    }
})

export default store;