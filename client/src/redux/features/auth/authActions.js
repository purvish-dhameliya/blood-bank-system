import { createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../../services/api";

//login 
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { role, email, password })
            //token store
            if (data.success) {
                localStorage.setItem("token", data.token)
                //    toast.success(data.message)
                window.location.replace('/')
            }
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

// register
export const userSignup = createAsyncThunk(
    'auth/register', async ({
        role,
        name,
        email,
        organizationName,
        hospitalName,
        website,
        address,
        phone,
        password },
        { rejectWithValue }) => {
    try {
        const { data } = await API.post('/auth/register', {
            role,
            name,
            email,
            organizationName,
            hospitalName,
            website,
            address,
            phone,
            password
        })

        if (data.success) {
            // toast.success("User Is Register Successfully")
            window.location.replace('/login')
        }
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})


// current user
export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (rejectWithValue) => {
        try {
            const res = await API.get('/auth/current-user')
            if (res?.data) return res?.data;
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)