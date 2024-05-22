import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phoneNumber: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
}

const initialState: AuthState = {
    user: getCookie('user') ? JSON.parse(getCookie('user') as string) : null,
    accessToken: getCookie('accessToken') ?? null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            setCookie('user', JSON.stringify(action.payload));
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            setCookie('accessToken', action.payload);
        },
        clearUser: () => {
            deleteCookie('user');
        },
        clearAccessToken: () => {
            deleteCookie('accessToken');
        },
    }
})

export const { setUser, setAccessToken, clearUser, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;