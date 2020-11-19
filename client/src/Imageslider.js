import React from 'react'
import "./Imageslider.css";
import Slider from 'react-slick';

function Imageslider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const images = [
        "/home/binay/Desktop/react_app/static/mages/1.jpg",
        "/home/binay/Desktop/react_app/static/mages/3.jpg",
        "/home/binay/Desktop/react_app/static/mages/4.jpg",
        "/home/binay/Desktop/react_app/static/mages/5.jpg",
        "/home/binay/Desktop/react_app/static/mages/bac2.jpg",
        "/home/binay/Desktop/react_app/static/mages/group.jpg",
        "/home/binay/Desktop/react_app/static/mages/phot.jpg"
        
    ]

    return (
        <div className="imageslider">

            <Slider {...settings} >
                <div>
                    <img src="/home/binay/Desktop/react_app/static/mages/1.jpg" className="slider__image" />
                </div>

                <div>
                    <img src={images[0]} className="slider__image" />
                </div>

                <div>
                    <img src={images[2]} className="slider__image" />
                </div>
                <div>
                    <img src={images[3]} className="slider__image" />
                </div>

                <div>
                    <img src={images[4]} className="slider__image" />
                </div>
                <div>
                    <img src={images[5]} className="slider__image" />
                </div>
                

            </Slider>
       
        </div>
    )
}

export default Imageslider
