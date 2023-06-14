import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Provider } from "react-redux";
import store from './redux/store';
import ReactDOM from "react-dom/client";


const baseURL = process.env.REACT_APP_DOMAIN


export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
    accept: "application/json",
  },
});



axiosInstance.interceptors.request.use(
  config => {
    const token = "Token " + localStorage.getItem("token");
    if (token) {
      config.headers.authorization = token;
    }
    return config;
    
  },
 err =>  {
    console.log(err);
    console.log('hello')
    return Promise.reject(err);
  }

);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <Provider store={store}>
      <App />

    </Provider>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
