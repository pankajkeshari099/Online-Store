import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const handleForm = async (event) => {
        event.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email,
            address: address,
            phone: phone,
        }
        try {
            const response = await axios.post('/api/user/registration', data);
            if (response.status === 200) {
                toast.success(response.data.message);
                setUsername('');
                setPassword('');
                setEmail('');
                setPhone('');
                setConfirmPassword('');
                setAddress('');
            }
        }
        catch (error) {
            console.error(error);
            console.error(error.response.data.message);
        }
    }
    const togglePassword = (passwordType) => {
        let x = document.getElementById(passwordType);
        const isPassword = x.type === "password";
    
        if (passwordType === "password") {
            setVisible(isPassword);
        } else if (passwordType === "confirmPassword") {
            setVisible2(isPassword);
        }
    
        x.type = isPassword ? "text" : "password";
    };
    return (
        <>
            <div className="container-fluid loginOuter">
                <div className="row justify-content-center py-3">
                    <div className="col-md-8">
                        <div className="row  mt-5 justify-content-center loginMain">
                            <h2 className="text-center py-3 underline">Signup </h2>
                            <div className="col-md-5 signupImage">
                            </div>
                            <div className="col-md-6">
                                <form onSubmit={handleForm}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="First Name">Username</label>
                                                <input type="text" className="form-control" id="First Name" value={username} onChange={(e) =>
                                                    setUsername(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="Email">Email</label>
                                                <input type="email" className="form-control" id="Email" value={email} onChange={(e) => {
                                                    setEmail(e.target.value)
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="Password">Password</label>
                                                <div className="d-flex position-relative">
                                                    <input className="form-control pr-4" type="password" value={password} onChange={(e) => setPassword(e.target.value)} id='password' />
                                                    <i className={visible ? "fa-solid fa-eye position-absolute eyeIcon" : "fa-solid fa-eye-slash position-absolute eyeIcon"} onClick={() => { togglePassword('password') }}></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <div className="d-flex position-relative">
                                                    <input className="form-control pr-4" type="password" value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" />
                                                    <i className={visible2 ? "fa-solid fa-eye position-absolute eyeIcon" : "fa-solid fa-eye-slash position-absolute eyeIcon"} onClick={() => { togglePassword('confirmPassword') }}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Contact Number">Contact Number</label>
                                        <input type="text" className="form-control" id="Contact Number" value={phone} onChange={(e) => {
                                            setPhone(e.target.value)
                                        }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Address">Address</label>
                                        <input type="text" className="form-control" id="Address" value={address} onChange={(e) => {
                                            setAddress(e.target.value)
                                        }} />
                                    </div>
                                    <button className="btn btn-primary mt-3 form-control">Submit</button>
                                    <p className="text-center mt-3">Already have an account?
                                        <Link to="/">Sign in</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup;