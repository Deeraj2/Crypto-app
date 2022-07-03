import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  Line as chartjs} from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../../api/api';
import './CoinInfo.css';
import { chartDays } from './CoinButtonData';

function CoinInfo({coin, currency}) {

  const [historic, setHistoric] = useState();
  const [days, setDays] = useState(1)

  useEffect(()=>{
    const fetchHistoricData = async() =>{
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
      setHistoric(data.prices)
    }
    return fetchHistoricData
  }, [currency, days])

  return (
    <div className='coin-info'>
      {
        !historic ? (
          <CircularProgress
            style={{ color: "#2190FF" }}
            size={250}
            thickness={1} />
        ) : (
          <>
            <Line
              data={{
                labels: historic.map((coin)=>{
                  let date = new Date(coin[0]);
                  let time = 
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                      : `${date.getHours()}:${date.getMinutes()}AM`;
                  return days === 1 ? time : date.toLocaleDateString()
                }),
                datasets: [{
                  data : historic.map((coin)=>coin[1]),
                  label: `Price (Past ${days} Days) in ${currency}`,
                  borderColor: "#2190FF",
                }],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  }
                }
              }}
            />
            <div className='button'>
              {chartDays.map((day)=>(
                <button className='button-days' key={day.value}
                     onClick={()=> setDays(day.value)}
                     selected={day.value === days }
                >{day.label}</button>
              ))}
            </div>
          </>
        )
      }
    </div>
  )
}

export default CoinInfo