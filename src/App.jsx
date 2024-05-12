import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cryptoList, setCryptoList] = useState([]);
  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(()  => {
    fetchCoins();
  }, [cryptoList]);

  const fetchCoins = () => {

  }

  return (
    <>        
      <h1>My Crypto Tracker</h1>
      <h2>Top 100 Crypto Coins</h2>
      <p>See the top traded coins by total volume across all markets in the last 24 hours.</p>
    </>
  )
}

export default App
