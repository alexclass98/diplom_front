import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        ip: null,
        port: null
    },
    reducers: {
        setIp(state, { payload }) {
            state.ip = payload;
        },
        setPort(state, { payload }) {
            state.port = payload;
        }
    }
})

export const selectIp = (state) => state.user.ip
export const selectPort = (state) => state.user.port

export const {
    setIp: setIpAction,
    setPort: setPortAction
} = userSlice.actions

export default userSlice.reducer