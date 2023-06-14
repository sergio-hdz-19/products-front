import { axiosInstance } from "../../index";
import { toast } from "react-toastify";

import axios from "axios";

import {
  setLoading,
  categoriesSuccess,
} from "../slices/categorySlice";

// check is localstorage for access is present or not
const url = process.env.REACT_APP_DOMAIN;


export const load_categories = () => async (dispatch) => {
    dispatch(setLoading(true));
  
    try {
      const res = await axiosInstance.get(`${url}api/v1/categories/`);
      dispatch(setLoading(false));
      dispatch(categoriesSuccess(res.data));
    } catch (err) {
      console.log(err.response.data);
      dispatch(setLoading(false));
  
    }
  
  };