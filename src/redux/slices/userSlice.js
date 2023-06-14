import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  message: null,
  profileUser: null,
  followState: null,
  followers:null,
  userList:[]
};
export const userRegister = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, { payload }) => {
      state.token = localStorage.setItem("token", payload);
      state.isAuthenticated = true;
    },
    refreshSuccess: (state, { payload }) => {
      state.token = localStorage.setItem("token", payload.token);
      console.log(payload.token);
      console.log("token is ", localStorage.getItem("token"));
      state.isAuthenticated = true;
    },
    userSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    profileUserSuccess: (state, action) => {
      state.profileUser = action.payload;
      state.isAuthenticated = true;
    },
    followedUnfollowed: (state, { payload }) => {
      state.followState = payload.state;
      state.followers = payload.followers;
      
      state.profileUser.i_follow = payload.follow;
      state.profileUser.followers = payload.followers;
    },
    removeMesage: (state) => {
      state.message = null;
    },
    userRegisterSuccess: (state, action) => {
      state.message =
        "Successfully registered ! Please activate account from mail.";
    },
    userFail: (state, { payload }) => {
      state.user = null;
      state.error = payload;
      state.isAuthenticated = false;
    },
    authSuccess: (state) => {
      state.isAuthenticated = true;
    },
    recommendUser:(state, { payload }) => {
      state.recommendedUser = payload;
    },
    followuserList:(state, { payload }) => {
      state.userList = payload;
    },
    followRecommendUser:(state, { payload }) => {
      const user = state.recommendedUser.find(user => user.username ===payload.username)
      user.i_follow= payload.follow
    },
    followList:(state, { payload }) => {
      state.userList = state.userList.filter(u => u.username !== payload)
    },
    setMeta:(state, { payload }) => {
      state.meta = payload;
    },
    logMeOut: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    loadedMoreUser:(state, { payload }) => {
      state.userList.push(...payload);
    },
  },
});

export const {
  setLoading,
  loginSuccess,
  followList,
  userSuccess,
  followuserList,
  loadedMoreUser,
  authFail,
  userFail,
  setMeta,
  removeMesage,
  authSuccess,
  userRegisterSuccess,
  logMeOut,
  profileUserSuccess,
  refreshSuccess,
  followedUnfollowed,
  recommendUser,
  followRecommendUser
} = userRegister.actions;

export default userRegister.reducer;
