import { useState, useEffect } from 'react';
import './App.css'
import CryptoCard from './components/CryptoCard.jsx';
import Ticker from './components/Ticker.jsx';
const api_key = import.meta.env.VITE_API_KEY;

function App() {
  const [fullList, setFullList] = useState([]);
  const [cryptoList, setCryptoList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(()  => {
    fetchCoins('default');
  }, []);

  const fetchCoins = async (id) => {
    const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=50&tsym=USD&api_key=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCryptoList(data.Data);
      setFullList(data.Data);
      
      if (id === 'refresh') {
        alert('Data refreshed!');
      }

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
      <div className='page'>
        <div className = 'content'>
          
          <Ticker coins={fullList} />
          
          <div className="header">
            <h1>My Crypto Tracker</h1>
            <img id='crypto-icon' src='../crypto-icon.png' alt='crypto-icon' />
            <button id='refresh' onClick={(e) => {
                const id = e.target.id;
                fetchCoins(id);
            }}>Refresh</button>
          </div>
          <h2>Top Crypto Coins</h2>
          <p>See some of the most popular coins traded today.</p>

          <input type="text" id='search' value={searchInput} placeholder="Search..." onChange={e => searchItems(e.target.value)} />

          <div className='coin-list'>
            {cryptoList ? cryptoList.map((item) => {
              return (
                <CryptoCard key={item.CoinInfo.Id} card={item} />
              )
            }
            ) : <p>Loading...</p>}
          </div>
        </div>
        
      </div>
    </>
  )
}

export default App
