import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios'

const Registration = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            username: username,
            email: email,
            password: password,
            phone: phone,
            address: address,
        }
        try {
            const response = await axios.post("/api/user/registration", userData);
        if(response.status===201)
        {
            toast.success(response.data.message);
            setUsername('');
            setEmail('');
            setPassword('');
            setPhone('');
            setAddress('');
            setErrorMessage('');
            navigate('/');
        }
        else
        {
            toast.danger("Registration failed!");
        }
        } catch (error) {
            console.error(error);
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value !== cpassword) {
            setErrorMessage("Password does not match!");
        }
        else {
            setErrorMessage('');
        }
    }
    const handleCPasswordChange = (e) => {
        setCpassword(e.target.value);
        if (e.target.value !== password) {
            setErrorMessage("Password does not match!");
        }
        else {
            setErrorMessage('');
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <h2 className="text-center my-3">Signup</h2>
                    <div className="col-md-6 offset-3">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="Firstname">Username</label>
                                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="Firstname">Email</label>
                                <input type="text" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <input type="password" className="form-control" value={password} onChange={handlePasswordChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Confirm Password">Confirm Password</label>
                                <input type="password" className="form-control" value={cpassword} onChange={handleCPasswordChange} />
                            </div>
                            {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
                            <div className="form-group">
                                <label htmlFor="Phone">Phone</label>
                                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Address">Address</label>
                                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <button className="mt-3 btn btn-primary form-control" type="submit">Create Account</button>
                            <p className="text-center mt-3">Already have an account? <Link to="/">Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Registration;