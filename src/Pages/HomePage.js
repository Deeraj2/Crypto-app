import React from 'react'
import Banner from '../components/Banner/Banner'

function HomePage({ currency, symbol }) {
  return (
    <div className='home-page'>
        <Banner currency={currency} symbol={symbol} />
    </div>
  )
}

export default HomePage