import React from "react";
import "../assets/Carousel.css"
import temp from "../images/leaf.svg"

export default function Carousel() {
  return (
    <>  
            <div id="carouselExampleIndicators" data-ride="carousel" data-pause="hover">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-50" src={temp} alt="First slide"/>
                        <div className="carousel-caption d-md-block">
                            <h5>Keyboards for Sale</h5>
                            <p>Exclusive deals only found here</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="carousel-caption d-md-block">
                            <h5>Keyboards for Sale</h5>
                            <p>Exclusive deals only found here</p>
                        </div>
                        <img className="d-block w-50" src={temp} alt="Second slide"/>
                        
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-50" src={temp} alt="Third slide"></img>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
    </>
  );
}