import React, { useState } from 'react';
import Navbar from './Navbar';
import ProductForm from './ProductForm';

const AddProduct = () => {
  const [addFunction, setAddFunction] = useState(true);
  return (
    <>
      <Navbar />
      <ProductForm initialState={addFunction}/>
    </>
  )
}

export default AddProduct;