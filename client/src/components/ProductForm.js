import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import imageToBase64 from '../helpers/imagetobase64';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = ({ initialState }) => {
    const { id } = useParams();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState(0);
    const [stock, setStock] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [productType, setProductType] = useState('');
    const [brand, setBrand] = useState('');
    const fileInputRef = useRef(null);
    const token = localStorage.getItem('token');
    const [loader, setLoader] = useState(false);
    const url = localStorage.getItem('url');
    let navigate = useNavigate()

    const handleForm = async (event) => {
        event.preventDefault();
        const data = {
            productName,
            description,
            price,
            discount,
            stock,
            imageUrls,
            productType: productType.toLocaleLowerCase(),
            brand,
        }

        try {
            const response = await axios.post('/api/product/addProduct', data);
            if (response.status === 200) {
                toast.success(response.data.message);
                setProductName('');
                setDescription('');
                setPrice('');
                setDiscount('');
                setStock('');
                setImageUrls([]);
                setProductType('');
                setBrand('');
                fileInputRef.current.value = '';
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        }
    }

    const handleEditForm = async (event) => {
        event.preventDefault();
        const data = {
            id: id,
            productName,
            description,
            price,
            discount,
            stock,
            imageUrls,
            productType: productType.toLocaleLowerCase(),
            brand: productType.toLocaleLowerCase(),
        }

        try {
            const response = await axios.put('/api/product/updateProduct', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        }
    }
    const getProductById = async () => {
        try {
            if (id) {
                setLoader(true);
                const response = await axios.get(`/api/product/productById/${id}`);
                setLoader(false);
                let data = response.data.product;
                setProductName(data.productName);
                setDescription(data.description);
                setPrice(data.price);
                setDiscount(data.discount);
                setStock(data.stock);
                setImageUrls(data.imageUrls);
                setProductType(data.productType);
                setBrand(data.brand);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleImage = async (event) => {
        const files = event.target.files;
        const base64Strings = await Promise.all(
            Array.from(files).map(file => imageToBase64(file))
        );
        setImageUrls(prevUrls => [...prevUrls, ...base64Strings]);
    };

    const removeImage = (index) => {
        setImageUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
    };

    useEffect(() => {
        getProductById();
    }, [id])

    return (
        <>
            {
                loader ? <div className="loader-container">
                    <span className="loader">L &nbsp; ading...</span>
                </div> :
                    <div className="container marginClass">
                        <h3 className="text-center py-3">{initialState ? "Add New Product" : "Update Product"}</h3>
                        <div className="row">
                            <form onSubmit={initialState ? handleForm : handleEditForm}>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="productName">Product Name</label>
                                                <input type="text" className="form-control" id='productName' value={productName} onChange={(e) => setProductName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="price">Price</label>
                                                <input type="number" className="form-control" id='price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="stock">Stock</label>
                                                <input type="number" className="form-control" id='stock' value={stock} onChange={(e) => { setStock(e.target.value) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="discount">Discount</label>
                                                <input type="number" className="form-control" id='discount' value={discount} onChange={(e) => { setDiscount(e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="productType">Product Type</label>
                                                <input type="text" className="form-control" id='productType' value={productType} onChange={(e) => { setProductType(e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="brand">Brand</label>
                                                <input type="text" className="form-control" id='brand' value={brand} onChange={(e) => { setBrand(e.target.value) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea name="description" id="description" rows={3} className='form-control' value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                                    </div>
                                    {imageUrls.map((url, index) => (
                                        <div key={index} style={{ display: 'inline' }}>
                                            <img src={url} alt={`Uploaded ${index}`} style={{ margin: '10px', width: '7%', height: '4%' }} />
                                            <i onClick={() => removeImage(index)} className="fa fa-trash deleteIcon" aria-hidden="true" style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}></i>
                                        </div>
                                    ))}
                                    {/* <div className="form-group">
                                    <input type="file" className="form-control hidden" multiple onChange={handleImage} ref={fileInputRef} />
                                    <i className="fa-solid fa-upload" multiple onChange={handleImage}></i>
                                    </div> */}
                                    <div className="row mt-1">
                                        <div className="col">
                                            <label htmlFor="Image">Upload Images</label>
                                            <div className="form-group hand imageUpload" onClick={() => fileInputRef.current.click()}>
                                                Upload
                                                <input type="file" className="form-control" multiple onChange={handleImage} ref={fileInputRef} style={{ display: "none" }} />
                                                <i className="fa-solid fa-cloud-arrow-up"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=' mt-3 mb-3 float-end'>
                                    {initialState ? '' : <button className='btn btn-secondary me-2' type='button' onClick={()=>navigate(url)}>Cancel</button>}
                                    <button className="btn btn-primary" type='submit'>{initialState ? "Save" : "Update"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </>
    )
}
export default ProductForm;