import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import projectReducer from "./slice/projectSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectReducer,
    }
})

export default store;