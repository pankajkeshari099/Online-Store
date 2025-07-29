import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
const Order = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const location = useLocation();
    const filterType = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const [filterValue, setFilterValue] = useState('');
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 4 }, (_, i) => currentYear - i); // Create an array of 5 elements starting from the current year
    let navigate = useNavigate();
    let userType = localStorage.getItem('userType');
    let [storeOrderDetails, setStoreOrderDetails] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = async (status, userId, product) => {
        const response = await axios.get(`/api/user/getUserById/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = {
            status,
            user: response.data.user,
            product
        };
        setStoreOrderDetails(data);
        setShow(true);
    };
    const getOrderDetails = async () => {
        try {
            const response = await axios.get(`/api/order/getOrder/${userType}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setData(response.data.orderDetails);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        localStorage.setItem('url', location.pathname);
        getOrderDetails()
    }, [])
    const manageFilterValue = (e) => {
    }
    return (
        <>
            <Navbar />
            {data && data.length == 0 ?
                (<div className="container-fluid marginClass">
                    <div className='noDataFound'></div>
                </div>)
                :
                (<div className="container-fluid marginClass">
                    <div className="row pt-2">
                        <div className="col-md-3">
                            <div style={{ backgroundColor: 'rgb(189, 195, 199,0.1)', marginBottom: "10px", padding: "15px", borderRadius: "10px" }}>
                                <h4 className="text-center">FILTER</h4>
                                <hr />
                                <p className="text-bold">ORDER STATUS</p>
                                {filterType.map((status, index) => (
                                    <div key={index} className="form-check">
                                        <input className="form-check-input" type="radio" name="orderType" id={status.toLocaleLowerCase()} value={status} onChange={(e) => { manageFilterValue(e) }} />
                                        <label className="form-check-label" htmlFor={status.toLocaleLowerCase()}>{status}</label>
                                    </div>
                                ))}

                                <hr />
                                <p className="text-bold">ORDER TIME</p>
                                <div className="form-check"> <input className="form-check-input" type="radio" name="orderYear" id="last30Days" value="" onChange={(e) => { manageFilterValue(e) }} />
                                    <label className="form-check-label" htmlFor="last30Days"> Last 30 days </label> </div>
                                {years.map((year, index) => (
                                    <div key={index} className="form-check">
                                        <input className="form-check-input" type="radio" name="orderYear" id={`year-${year}`} value={year} onChange={(e) => { manageFilterValue(e) }} />
                                        <label className="form-check-label" htmlFor={`year-${year}`}> {year} </label>
                                    </div>
                                ))}
                                <div className="form-check"> <input className="form-check-input" type="radio" name="orderYear" id="older" value="" onChange={(e) => { manageFilterValue(e) }} />
                                    <label className="form-check-label" htmlFor="older"> Older </label> </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            {data.map(x => x.items.map((product, index) => (
                                <div key={index} className='row'>
                                    <div className='d-flex hand hoverEffect' style={{ backgroundColor: 'rgb(189, 195, 199,0.1)', marginBottom: "10px", padding: "2px", borderRadius: "10px" }}>
                                        <div className='col-md-2 orderImage' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "120px" }}>
                                            <img src={product.productDetails.imageUrls[0]} width={120} height={100} alt="" style={{ padding: '5px', backgroundImage: 'none' }} />
                                        </div>
                                        <div className="col-md-8" style={{ padding: "5px" }}>
                                            <h5 className='productHover' title='View' onClick={() => { navigate(`/viewProduct/${product.productId}`) }}>{product.productDetails.productName}</h5>
                                            <p><s className='text-muted'>₹{product.price}</s>  ₹{parseFloat(product.price - (product.price * product.productDetails.discount) / 100).toFixed(2)} <span className='text-success'>{product.productDetails.discount}% off</span></p>
                                            <p style={{ marginTop: "-15px" }}>Quantity: {product.quantity}</p>
                                        </div>
                                        <div className="col-md-2" style={{ padding: "10px" }}>
                                            <p className={data[0].status == 'Pending' ? 'yellow' : 'red'}>{data[0].status}</p>
                                            <button type="button" className="btn btn-primary btn-sm" onClick={() => { handleShow(x.status, x.userId, product) }}>
                                                Manage
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )))}
                        </div>

                        {show ? (
                            <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!show}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header d-flex justify-content-between">
                                            <h5 className="modal-title" id="exampleModalLabel">{storeOrderDetails.product.productDetails.productName}</h5>
                                            <div onClick={handleClose} className="ml-auto">
                                                <i className="fa-regular fa-circle-xmark hand"></i>
                                            </div>
                                        </div>

                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="text-muted">Shipping to: </span><b>{storeOrderDetails.user.username}</b><br />
                                                    <span className="text-muted">Address: </span><b>{storeOrderDetails.user.address}</b><br />
                                                    <span className="text-muted">Contact number: </span><b>{storeOrderDetails.user.phone}</b>
                                                </div>
                                                <div className="col-md-6">
                                                    <span className="text-muted float-endx">Delivery Date: 2025-01-31</span>
                                                </div>
                                            </div>
                                            <div className="d-flex">

                                            </div>
                                        </div>
                                        <div className="modal-footer d-flex justify-content-between">
                                            <button className="btn btn-danger">Cancel Order</button>
                                            <div>
                                                <button type="button" className="btn btn-secondary me-2" onClick={handleClose}>Close</button>
                                                <button type="button" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>)
            }
        </>
    )
}
export default Order;