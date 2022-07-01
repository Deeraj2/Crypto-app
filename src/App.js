import React,{ useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';

function App() {
  
  const [currency, setCurrency] = useState("INR")
    const [symbol, setSymbol] = useState("Rs")

    console.log(currency)

    useEffect(()=>{
        if(currency === "INR") setSymbol("Rs")
        else if(currency === "USD") setSymbol("$")
    },[currency])

  return (
    <div className="app">
      <BrowserRouter>
        <Header  currency={currency} setCurrency={setCurrency} />
        <Routes>
          <Route path='/' element={ <HomePage  currency={currency}  symbol={symbol}/> } />
          <Route path="/coin/:id" element={ <CoinPage /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
