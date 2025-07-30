import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    const fetchUsersData = async () => {
        try {
            const response = await axios.get('/api/user/getUsers',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setUsers(response.data.users);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const manageAccount = async (id, status) => {
        try {
            const data = {
                id: id,
                status: status
            }
            const response = await axios.put(`/api/user/manageAccount`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const updatedUser = response.data.user;
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user._id === updatedUser._id ? updatedUser : user
                    )
                );
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error(error);
            console.error(error.response.data.message);
        }
    }
    useEffect(() => {
        fetchUsersData();
    }, [])
    return (
        <>
            <Navbar />
            <div className="container-fluid marginClass">
                <div className="row mx-3 py-3">
                    <div className="col-md-12 text-center">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.address}</td>
                                            <td style={{ color: user.status === "true" ? "green" : "red" }}>
                                                {user.status === "true" ? "Active" : "Deactive"}
                                            </td>
                                            {/* <td><button className="btn btn-danger">Deactivate</button></td> */}
                                            <td onClick={() => { manageAccount(user._id, user.status) }}><i className="fas fa-lock hand red" title="Deactivate"></i></td>
                                            {/* <td><button className="btn btn-primary">View Orders</button></td> */}
                                            <td><i className="fa-solid fa-eye hand blue" title="View Orders"></i></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserList;