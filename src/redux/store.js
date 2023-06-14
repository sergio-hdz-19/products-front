import { configureStore, combineReducers} from '@reduxjs/toolkit'

import productReducer  from './slices/productSlice'
import providerReducer from './slices/providerSlice'
import categoryReducer from './slices/categorySlice'
import userRegister from './slices/userSlice'


const store = configureStore({
  reducer: {
      
      productReducer:productReducer,
      providerReducer:providerReducer,
      categoryReducer:categoryReducer,
      userReducer:userRegister,

  },
})



export default store