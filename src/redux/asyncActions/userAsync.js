import {
  setLoading,
  loginSuccess,
  userSuccess,
  userFail,
  userRegisterSuccess,
  authSuccess,
  logMeOut,
 
} from "../slices/userSlice";
// import { setMessage } from "../slices/tweetSlice";
import axios from "axios";

import { toast } from "react-toastify";

import { axiosInstance } from "../../index";
const url = process.env.REACT_APP_DOMAIN;

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    try {
      const res = await axiosInstance.get(
        `${url}api/v1/users/me/`
      );
      dispatch(userSuccess(res.data));
    } catch (err) {
      dispatch(userFail());
    }
  } else {
    dispatch(userFail());
  }
};

export const login = (username, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post(`${url}api/v1/token/login/`, {
      username,
      password,
    });
    console.log(res);
    dispatch(loginSuccess(res.data.auth_token));
    dispatch(load_user());
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(userFail("User or password is wrong !"));
    dispatch(setLoading(false));
  }
};

export const register =
  (username, email, password, re_password) => (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${url}api/v1/users/`, {
        username,
        email,
        password,
        re_password,
      })
      .then((res) => {
        dispatch(userRegisterSuccess());
        dispatch(load_user());
        dispatch(setLoading(false));
        toast.success("User Registered !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((err) => {
        const errcode = err.response.data;
        errcode.username && dispatch(userFail(errcode.username[0]));
        errcode.email && dispatch(userFail(errcode.email[0]));
        errcode.password && dispatch(userFail(errcode.password[0]));
        errcode.non_field_errors &&
          dispatch(userFail(errcode.non_field_errors));
        dispatch(setLoading(false));
      });
  };



export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${url}auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch(authSuccess());
      } else {
        dispatch(userFail());
      }
    } catch (err) {
      dispatch(userFail());
    }
  } else {
    dispatch(userFail());
  }
};

export const logoutAct = () => (dispatch) => {


  try {
    const res = axiosInstance.get(
      `${url}api/v1/token/logout/`
    );
    dispatch(logMeOut());
  } catch (err) {
    dispatch(userFail());
    // dispatch(setLoading(false));
  }
  // dispatch(load_user());
};


