import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products:[],
  categories:[],
  isLoading: false,
  error: null,
  singleTweet: {},
  uploading: false,
};
export const categoriesReducer = createSlice({
  name: "categoriesReducer",
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
    
    categoriesSuccess: (state, { payload }) => {
      state.categories = payload;
    },
    
    
    
   
    
  
    
    
  },
});

export const {
  setLoading,
  categoriesSuccess,
  setUploading,
  
  
  
} = categoriesReducer.actions;
export default categoriesReducer.reducer;
