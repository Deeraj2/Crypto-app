import React from 'react';
import './Banner.css';
import Carousel from './Carousel';

function Banner({currency, symbol}) {
  return (
    <div className='banner'>
            <div className='title'>
                <h1>Crypto Hunter</h1>
                <p>Get all the Info Regarding Your Favourite Crypto Currency</p>
            </div>
            <Carousel currency={currency} symbol={symbol}/>
    </div>
  )
}

export default Banner