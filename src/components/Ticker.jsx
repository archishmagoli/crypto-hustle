import '../App.css';
import green from '../assets/moving-up.png';
import red from '../assets/moving-down.png';

const Ticker = (props) => {  
    const coins = props.coins;

    return (
      <div className='ticker-container'>
          <div className="ticker-actual">
            {coins.map((item) => (
              <a key={item.CoinInfo.Id} style={{ color: 'white' }}href={`https://www.cryptocompare.com${item.CoinInfo.Url}`} >
                <span className='abbreviation'><b>{item.CoinInfo.Name}: </b> {item.DISPLAY ? item.DISPLAY.USD.PRICE + ' ' : 'N/A '}
                  {item.DISPLAY ? <img className='moving' src={item.DISPLAY.USD.CHANGEPCT24HOUR > 0 ? green : red}></img> : null}
                </span>
              </a>
            ))}
          </div>
      </div>
    )
}

export default Ticker;