import { useState, useEffect } from 'react'
import './App.css'
import green from './assets/moving-up.png';
import red from './assets/moving-down.png';

function App() {
  const [fullList, setFullList] = useState([]);
  const [cryptoList, setCryptoList] = useState([]);
  const api_key = import.meta.env.VITE_API_KEY;
  const image_url = "https://www.cryptocompare.com";
  const [searchInput, setSearchInput] = useState("");

  useEffect(()  => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=50&tsym=USD&api_key=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCryptoList(data.Data);
      setFullList(data.Data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "" && cryptoList) {
      const filteredData = cryptoList.filter((item) => 
        {
          return (item.CoinInfo.FullName + " " + item.CoinInfo.Name).toLowerCase()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
        }
      )
      setCryptoList(filteredData);
    } else {
      setCryptoList(fullList);
    }
  };

  return (
    <>
      <div className='ticker-container'>
        <div className="ticker-actual">
          {Object.entries(cryptoList).map((item) => (
              <span className='abbreviation' key={item[1].CoinInfo.Id}><b>{item[1].CoinInfo.Name}: </b> {item[1].DISPLAY ? item[1].DISPLAY.USD.PRICE + ' ' : 'N/A '}
                {item[1].DISPLAY ? <img className='moving' src={item[1].DISPLAY.USD.CHANGEPCT24HOUR > 0 ? green : red}></img> : null}
              </span>
          ))}
        </div>
      </div>
      
      <div className="header">
        <h1>My Crypto Tracker</h1>
        <img id='crypto-icon' src='../public/crypto-icon.png' alt='crypto-icon' />
      </div>
      <h2>Top Crypto Coins</h2>
      <p>See some of the most popular coins traded today.</p>
      <input type="text" id='search' placeholder="Search..." onChange={e => searchItems(e.target.value)} />
      <div className='coin-list'>
        {cryptoList ? Object.entries(cryptoList).map((item) => {
          return (
            <div key={item[1].CoinInfo.Id} className="coin-container">
              <div className="coin-row">
                <div className="coin">
                  <img className='coin-image'src={image_url + item[1].CoinInfo.ImageUrl} alt={item[1].CoinInfo.FullName} />
                  <h3>{item[1].CoinInfo.FullName} ({item[1].CoinInfo.Name})</h3>
                </div>
                <div className="coin-data">
                  {item[1].DISPLAY ?
                    <>
                      <p className="coin-price"><b>Price: </b>{item[1].DISPLAY.USD.PRICE}</p>
                      <p className="coin-volume"><b>Volume: </b>{item[1].DISPLAY.USD.TOTALVOLUME24H}</p>
                      <p><b>Percent Change:</b> <span className={item[1].DISPLAY.USD.CHANGEPCT24HOUR > 0 ? 'coin-percent green' : 'coin-percent red'}>{Math.round(item[1].RAW.USD.CHANGEPCT24HOUR * 100) / 100}%</span></p>
                    </> : <p>Pricing data not found</p>}
                </div>
              </div>
            </div>
          )
        }
        ) : <p>Loading...</p>}
      </div>
    </>
  )
}

export default App
