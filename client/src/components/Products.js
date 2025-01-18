import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import addToCart from "../helpers/common";
import { useLocation } from 'react-router-dom';

const Product = () => {
    const { type } = useParams();
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    let navigate = useNavigate();
    const location = useLocation();
    let token = localStorage.getItem('token');

    useEffect(() => {
        localStorage.setItem('url', location.pathname)
        getProduct();
    }, [])

    const getProduct = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`/api/product/getProduct/${type}`);
            if (response.status === 200) {
                setProducts(response.data.products);
                setLoader(false);
            }
        } catch (error) {
            console.error(error)
        }
    }

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
        }

        products.forEach(product => {
            removeBackground(product.imageUrls[0], (newImageUrl) => {
                setProducts(prevProducts => prevProducts.map(p =>
                    p._id === product._id ? { ...p, imageUrls: [newImageUrl] } : p
                ));
            });
        });
    }, [products]);

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                {loader ? <div className="loader-container">
                    <span className="loader">L &nbsp; ading...</span>
                </div> :
                    <div className="row p-2">
                        <div className="col-md-3">
                            advance filter here
                        </div>
                        <div className="col-md-9">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                                {products.map((product, index) => (
                                    <div className="col" style={{ marginBottom: '12px' }} key={product._id}>
                                        <div className="card h-100" style={{ width: "105%" }}>
                                            <div className='hand' onClick={() => navigate(`/viewProduct/${product._id}`)} title={`View ${product.productName}`}>
                                                <div className="image-container">
                                                    <img src={product.imageUrls[0]} alt={index} />
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.productName}</h5>
                                                    <span>
                                                        <s className='text-muted'>₹{product.price}</s> ₹{product.price - product.discount}
                                                        <span className='text-success'>{parseInt((product.discount / product.price) * 100)}% off</span>
                                                    </span>
                                                    <br />
                                                    <span>Stocks: {product.stock}</span>
                                                    <p className="card-text">{product.description}</p>
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
                    </div>
                }
            </div>
        </>
    )
}

export default Product;
