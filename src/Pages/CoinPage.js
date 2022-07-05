import { LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReacHtmlParser from 'react-html-parser'
import { useParams } from 'react-router';
import { SingleCoin } from '../api/api';
import CoinInfo from '../components/CoinInfo/CoinInfo';
import db from '../components/firebase/firebase';
import './CoinPage.css';
import {  doc, setDoc } from "firebase/firestore"; 


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CoinPage({symbol, currency, user, watchlist,setAlert}) {

  const { id } = useParams();
  const [coin, setCoin] = useState();

  const inWatchList = watchlist.includes(coin?.id)

  const addToWatchList = async() => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );


      setAlert({
        open: true,
        message: `${coin.name} Added to the watchlist !`,
        type: "success"
      })
    } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: 'error'
        }) 
    }
  }

  const removeFromWatchList = async() =>{
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((watch)=> watch !== coin?.id) },
        { merge: true }
      );


      setAlert({
        open: true,
        message: `${coin.name} Removed from the watchlist !`,
        type: "success"
      })
    } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: 'error'
        }) 
    }
  }

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
              {user && (
                <button className= {inWatchList ?  "coin-rmbtn" : "coin-authbtn"} onClick={ inWatchList ? removeFromWatchList : addToWatchList} >{ inWatchList ? "Remove from Watchlist" : "Add to Watchlist"}</button>
              )}
          </div>
          <CoinInfo coin={coin} currency={currency} />
    </div>
  )
}

export default CoinPage