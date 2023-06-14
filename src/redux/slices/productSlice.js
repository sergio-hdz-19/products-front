import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products:[],
  isLoading: false,
  error: null,
  singleProduct: {},
  uploading: false,
  count:'',
 

};
export const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setUploading: (state, action) => {
      state.uploading = action.payload;
      state.error = null;
    },
    
    productSuccess: (state, { payload }) => {
      state.products = payload;
    },

    CountPage: (state, { payload }) => {
      state.count = payload;
    },

    productAdded: (state, { payload }) => {
      state.products.unshift(payload);
    },
    productDetail: (state, { payload }) => {
      state.singleProduct = payload;
    },
    deletedSuccess: (state, { payload }) => {
      state.products = state.products.filter((i) => i.id !== payload);
    },
    
  
    
    
  },
});

export const {
  setLoading,
  productAdded,
  productSuccess,
  deletedSuccess,
  productDetail,
  setUploading,
  CountPage,

  
  
  
} = productReducer.actions;
export default productReducer.reducer;
