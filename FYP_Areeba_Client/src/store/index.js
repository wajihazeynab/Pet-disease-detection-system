import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import reducer from "../reducer";
import user_reducer from "../reducer/user_reducer";

export const store = configureStore({
    reducer: reducer,
})

export const persist = persistStore(store)