import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const initialState = {
    userModal: null,
    favorite: []
}

const authSlide = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateUserModal: (state, action) => {
            state.userModal = action.payload
        },
        updateFavorite: (state, action) => {
            state.favorite = action.payload
        }
    }
})

export const {
    updateUserModal,
    updateFavorite
} = authSlide.actions

export default authSlide.reducer