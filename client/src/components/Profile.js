import React, { useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
const Profile = () => {
    let [editable, setEditable] = useState(true);
    const data = useSelector(state => state.user.userDetails)
    const editProfile = () => {
        setEditable(prevEditable => !prevEditable);
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="main_profile p-3">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-end"> <i className="fa-regular fa-circle-xmark hand"></i> </div>
                            <h4 className="text-center">Profile {editable}<i className="fa-solid fa-pen-to-square hand" title="Edit" onClick={editProfile}></i></h4>
                            {editable ? (<div>
                                <div className="row text-center row-cols-3 mt-5">
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
                            </div>)
                                : (<div>
                                    <div className="row mt-5 justify-content-center">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="username">Username</label>
                                                <input type="text" name="username" id="username" className="form-control" placeholder="Enter Full Name"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="text" name="email" id="email" className="form-control" placeholder="Enter Email Id"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone</label>
                                                <input type="text" name="phone" id="phone" className="form-control" placeholder="Enter Phone Number"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <textarea name="address" id="address" cols="10" rows="5" className="form-control" placeholder="Enter Full Address"></textarea>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mt-5 float-end">Save</button>
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