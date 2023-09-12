import { createSlice } from '@reduxjs/toolkit'
import { getCurrentUser, userLogin, userSignup } from './authActions'


const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const initialState = {
  loading: false,
  user: null,
  token: token,  // pass here token condition
  error: null
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token
    })
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })

    // register user
    builder.addCase(userSignup.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(userSignup.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log("PAYLOAD", payload);
      state.user = payload.user;
      //  console.log("PAYLOAD USERSRR",payload.user); // checking in authcontroller for this "user " names
    })
    builder.addCase(userSignup.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })

    // get current user
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log("PAYLOAD", payload);
      state.user = payload.user;
      //  console.log("PAYLOAD USERSRR",payload.user); // checking in authcontroller for this "user " names
    })
    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })

  }
})

export default authSlice