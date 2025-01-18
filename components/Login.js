import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Context from "../context";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const { loadUserProfile } = useContext(Context);

    const handleForm = async (event) => {
        event.preventDefault();
        const data = {
            email: email,
            password: password,
        }
        try {
            const response = await axios.post('/api/user/login', data);
            if (response.status === 200) {                
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('userType',response.data.userType)
                navigate('/home');
                toast.success(response.data.message);
                await loadUserProfile();
                setEmail('');
                setPassword('');
            }
        }
        catch (error) {
            console.error(error);
            if(error.response.status === 401)
            {
                toast.error(error.response.data.message);
            }
        }
    }
    const togglePassword = (passwordType) => {
        let x = document.getElementById(passwordType);
        const isPassword = x.type === "password";
    
        if (passwordType === "password") {
            setVisible(isPassword);
        }
        x.type = isPassword ? "text" : "password";
    };
    return (
        <>
            <div className="container-fluid loginOuter">
                <div className="row justify-content-center py-3">
                    <div className="col-md-6">
                        <div className="row  mt-5 justify-content-center loginMain">
                            <h2 className="text-center py-3 underline">Login </h2>
                            <div className="col-md-5 loginImage">
                            </div>
                            <div className="col-md-6">
                                <form onSubmit={handleForm}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="Email">Email</label>
                                                <input type="email" className="form-control" id="Email" value={email} onChange={(e) => {
                                                    setEmail(e.target.value)
                                                }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Password">Password</label>
                                                <div className="d-flex position-relative">
                                                    <input className="form-control pr-4" type="password" value={password} onChange={(e) => setPassword(e.target.value)} id='password' />
                                                    <i className={visible ? "fa-solid fa-eye position-absolute eyeIcon" : "fa-solid fa-eye-slash position-absolute eyeIcon"} onClick={() => { togglePassword('password') }}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mt-3 form-control" type="submit">Login</button>
                                    <p className="text-center mt-3">Don't have an account?
                                        <Link to="/signup"> Signup</Link>
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
export default Login;