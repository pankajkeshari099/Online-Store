import React from "react";
import Navbar from "./Navbar";
import computer from "../images/computer.jpg";
import  mobile from "../images/mobile.jpg"
const Home = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="home_head mt-3">
                    <div className="row pt-3 text-center">
                        <div className="col-md hand">
                            <img src={mobile} alt="" width={130}  height={100}/>
                            <strong><p>Mobiles</p></strong>
                        </div>
                        <div className="col-md hand">
                            <img src={mobile} alt="" width={130}  height={100}/>
                            <strong><p>Fashion</p></strong>
                        </div>
                        <div className="col-md hand">
                            <img src={mobile} alt="" width={130}  height={100}/>
                            <strong><p>Electronics</p></strong>
                        </div>
                        <div className="col-md hand">
                            <img src={mobile} alt="" width={130}  height={100}/>
                            <strong><p>Home & Furniture</p></strong>
                        </div>
                        <div className="col-md hand">
                            <img src={mobile} alt="" width={130}  height={100}/>
                            <strong><p>Appliances</p></strong>
                        </div>
                        <div className="col-md hand">
                            <img src={mobile} alt="" width={130}  height={100}/>
                            <strong><p>Beauty, Toy & morex</p></strong>
                        </div>
                    </div>
                </div>
                <div className="advertisement mt-3">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                        <div className="carousel-indicators">
                          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <img src={computer} height={250} className="d-block w-100" alt="..."/>
                          </div>
                          <div className="carousel-item">
                            <img src={computer} height={250} className="d-block w-100" alt="..."/>
                          </div>
                          <div className="carousel-item">
                            <img src={computer} height={250} className="d-block w-100" alt="..."/>
                          </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                </div>
            </div>
        </>
    )
}
export default Home