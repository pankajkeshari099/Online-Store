import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
const Order = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const location = useLocation();
    let navigate = useNavigate();
    const getOrderDetails = async () => {
        try {
            const response = await axios.get('/api/order/getOrder', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data.orderDetails);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        localStorage.setItem('url',location.pathname);
        getOrderDetails()
    }, [])
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row p-2">
                    <div className="col-md-3">
                        filter
                    </div>
                    <div className="col-md-9">
                        {data[0]?.items.map((product, index) => (
                            <div key={index} className='row'>
                                <div className='d-flex hand hoverEffect' style={{ backgroundColor: 'rgb(189, 195, 199,0.1)', marginBottom: "10px", padding: "5px", borderRadius: "10px" }}>
                                    <div className='col-md-2 orderImage' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src={product.productDetails.imageUrls[0]} width={120} height={100} alt="" style={{ padding: '5px', backgroundImage: 'none' }} />
                                    </div>
                                    <div className="col-md-8" style={{ padding: "25px" }}>
                                        <h5 className='productHover' title='View' onClick={() => { navigate(`/viewProduct/${product.productId}`) }}>{product.productDetails.productName}</h5>
                                        <p><s className='text-muted'>₹{product.price}</s> ₹{product.price - product.productDetails.discount} <span className='text-success'>{parseInt((product.productDetails.discount / product.price) * 100)}% off</span></p>
                                    </div>
                                    <div className="col-md-2" style={{ padding: "25px" }}>
                                        <p>Status <span className={data[0].status == 'Pending' ? 'yellow' : 'red'}>{data[0].status}</span></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Order;