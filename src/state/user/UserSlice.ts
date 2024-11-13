import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
    username: string,
    email: string,
    // role: string,
    token: string,
}

interface UserPayload {
    username: string | "vcs";
    email: string;
    token: string | "abcd";
}

const initialState: UserState = {
    username: '',
    email: '',
    token: ''
}

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        set_user: (state, action: PayloadAction<UserPayload>) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        log_out: (state) => {
            state.username = '';
            state.email = '';
            state.token = '';
        }
    }
})
export const { set_user, log_out } = UserSlice.actions;
export default UserSlice.reducer;
