import React from 'react'
import Banner from '../components/Banner/Banner'
import CoinsTable from '../components/Home/CoinsTable'

function HomePage({ currency, symbol, coins, setCoins, loading, setLoading, fetchCoins }) {
  return (
    <div className='home-page'>
        <Banner currency={currency} symbol={symbol} />
        <CoinsTable  currency={currency} symbol={symbol} coins={coins} setCoins={setCoins} loading={loading} setLoading={setLoading} fetchCoins={fetchCoins} />
    </div>
  )
}

export default HomePage