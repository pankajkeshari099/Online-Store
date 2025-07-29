import React, { useState } from 'react';
import Navbar from './Navbar';
import ProductForm from './ProductForm';

const EditProduct = () => {
  const [addFunction, setAddFunction] = useState(false);
  return (
    <>
      <Navbar />
      <ProductForm initialState={addFunction}/>
    </>
  )
}

export default EditProduct;