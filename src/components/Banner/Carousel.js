import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../api/api';
import './Carousel.css';


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Carousel({currency, symbol}) {

  const [trending, setTrending] = useState([])

    useEffect(()=>{
      const fetchTrendingCoins = async() => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }
    return fetchTrendingCoins
    }, [currency])


//map filter to add items in carousel 
    const items = trending.map((coin)=>{
      let profit = coin?.price_change_percentage_24h > 0;

      return(
        
          <Link to={`/coins/${coin.id}` } className='carousel'>
            <img   src={coin?.image} 
                  height= "80"
                  alt={coin.name}
                  />
            <p className='carouse-24hr'><span>{coin?.symbol}</span>&nbsp;<span style={{color: profit > 0 ? "#228B22" : "red" , fontWeight: 500 }} >{profit && "+"}{coin?.price_change_percentage_24h}%</span></p>
            <p className='carousel-detail'><span>{symbol}</span>{numberWithCommas(coin?.current_price)}</p>
          </Link> 
            
      )

    })

    //Carousel responsive item to show
    const responsive = {
      0: {
        items: 2,
      },
      512: {
        items: 5,
      },
    }

  return (
    <div >
      <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
        />
    </div>
  )
}

export default Carousel