import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import AuthVerify from './helpers/AuthVerify';
import Profile from './components/Profile';
import AddProduct from './components/addProduct';
import UserList from './components/UserList';
import ViewProduct from './components/ViewProduct';
import Product from './components/Products';
import CartList from './components/Cart';
import axios from 'axios';
import { useEffect } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Order from './components/Order';

function App() {
  const dispatch = useDispatch();
  const loadUserProfile = async () => {
    try {
      let token = localStorage.getItem('token');
      const response = await axios.get(`/api/user/getUserProfile`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const result =  response.data.user;
      dispatch(setUserDetails(result));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUserProfile();
    }
  }, []);
  return (
    <>
      <Context.Provider value={{loadUserProfile}}>
        <ToastContainer />
        <BrowserRouter>
          <AuthVerify />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/product/:type' element={<Product />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/addProduct' element={<AddProduct />} />
            <Route path='/userList' element={<UserList />} />
            <Route path='/viewProduct/:id' element={<ViewProduct />} />
            <Route path='/cart' element={<CartList />} />
            <Route path='/order' element={<Order />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
