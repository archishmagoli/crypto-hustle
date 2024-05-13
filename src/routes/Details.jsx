import '../App.css';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Details = () => {
    let params = useParams();
    let symbol = params.id;
    const api_key = import.meta.env.VITE_API_KEY;
    const price_url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${api_key}`;
    const detail_url = `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${api_key}`;
    const image_url = "https://www.cryptocompare.com";

    const [priceData, setPriceData] = useState([]);
    const [detailData, setDetailData] = useState([]);

    const fetchDetails = async (id) => {
        try {
            const price_response = await fetch(price_url);
            const detail_response = await fetch(detail_url);

            const price_data = await price_response.json();
            const detail_data = await detail_response.json();
            
            setPriceData(price_data);
            setDetailData(detail_data);

            if (id === 'refresh') {
                alert('Data refreshed!');
            }
            
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchDetails('default');
    }, []);

    return (
        <>
        <button id='home'>
            <Link style={{ color: "white" }} to="/">
                Home
            </Link>
        </button>

        {
            detailData.Data === undefined || priceData == undefined ? <p>Loading...</p> :
            <>
                <div className='header'>
                    <h1>{detailData.Data[symbol].FullName}</h1>
                    <img className='coin-detail-image'src={image_url + detailData.Data[symbol].ImageUrl} alt={detailData.Data[symbol].FullName} />
                </div>

                <h2>About</h2>
                <p>{detailData.Data[symbol].Description}</p>

                <div className='links'>
                    <button className='learn-more'><a href={detailData.Data[symbol].AssetWebsiteUrl} style={{color: 'whitesmoke'}}>Learn More</a></button>
                    <button id='refresh' onClick={(e) => {
                        const id = e.target.id;
                        fetchDetails(id);
                    }}>Refresh</button>
                </div>
                
                <div id='table-div'>
                    <h2>Details</h2>
                    <table id='detail-table'>
                        <thead>
                            <tr>
                                <th>Attribute</th>
                                <th>Data</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Launch Date</td>
                                <td>{detailData.Data[symbol].AssetLaunchDate}</td>
                            </tr>

                            <tr>
                                <td>Whitepaper</td>
                                <td><a href={detailData.Data[symbol].AssetWhitepaperUrl}>{detailData.Data[symbol].AssetWhitepaperUrl}</a></td> 
                            </tr>

                            <tr>
                                <td>Monetary Symbol</td>
                                <td>{detailData.Data[symbol].Symbol}</td>
                            </tr>

                            <tr>
                                <td>Price</td>
                                <td>{priceData.DISPLAY ? priceData.DISPLAY[symbol].USD.PRICE : 'N/A'}</td>
                            </tr>

                            <tr>
                                <td>Market Cap</td>
                                <td>{priceData.DISPLAY ? priceData.DISPLAY[symbol].USD.MKTCAP : 'N/A'}</td>
                            </tr>

                            <tr>
                                <td>Volume</td>
                                <td>{priceData.DISPLAY ? priceData.DISPLAY[symbol].USD.TOTALVOLUME24H : 'N/A'}</td>
                            </tr>

                            <tr>
                                <td>Percent Change</td>
                                <td>{priceData.DISPLAY ? priceData.DISPLAY[symbol].USD.CHANGEPCT24HOUR : 'N/A'}</td>
                            </tr>

                            <tr>
                                <td>24-Hour High Price</td>
                                <td>{priceData.DISPLAY ? priceData.DISPLAY[symbol].USD.HIGH24HOUR : 'N/A'}</td>
                            </tr>

                            <tr>
                                <td>24-Hour Low Price</td>
                                <td>{priceData.DISPLAY ? priceData.DISPLAY[symbol].USD.LOW24HOUR : 'N/A'}</td>
                            </tr>

                            <tr>
                                <td>Today's Open Price</td>
                                <td>{priceData.DISPLAY ? priceData.DISPLAY[symbol].USD.OPEN24HOUR : 'N/A'}</td>
                            </tr>

                            <tr>
                                <td>Supply</td>
                                <td>{priceData.DISPLAY ? priceData.DISPLAY[symbol].USD.SUPPLY : 'N/A'}</td>
                            </tr>

                            <tr>
                                <td>Market Cap</td>
                                <td>{priceData.DISPLAY ? priceData.DISPLAY[symbol].USD.MKTCAP : 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
            
        }
        </>
    )
}

export default Details;