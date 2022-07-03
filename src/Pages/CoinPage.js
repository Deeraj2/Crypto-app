import { LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReacHtmlParser from 'react-html-parser'
import { useParams } from 'react-router';
import { SingleCoin } from '../api/api';
import CoinInfo from '../components/CoinInfo/CoinInfo';
import './CoinPage.css';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CoinPage({symbol, currency}) {

  const { id } = useParams();
  const [coin, setCoin] = useState();

  console.log(coin)

  

  useEffect(()=>{
    const fetchSingleCoin = async() => {
      const { data } = await axios.get(SingleCoin(id))
      setCoin(data)
    }
    return fetchSingleCoin
  },[id])

  if(!coin) return <LinearProgress style={{backgroundColor: "#2190FF"}} />

  return (
    <div className='coin-page'>
          <div className='coin-sidebar'>
              <img src={coin?.image.large} alt={coin?.name} className="coin-image" />
              <h3 className='coin-name'>{coin?.name}</h3>
              <p className='coin-desc'>{ReacHtmlParser(coin?.description.en.split(". ")[0])}</p>
              <div className='coin-marketdata'>
                <div className='coin-market'>
                  <h4>Rank:</h4>&nbsp;&nbsp;
                  <h4>{coin?.market_cap_rank}</h4>
                </div>
                <div className='coin-market'>
                  <h4>Current Price:</h4>&nbsp;&nbsp;
                  <h4>{symbol}&nbsp;{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</h4>
                </div>
                <div className='coin-market'>
                  <h4>Market Cap:</h4>&nbsp;&nbsp;
                  <h4>{symbol}&nbsp;{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</h4>
                </div>
              </div>
          </div>
          <CoinInfo coin={coin} currency={currency} />
    </div>
  )
}

export default CoinPage