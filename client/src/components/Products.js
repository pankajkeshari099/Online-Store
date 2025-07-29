import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import commonFunctions from '../helpers/common';

const { addToCart, getProductBrands } = commonFunctions;

const Product = () => {
    const { type } = useParams();
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const [price, setPriceValue] = useState('');
    const [brand, setBrandValue] = useState('');
    const [brandArray, setBrandArray] = useState([]);
    let filterPrice = ["1000", "2000", "5000", "10000", "more than 15000"];
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    useEffect(() => {
        localStorage.setItem('url', location.pathname);
        getProduct();
        getBrands();
    }, [location.pathname, type]);

    const getBrands = async () => {
        const value = await getProductBrands(type);
        console.log("value",value);
        setBrandArray(value);
    };

    const getProduct = async () => {
        try {
            setLoader(true);
            const queryParams = new URLSearchParams({ ProductType: type }).toString();
            const response = await axios.get(`/api/product/getProduct?${queryParams}`);
            if (response.status === 200) {
                setProducts(response.data.products);
            }
            setLoader(false);
        } catch (error) {
            console.error(error);
        }
    };
    const getFilterProduct = async () => {
        try {
            setLoader(true);
            const queryParams = new URLSearchParams({ price, brand, ProductType: type }).toString();
            const response = await axios.get(`/api/product/getFilterProduct?${queryParams}`);
            if (response.status === 200) {
                setProducts(response.data.products);
            }
            setLoader(false);
        } catch (error) {
            console.error(error);
        }
    };

    const clearFilter = async () => {
        setPriceValue('');
        setBrandValue('');
        getProduct();
    };

    useEffect(() => {
        const removeBackground = (imageSrc, callback) => {
            const img = new Image();
            img.src = imageSrc;
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) {
                        data[i + 3] = 0;
                    }
                }
                ctx.putImageData(imgData, 0, 0);
                callback(canvas.toDataURL());
            };
        };

        products.forEach(product => {
            removeBackground(product.imageUrls[0], (newImageUrl) => {
                setProducts(prevProducts => prevProducts.map(p =>
                    p._id === product._id ? { ...p, imageUrls: [newImageUrl] } : p
                ));
            });
        });
    }, [products]);

    const filterProduct = () => {
        if (price === '' && brand === '') {
            toast.warning("Please select any filter data");
        } else {
            getFilterProduct();
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const resposne = await axios.delete(`/api/product/deleteProduct/${productId}`)
            if (resposne.status === 200) {
                toast.success(resposne.data.message)
                setProducts(data => data.filter(x => x._id !== productId));
            }
        } catch (error) {
            toast.success(error.resposne.data.message)
            console.error(error);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid marginClass">
                {loader ? (
                    <div className="loader-container">
                        <span className="loader">L &nbsp; ading...</span>
                    </div>
                ) : (
                    <div className="row pt-2">
                        <div className="col-md-3">
                            <div style={{ backgroundColor: 'rgb(189, 195, 199,0.1)', padding: "15px", borderRadius: "10px" }}>
                                <h4 className='text-center'>PRODUCT FILTER</h4>
                                <hr />
                                <p className="text-bold">PRICE</p>
                                {filterPrice.map((price, index) => (
                                    <div key={index} className="form-check">
                                        <input className="form-check-input" type="radio" name="orderType" id={price.toLocaleLowerCase()} value={price} onChange={(e) => { setPriceValue(e.target.value) }} />
                                        <label className="form-check-label" htmlFor={price.toLocaleLowerCase()}>{price}</label>
                                    </div>
                                ))}
                                <hr />
                                <p className="text-bold">BRAND</p>
                                {brandArray.length ? '' : (<p className='text-center'>No data!</p>)}
                                <div style={{ height: "140px", overflowY: "auto" }}>
                                    {brandArray.map((brand, index) => (
                                        <div key={index} className="form-check">
                                            <input className="form-check-input" type="radio" name="brabdType" id={brand.toLocaleLowerCase()} value={brand} onChange={(e) => { setBrandValue(e.target.value) }} />
                                            <label className="form-check-label" htmlFor={brand.toLocaleLowerCase()}>{brand.charAt(0).toLocaleUpperCase() + brand.slice(1).toLocaleLowerCase()}</label>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className='btn btn-primary mx-2' type='button' onClick={filterProduct}>Filter</button>
                                    <button className='btn btn-secondary' type='button' onClick={clearFilter}>Clear</button>
                                </div>
                            </div>
                        </div>

                        {products.length === 0 ? (
                            <div className="col-md-9">
                                <div className='noDataFound'></div>
                            </div>
                        ) : (
                            <div className="col-md-9" style={{ backgroundColor: "rgb(189, 195, 199,0.1)", borderRadius: "10px" }}>
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 p-2">
                                    {products.map((product, index) => (
                                        <div className="col" style={{ marginBottom: '12px' }} key={product._id}>
                                            <div className="card h-100 hoverProductEffect" style={{ width: "105%" }}>
                                                <div style={{ height: '18rem' }}>
                                                    <div className="image-container pt-2">
                                                        <img src={product.imageUrls[0]} alt={index} />
                                                        <div className="icon-container">
                                                            <i className="fa-solid fa-pen-to-square hand" onClick={() => navigate(`/editProduct/${product._id}`)}></i>
                                                            <i className="fa-solid fa-trash hand" onClick={() => { deleteProduct(product._id) }}></i>
                                                        </div>
                                                    </div>

                                                    <div className="card-body hand" onClick={() => navigate(`/viewProduct/${product._id}`)} title={`View ${product.productName}`}>
                                                        <h5 className="card-title">{product.productName}</h5>
                                                        <span>
                                                            <s className='text-muted'>₹{product.price}</s>
                                                            <span className='mx-1'>₹{parseFloat(product.price - (product.price * product.discount) / 100).toFixed(2)}</span>
                                                            <span className='text-success'>{product.discount}% off</span>
                                                        </span>
                                                        <br />
                                                        <span>Stocks: {product.stock}</span>
                                                        {/* <p className="card-text">{product.description}</p> */}
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-center align-items-center p-2'>
                                                    <button type='button' className='btn btn-warning me-2' onClick={() => { addToCart(product) }}>Add To Cart</button>
                                                    <button className='btn btn-primary'>Buy Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Product;