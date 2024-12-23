import './App.css';
import AuthVerify from './common/AuthVerify';
import Cart from './components/Cart';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import {BrowserRouter, Routes, Route} from "react-router";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/Profile';
import Order from './components/Order';
import Help from './components/Help';
function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
      <AuthVerify/>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/order' element={<Order/>}></Route>
            <Route path='/help' element={<Help/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
