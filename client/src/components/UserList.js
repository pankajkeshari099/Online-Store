import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const fetchUsersData = async () => {
        try {
            const response = await axios.get('/api/user/getUsers');
            if (response.status === 200) {
                setUsers(response.data.users);
            }
        } catch (error) {
            console.error(error);
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
                                            <td>{user.status}</td>
                                            <td><button className="btn btn-danger">Deactivate</button></td>
                                            <td><button className="btn btn-primary">View Orders</button></td>
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