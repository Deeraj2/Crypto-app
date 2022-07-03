import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './CoinsTable.css';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CoinsTable({currency, symbol, coins, loading, fetchCoins}) {

    const header = ["Coin", "Price", "24h Change", "Market Cap"]
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')


    useEffect(()=>{
        fetchCoins()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])
    
    const handleSearch = () =>{
       return coins.filter((coin)=>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )
    }

  return (
    <div className='coins'>
        <div className='coinsTable'>
            <div className='coins-info'>
                <h3>Cryptocurrency Prices By Market Cap</h3>
                <input 
                    type='search' 
                    placeholder='Search' 
                    onChange={(e)=> setSearch(e.target.value)}
                    />
            </div>
            
        </div>
        <TableContainer>
            {loading ? (<LinearProgress  className='coin-linear'/>) :
                <Table >
                    <TableHead  className='coin-head'>
                        <TableRow>
                            {header.map((head)=>(
                                <TableCell
                                    style={{
                                        fontWeight: "700",
                                        color: "white" 
                                    }}
                                    key={head}
                                    align={head === "Coin" ? "" : "right"}
                                >{head}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>{handleSearch().slice((page-1)*10, (page-1)*10+10).map((row)=> {
                        const profit = row.price_change_percentage_24h > 0

                        return(
                            <TableRow
                                sx={{borderBottom: "2px solid gray",
                                    cursor: 'pointer',
                                    "&:hover": {
                                        backgroundColor: "#161e29"
                                    }
                                }}
                                className='coins-detail'
                                onClick={()=> navigate(`/coins/${row.id}`)}
                                key={row.name}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    styles={{
                                        display: "flex",
                                        gap: 15,
                                        borderBottom: 'gray'
                                    }}
                                >   
                                <div className='row-names'>
                                    <img 
                                        src={row?.image}
                                        alt={row.name}
                                        className='coins-img'
                                        />
                                    <div className='row-name'>
                                        <span>{row.symbol.toUpperCase()}</span>
                                        <span className='gray'>{row.name}</span>
                                    </div>
                                </div>
                                </TableCell>
                                <TableCell
                                    align='right'
                                >
                                <p className='row-price'>
                                    <span>{symbol}&nbsp;</span>
                                    <span>{numberWithCommas(row.current_price.toFixed(2))}</span>
                                </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                >
                                    <p className={profit > 0 ? "row-green" : "row-red"}>
                                        {profit && "+"}
                                        {row.price_change_percentage_24h.toFixed(2)}%
                                    </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                >
                                    <p className='row-marketcap'>
                                        <span>{symbol}</span>&nbsp;
                                        <span>{ numberWithCommas(row.market_cap.toString().slice(0, -6)) }M</span>
                                    </p>
                                </TableCell>
                            </TableRow>
                        )
                    })}</TableBody>
                </Table>   
            }
        </TableContainer>
        <Pagination 
            count={(handleSearch()?.length/10).toFixed(0)}
            className="pagination"
            color="primary"
            sx={{
                "& .MuiPaginationItem-root": {
                    color: "white",
                },
            }}
            onChange={(_, value)=>{
                setPage(value);
                window.scroll(0, 450)
            }}
        />
    </div>  
  )
}

export default CoinsTable