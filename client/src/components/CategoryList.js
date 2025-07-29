import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CategoryList = ({ sendDataToParent }) => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const getProductCategory = async () => {
        setLoader(true);
        const response = await axios.get('/api/product/getProductCategory');
        if (response.status === 200) {
            setData(response.data.productCategory);
            setLoader(false);
            sendDataToParent(1)
        }
    }
    const selectedItem = (type) => {
        navigate(`/product/${type}`);
    };

    useEffect(() => {
        getProductCategory();
    }, [])

    return (
        <>
            {loader ? <div className="loader-container">
                <span className="loader">L &nbsp; ading...</span>
            </div> :
                <div className="container mx-3 marginClass">
                    <div className="row mt-1 text-center">
                        <div className="d-flex" style={{ padding: "10px" }}>
                            {data.map((category, index) => {
                                return (
                                    <div key={category._id} className="hand" style={{ width: "100px", height: "100px", marginRight: "5px" }} onClick={() => { selectedItem(category.productType) }}>
                                        <img src={category.imageUrls[0]} alt="Mobiles" style={{ width: "80%", height: "80%", borderRadius: '50%', objectFit: 'cover' }} />
                                        <strong><p>{category.productType.charAt(0).toLocaleUpperCase()+ category.productType.slice(1).toLocaleLowerCase()}</p></strong>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default CategoryList;