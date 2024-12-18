import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = ()=>{
        navigate('/');
    }

    const getUser = async()=>{
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user/getUser',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("response in navbar",response);
    }
    useEffect(()=>{
        getUser();
    },[])
return (
<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">MegaShop</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                <div className="d-flex justify-content-center flex-grow-1">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link" aria-current="page"><i className="fa-solid fa-house"></i> Home
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Account</div>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#"><i className="fa-solid fa-user"></i> Profile</a></li>
                            <li><a className="dropdown-item" href="#"><i className="fas fa-shopping-bag"></i> Order</a></li>
                            <li><a className="dropdown-item" href="#"><i className="fas fa-headset"></i> 24x7 Help</a></li>
                        </ul>
                    </li>
                </ul>   
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link" aria-current="page"><i
                            className="fa-solid fa-cart-shopping"></i> Cart</Link>
                    </li>
                    <li className="nav-item">
                        <button onClick={handleLogout} className="nav-link" aria-current="page" href="#"><i
                                className="fa-solid fa-right-from-bracket"></i> Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</>
);
}

export default Navbar;