import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducer"

export default configureStore({
    reducer: combineReducers({
        user: userReducer
    })
})