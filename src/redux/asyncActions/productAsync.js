import { axiosInstance } from "../../index";
import { toast } from "react-toastify";

import axios from "axios";

import {
  setLoading,
  productAdded,
  productSuccess,
  productDetail,
  setUploading,
  deletedSuccess,
  productLinks,
  CountPage
} from "../slices/productSlice";

// check is localstorage for access is present or not
const url = process.env.REACT_APP_DOMAIN;

export const addProduct = (uploadData) => async (dispatch) => {
  dispatch(setUploading(true));
  try {
    const res = await axiosInstance.post(`${url}api/v1/products/`, uploadData);

    dispatch(setUploading(false));
    dispatch(productAdded(res.data));
    toast.success("Product Added !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const load_products = (page, name) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    let res;
    if (page) {
      res = await axiosInstance.get(`${url}api/v1/products/?page=${page}&search=${name}`);
    } else {
      res = await axiosInstance.get(`${url}api/v1/products`);
    }
    dispatch(setLoading(false));
    dispatch(productSuccess(res.data.results));
    dispatch(CountPage(res.data.count));
  } catch (err) {
    dispatch(setLoading(false));
  }
};



export const product_detail = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`${url}api/v1/products/${id}/`);
    dispatch(setLoading(false));
    dispatch(productDetail(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const editProduct =
  (id, name, provider, category, description, sale_price) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.put(`${url}api/v1/products/${id}/`, {
        name,
        provider,
        category,
        description,
        sale_price,
      });

      dispatch(setLoading(false));
      dispatch(productDetail(res.data));
      toast.success("Product Modified !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const deleteProduct = (pk) => async (dispatch) => {
  try {
    await axiosInstance.delete(`${url}api/v1/products/${pk}/`);
    dispatch(deletedSuccess(pk));
    toast.success("Product Deleted !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } catch (err) {
    console.log(err);
  }
};


