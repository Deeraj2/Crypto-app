import React,{ useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import axios from 'axios';
import { CoinList } from './api/api';

function App() {
  
  const [currency, setCurrency] = useState("INR")
  const [symbol, setSymbol] = useState("₹")
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

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
        <Header  currency={currency} setCurrency={setCurrency} />
        <Routes>
          <Route path='/' element={ <HomePage  currency={currency}  symbol={symbol} coins={coins} setCoins={setCoins} loading={loading} setLoading={setLoading} fetchCoins={fetchCoins} /> } />
          <Route path="/coins/:id" element={ <CoinPage symbol={symbol} currency={currency} /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
