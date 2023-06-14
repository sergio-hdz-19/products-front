import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products:[],
  providers:[],
  isLoading: false,
  error: null,
  singleTweet: {},
  uploading: false,
};
export const providerReducer = createSlice({
  name: "providerReducer",
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
    
    providerSuccess: (state, { payload }) => {
      state.providers = payload;
    },
     
  },
});

export const {
  setLoading,
  providerSuccess,
  setUploading,
  
  
  
} = providerReducer.actions;
export default providerReducer.reducer;
