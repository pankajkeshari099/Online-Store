import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
const Profile = () => {

    const userId = localStorage.getItem('userId');
    const [data, setData] = useState(null);
    useEffect(() => { 
        const loadUserProfile = async () => { 
            try { 
                const response = await axios.get(`/api/user/getUserProfile/${userId}`); 
                setData(response.data.user); 
            } catch (error) { 
                console.error(error); 
            } 
        }; 
        loadUserProfile(); 
    }, [userId]); // Only userId as a dependency
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="main_profile p-3">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <i className="fa-solid fa-xmark float-end cancel_icon"></i>
                            <h3 className="text-center">Profile</h3>
                            <div className="row text-center mt-5">
                                <div className="col">
                                    <strong><p>Username</p></strong>
                                    <p>{data?.username}</p>
                                </div>
                                <div className="col">
                                    <strong><p>Email</p></strong>
                                    <p>{data?.email}</p>
                                </div>
                                <div className="col">
                                    <strong><p>Phone</p></strong>
                                    <p>{data?.phone}</p>
                                </div>
                                <div className="col">
                                    <strong><p>Address</p></strong>
                                    <p>{data?.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;