import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
    username: string,
    email: string,
    phone: string,
    role: number,
    permissions: string[],
    token: string,
}

interface UserPayload {
    username: string;
    email: string;
    phone: string;
    role: number;
    permissions: string[];
    token: string;
}

const initialState: UserState = {
    username: '',
    email: '',
    role: 99,
    phone: '',
    permissions: [],
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
            state.role = action.payload.role;
            state.phone = action.payload.phone;
            state.permissions = action.payload.permissions;
        },
        log_out: (state) => {
            state.username = '';
            state.email = '';
            state.token = '';
            state.role = 99;
            state.phone = '';
            state.permissions = []
        }
    }
})
export const { set_user, log_out } = UserSlice.actions;
export default UserSlice.reducer;
