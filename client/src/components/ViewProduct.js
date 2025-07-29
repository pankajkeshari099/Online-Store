import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import commonFunctions from '../helpers/common';
const { addToCart } = commonFunctions;

const ViewProduct = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [indexValue, setIndexValue] = useState(0);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({
        productName: '',
        imageUrls: [],
    });

    const getProductById = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`/api/product/productById/${id}`);
            if (response.status === 200) {
                setData(response.data.product);
                setLoader(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const changeImage = (index) => {
        setIndexValue(index)
    }
    const saveDataIntoCart = async () => {
        let product = {
            _id: data._id,
            price: data.price,
        }
        await addToCart(product);
    }

    useEffect(() => {
        getProductById();
    }, [id]);

    return (
        <>
            <Navbar />
            <div className="container-fluid marginClass">
                {
                    loader ? <div className="loader-container">
                        <span className="loader">L &nbsp; ading...</span>
                    </div> :
                        <div className="row viewProductMain p-3">
                            <div className="d-flex justify-content-end"> <i className="fa-regular fa-circle-xmark hand" onClick={() => { navigate(`${localStorage.getItem('url')}`) }}></i> </div>
                            <div className="col-md-6">
                                <div className="d-flex">
                                    <div className="d-flex flex-column gap-2" style={{ maxHeight: '390px', overflowY: 'auto' }}>
                                        {data.imageUrls.map((url, index) => (
                                            <div key={index} onClick={() => { changeImage(index) }} className="image-container-view hand" style={{ width: '100%', height: '100%' }}>
                                                <img src={url} alt={index} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="hand viewMainImageBody">
                                        <img src={data.imageUrls[indexValue]} className="img-fluid rounded viewMainImage" alt="Main product" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 justify-content-center">
                                <h2 className="mb-3">{data.productName}</h2>
                                <p><s className='text-muted'>₹{data.price}</s>
                                    <span className="mx-1">₹{parseFloat(data.price - (data.price * data.discount) / 100).toFixed(2)}</span>
                                    <span className='text-success'>{data.discount}% off</span></p>
                                <p>Stocks: {data.stock}</p>
                                <h6>Description</h6>
                                <p>{data.description}</p>
                                <div className="mt-3">
                                    <Link className="btn btn-warning me-3" onClick={() => { saveDataIntoCart() }}>Add To Cart</Link>
                                    <Link className="btn btn-primary">Buy Now</Link>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    );
};

export default ViewProduct;