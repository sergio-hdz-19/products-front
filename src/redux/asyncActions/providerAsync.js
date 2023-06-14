import { axiosInstance } from "../../index";
import { toast } from "react-toastify";

import axios from "axios";

import {
  setLoading,
  providerSuccess,
} from "../slices/providerSlice";

// check is localstorage for access is present or not
const url = process.env.REACT_APP_DOMAIN;


export const load_providers = () => async (dispatch) => {
    dispatch(setLoading(true));
  
    try {
      const res = await axiosInstance.get(`${url}api/v1/providers/`);
      dispatch(setLoading(false));
      dispatch(providerSuccess(res.data));
    } catch (err) {
      console.log(err.response.data);
      dispatch(setLoading(false));
  
    }
  
  };