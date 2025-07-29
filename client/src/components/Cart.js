import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from "axios";
import { toast } from "react-toastify";
import UserAddress from './UserAddress';
import { useNavigate, useLocation } from 'react-router-dom';

const CartList = () => {
    const [data, setData] = useState([]);
    const [amount, setAmount] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [loader, setLoader] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();

    const getCartData = async () => {
        try {
            setLoader(true);
            const response = await axios.get('/api/cart/getCart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setData(response.data.productDetails);
                await manageCalculation(response.data.productDetails);
                setLoader(false);
            }
        } catch (error) {
            console.error(error);
            setLoader(false);
        }
    };

    const manageCalculation = async (data) => {
        let newAmount = 0;
        let amountAfterDiscount = 0;
    
        data.forEach(product => {
            product.items.forEach(x => {
                newAmount += parseFloat(x.price * x.quantity);
                amountAfterDiscount += parseFloat(x.price * x.quantity * (x.productDetails.discount / 100));
            });
        });    
        setAmount(newAmount.toFixed(2));
        setFinalAmount((newAmount - amountAfterDiscount).toFixed(2));
        setTotalDiscount(amountAfterDiscount.toFixed(2));
    };
    

    const manageQuantity = async (action, productId) => {
        let productData = {
            productId,
            actionType: action
        };
        try {
            const response = await axios.put('/api/cart/updateCartListQty', productData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                let newItems = data[0].items.map(x => {
                    if (x.productId === productId) {
                        x.quantity = action === 'plus' ? x.quantity + 1 : x.quantity - 1;
                    }
                    return x;
                });
                let newData = [{ ...data[0], items: newItems }];
                setData(newData);
                manageCalculation(newData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeProduct = async (productId) => {
        try {
            const response = await axios.delete(`/api/cart/removeCartProduct/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                getCartData();
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    const placeOrder = async () => {
        try {
            let orderData = {
                totalAmount: finalAmount,
                status: "Pending"
            };
            const response = await axios.post('/api/order/placeOrder', orderData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success('Order placed successfully!');
                setData([]);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to place order');
        }
    };

    useEffect(() => {
        localStorage.setItem('url', location.pathname);
        getCartData();
    }, []);

    return (
        <>
            <Navbar />
            {loader ? (
                <div className="loader-container">
                    <span className="loader">L &nbsp; ading...</span>
                </div>
            ) : (
                data && data.length === 0 ? (
                    <div className="container-fluid marginClass">
                        <div className='noDataFound'></div>
                    </div>
                ) : (
                    <div className="container-fluid marginClass">
                        <div className="row px-3 py-2">
                            <div className="col-md-8">
                                {data[0]?.items.map((product, index) => (
                                    <div key={product.productId} className='row'>
                                        <div className='d-flex hand hoverEffect' style={{ backgroundColor: 'rgb(189, 195, 199,0.1)', marginBottom: "10px", padding: "5px", borderRadius: "10px" }}>
                                            <div className='col-md-3'>
                                                <img src={product.productDetails.imageUrls[0]} width={200} height={190} alt="" style={{ padding: "5px", backgroundImage: "none" }} />
                                            </div>
                                            <div className="col-md-9" style={{ padding: "25px", marginLeft: "25px" }}>
                                                <h5 onClick={() => navigate(`/viewProduct/${product.productId}`)} className='productHover' title='View'>{product.productDetails.productName}</h5>
                                                <p className='card-text'>{product.productDetails.description}</p>
                                                <p><s className='text-muted'>₹{product.price}</s> ₹{parseFloat(product.price - (product.price * product.productDetails.discount) / 100).toFixed(2)} <span className='text-success'>{product.productDetails.discount}% off</span></p>
                                                <div className='d-flex'>
                                                    <div className={`minus ${product.quantity === 1 ? 'disabled' : ''}`} title='Remove' onClick={() => manageQuantity('minus', product.productId)}><i className="fa-solid fa-minus"></i></div>
                                                    <div className='selectValue'><span>{product.quantity}</span></div>
                                                    <div className='plus' title='Add more' onClick={() => manageQuantity('plus', product.productId)}><i className="fa-solid fa-plus"></i></div>
                                                    <span className='mx-2 text-danger text-bold' title='Remove' onClick={() => { removeProduct(product.productId) }}>Remove</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {data[0]?.items.length ? (
                                <div className="col-md-4">
                                    <UserAddress />
                                    <div className="row" style={{ marginTop: "10px" }}>
                                        <div className="col-md-12" style={{ backgroundColor: 'rgb(189, 195, 199,0.1)', marginLeft: "10px", borderRadius: "10px" }}>
                                            <h5 className='m-3 text-muted'>Price Details</h5>
                                            <hr />
                                            <div className='row d-flex' style={{ padding: "10px" }}>
                                                <div className='d-flex'>
                                                    <div className='col-md-8'>
                                                        <p>Price ({data[0]?.items.length})</p>
                                                        <p>Discount</p>
                                                        <p>Delivery Charges</p>
                                                        <h5>Total Amount</h5>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <p>₹{amount}</p>
                                                        <p style={{ color: "green" }}>₹{totalDiscount}</p>
                                                        <p><s>₹80</s> <span style={{ color: "green" }}>Free</span></p>
                                                        <h5>₹{finalAmount}</h5>
                                                    </div>
                                                </div>
                                                <hr />
                                                <p style={{ color: "green" }}>You will save ₹{totalDiscount} on this order</p>
                                                <button className='btn btn-warning float-end' onClick={() => { placeOrder() }}>Place Order</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : ''}
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default CartList;
