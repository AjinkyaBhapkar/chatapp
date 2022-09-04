import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    id:''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginOut: (state, action) => {
            state.username = action.payload.username
            state.id = action.payload.id
        }
    }
})

export default userSlice.reducer
export const { loginOut } = userSlice.actions