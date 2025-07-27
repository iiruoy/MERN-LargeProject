import React from 'react'
import { useState, useEffect } from 'react';


const wordContainer = [
    {text: 'Limtied time offer 30% off', desc: 'Crank it up Hear the world differently Today!', img: './assets/header_headphone_image.cb07f9d4.png'},
    {text: 'Only a few left in stock', desc: 'Next-gen performance. Stunning visuals. Play without limits.', img: './assets/header_playstation_image.f40d654c.png'},
    {text: 'Exclusive deal get more than 50% off', desc: 'Power meets precision in the ultimate creative machine.', img: './assets/header_macbook_image.2135a26c.png'}
]; 


function HomePageSlider() {

    const [index, setIndex] = useState(0); 

    useEffect(function() { 
        const interval = setInterval(() => {
            setIndex(function(curr) { 
                return (curr + 1) % wordContainer.length;
            })
        }, 3000);
    }, []);

    
  return (
    <div className='card-container-slider'>
        <div className='animation-container' style={{ transform: `translateX(-${index * 100}%)` }} >
            {wordContainer.map((item, i) => { 
                return (
                <div className='slide' key={i}>
                    <div className='word-container-slider'>
                    <div className='sale-slider'>{item.text}</div>
                    <div className='slider-text-dis'>{item.desc}</div>
                    <div className='button-slider-box'><div className='order-now-box'>Order Now</div> <div className='learn-more-slider'>Learn more</div></div>
                </div>
                    <div className='slider-image'><img src={item.img} /></div>
                </div>
                );
            })}
        </div>
    </div>
  )
}

export default HomePageSlider