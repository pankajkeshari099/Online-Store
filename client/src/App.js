import './App.css';
import AuthVerify from './common/AuthVerify';
import Cart from './components/Cart';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import {BrowserRouter, Routes, Route} from "react-router";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
