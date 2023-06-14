import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./pages/ProductDetail";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import { load_user } from "./redux/asyncActions/userAsync";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const userIn = useSelector((state) => state.userReducer);
  const isAuthenticated = userIn.isAuthenticated;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_user());
    if (isAuthenticated) {
    }

    !isAuthenticated && <Navigate replace to="/login" />;
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/sign-up"  element={<Signup />} />

        <Route path="/products" exact element={<Products />} />
        <Route path="/add-product" exact element={<AddProduct />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
        <Route path="/product/edit/product/:id" element={<EditProduct />} />

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
