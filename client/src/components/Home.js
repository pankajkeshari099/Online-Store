import React, { useState } from "react";
import Navbar from "./Navbar";
import CategoryList from "./CategoryList";
import Carousel from "./Carousel";

const Home = () => {
  const [dataFromChild, setDataFromChild] = useState(0);

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }
  return (
    <>
      <Navbar />
      <CategoryList sendDataToParent={handleDataFromChild} />
      {
        dataFromChild ? <Carousel /> : ''
      }
    </>
  );
};

export default Home;