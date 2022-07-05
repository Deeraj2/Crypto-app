import React,{ useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import axios from 'axios';
import { CoinList } from './api/api';
import AlertData from './components/Alert';
import firebase from 'firebase/compat/app';
import { doc, onSnapshot } from "firebase/firestore";
import db from './components/firebase/firebase'; 

function App() {
  
  const [currency, setCurrency] = useState("INR")
  const [symbol, setSymbol] = useState("₹")
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [watchlist, setwatchlist] = useState([])


  const [alert, setAlert] = useState({
    open:false,
    message: '',
    type: 'success'
  })

  useEffect(()=>{
    if(user) {
      const coinRef = doc(db, "watchlist", user.uid);

        var unsubscribe = onSnapshot(coinRef, coin =>{
        if(coin.exists()){
          console.log(coin.data().coins)
          setwatchlist(coin.data().coins)
        }else{
          console.log("No items in watchlist")
        }
      })
      return ()=>{
        unsubscribe();
      }
    }
    
  },[user])

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) =>{
      if(user) setUser(user)
      else setUser(null)
    })
  }, [])



  const fetchCoins = async() => {
            setLoading(true)
            const { data } = await axios.get(CoinList(currency))
            setCoins(data)
            setLoading(false)
  }

  useEffect(()=>{
        if(currency === "INR") setSymbol("₹")
        else if(currency === "USD") setSymbol("$")
  },[currency])

  return (
    <div className="app">
      <BrowserRouter>
        <Header  currency={currency} setCurrency={setCurrency} setAlert={setAlert} user={user} watchlist={watchlist} coins={coins} symbol={symbol} />
        <Routes>
          <Route path='/' element={ <HomePage  currency={currency}  symbol={symbol} coins={coins} setCoins={setCoins} loading={loading} setLoading={setLoading} fetchCoins={fetchCoins} /> } />
          <Route path="/coins/:id" element={ <CoinPage symbol={symbol} currency={currency}  user={user} watchlist={watchlist} setAlert={setAlert} /> } />
        </Routes>
      </BrowserRouter>
      <AlertData alert={alert} setAlert={setAlert} />
    </div>
  );
}

export default App;
