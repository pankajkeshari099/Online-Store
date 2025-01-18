import React from 'react'
import img1 from '../images/discount-shopping-season-with-sale.jpg'
import img2 from '../images/woman-inputting-card-information.jpg'
import img3 from '../images/artem-beliaikin.jpg'
import img4 from '../images/markus-spiske.jpg'
const Carousel = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="advertisement">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={img1} className="d-block w-100 carousel" alt="Slide 1" />
                            </div>
                            <div className="carousel-item">
                                <img src={img2} className="d-block w-100 carousel" alt="Slide 2" />
                            </div>
                            <div className="carousel-item">
                                <img src={img3} className="d-block w-100 carousel" alt="Slide 3" />
                            </div>
                            <div className="carousel-item">
                                <img src={img4} className="d-block w-100 carousel" alt="Slide 4" />
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
export default Carousel