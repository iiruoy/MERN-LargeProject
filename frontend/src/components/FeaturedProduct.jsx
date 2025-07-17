import React from 'react'
import '../css/featuredProduct.css'

function FeaturedProduct() {
  return (
    <>
        <div className="title-container">
            <div className="title-trending">Trending Now</div>
            <div className="underline-bar"></div>
        </div>

        <div className="card-container-advertis">
            <div className="image-wrapper">
                <img src="./assets/360_F_322281216_Gc3ZRt1BJe127lZFwZFqcxz2b1JVU6na.jpg" alt="" />
                <div className="gray-overlay"></div>
            </div>
            <div className="image-wrapper">
                <img src="./assets/portrait-happy-young-man-holding-laptop-computer_171337-12000.avif" alt="" />
                <div className="gray-overlay"></div>
            </div>
            <div className="image-wrapper">
                <img src="./assets/pexels-photo-3756962.jpeg" alt="" />
                <div className="gray-overlay"></div>
            </div>
        </div>

    </>
    
  )
}

export default FeaturedProduct