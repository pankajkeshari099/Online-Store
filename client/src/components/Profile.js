import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
const Profile = () => {
    let [editable, setEditable] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const token = localStorage.getItem('token');
    const data = useSelector(state => state.user.userDetails);
    const [userData, setUserData] = useState(data);

    useEffect(() => {
        setUserData(data);
    }, [data]);

    const editProfile = () => {
        setEditable(true);
        setUsername(data.username);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);

    };
    const handleForm = async (e) => {
        try {
            e.preventDefault();
            let data = {
                username,
                email,
                phone,
                address
            }
            const response = await axios.put('/api/user/updateProfile', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setUserData(data);
                toast.success(response.data.message);
                setEditable(false);
            }
        } catch (error) {
            toast.success(error.response.data.message);
            console.error(error);
        }
    }
    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: "4.5rem" }}>
                <div className="main_profile p-3">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            {editable ? <div className="d-flex justify-content-end" onClick={() => setEditable(false)}> <i className="fa-regular fa-circle-xmark hand"></i> </div> : ''}
                            <h4 className="text-center">PROFILE {editable}{!editable ? <i className="fa-solid fa-pen-to-square hand" title="Edit" onClick={editProfile}></i> : ''}</h4>
                            {!editable ? (<div>
                                <div className="row text-center row-cols-3 mt-5">
                                    <div className="col">
                                        <strong><p>Username</p></strong>
                                        <p>{userData?.username}</p>
                                    </div>
                                    <div className="col">
                                        <strong><p>Email</p></strong>
                                        <p>{userData?.email}</p>
                                    </div>
                                    <div className="col">
                                        <strong><p>Phone</p></strong>
                                        <p>{userData?.phone}</p>
                                    </div>
                                    <div className="col">
                                        <strong><p>Address</p></strong>
                                        <p>{userData?.address}</p>
                                    </div>
                                </div>
                            </div>)
                                : (
                                <div>
                                    <form onSubmit={handleForm}>
                                        <div className="row mt-5 justify-content-center">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="username">Username</label>
                                                    <input type="text" name="username" id="username" value={username} className="form-control" placeholder="Enter Full Name" onChange={(e) =>
                                                        setUsername(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="text" name="email" id="email" value={email} className="form-control" placeholder="Enter Email Id" onChange={(e) => {
                                                        setEmail(e.target.value)
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone</label>
                                                    <input type="text" name="phone" id="phone" value={phone} className="form-control" placeholder="Enter Phone Number" onChange={(e) => {
                                                        setPhone(e.target.value)
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="form-group">
                                                <label htmlFor="address">Address</label>
                                                <textarea name="address" id="address" cols="10" rows="5" value={address} className="form-control" placeholder="Enter Full Address" onChange={(e) => {
                                                    setAddress(e.target.value)
                                                }}></textarea>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary mt-5 float-end" type="submit">Update</button>
                                    </form>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;