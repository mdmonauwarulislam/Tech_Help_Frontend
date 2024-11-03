import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import projectReducer from "./slice/projectSlice";

import blogReducer from "./slice/blogSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectReducer,
        blog: blogReducer,
    }
})

export default store;