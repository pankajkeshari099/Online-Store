import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { toast } from "react-toastify";
import imageToBase64 from '../helpers/imagetobase64';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState(0);
    const [stock, setStock] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [productType, setProductType] = useState('');

    const handleForm = async (event) => {
        event.preventDefault();
        const data = {
            productName: productName,
            description: description,
            price: price,
            discount: discount,
            stock: stock,
            imageUrls: imageUrls,
            productType: productType
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
            }
        } catch (error) {
            toast.error(error.response.data.message);
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
    
    return (
        <>
            <Navbar />
            <div className="container">
                <h2 className="text-center mt-3">Add Product</h2>
                <div className="row">
                    <form onSubmit={handleForm}>
                        <div className="col-8 offset-2">
                            <div className="form-group">
                                <label htmlFor="Product Name">Product Name</label>
                                <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Description">Description</label>
                                <input type="text" className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Price">Price</label>
                                <input type="number" className="form-control" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Price">Discount Amount</label>
                                <input type="number" className="form-control" value={discount} onChange={(e) => { setDiscount(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Stock">Stock</label>
                                <input type="number" className="form-control" value={stock} onChange={(e) => { setStock(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Product Type">Product Type</label>
                                <input type="text" className="form-control" value={productType} onChange={(e) => { setProductType(e.target.value) }} />
                            </div>
                            {imageUrls.map((url, index) => (
                                <div key={index} style={{ display: 'inline'}}>
                                    <img src={url} alt={`Uploaded ${index}`} style={{ margin: '10px', width: '100px',height: '100px', border: "2px solid balck" }} />
                                        <i onClick={() => removeImage(index)} className="fa fa-trash deleteIcon" aria-hidden="true" style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}></i>
                                </div>
                            ))}
                            <div className="form-group">
                                <label htmlFor="Image">Upload Images</label>
                                <input type="file" className="form-control" multiple onChange={handleImage} />
                            </div>
                            <button className="btn btn-primary mt-3 form-control" type='submit'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct;