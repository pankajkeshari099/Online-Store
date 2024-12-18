import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const handleLogin = async (event)=>{
        event.preventDefault();
        try {
            const response = await axios.post('/api/user/login',{email, password});
            console.log("response",response);
            if(response.status === 200)
            {
                toast.success(response.data.message);
                let token = response.data.token;
                localStorage.setItem("token",token);
                let userId = response.data.userId
                localStorage.setItem("userId", userId);
                navigate('/home');
            }
        } catch (error) {
            console.error(error);
            toast.warning(error.response.data.message);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <h2 className="text-center my-3">Login</h2>
                    <div className="col-md-6 offset-3">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="Firstname">Email</label>
                                <input type="text" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            </div>
                            <button className="mt-3 btn btn-primary form-control" type="submit">Login</button>
                            <p className="text-center mt-3">Don't have an account? <Link to="/registration">Signup</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;