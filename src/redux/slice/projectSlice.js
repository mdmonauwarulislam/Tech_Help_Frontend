import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    isUpdatedProject: false,
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        handleIsUpdatedProject: (state) => {
            state.isUpdatedProject = !state.isUpdatedProject;
        },
    },
})

export const {handleIsUpdatedProject}=projectSlice.actions;
export default projectSlice.reducer;