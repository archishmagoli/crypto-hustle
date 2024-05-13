import '../App.css';
import { Link } from 'react-router-dom';

const CryptoCard = (props) => {
    const card = props.card;
    const image_url = "https://www.cryptocompare.com";

    return (
        <>
            {
                card.CoinInfo ? (
                    <div key={card.CoinInfo.Id} className="coin-container">
                        <div className="coin-row">
                            <div className="coin">
                                <img className='coin-image'src={image_url + card.CoinInfo.ImageUrl} alt={card.CoinInfo.FullName} />
                                <h3>{card.CoinInfo.FullName} ({card.CoinInfo.Name})</h3>
                                <Link to={"/details/" + card.CoinInfo.Name}>
                                    <button className='button button-detail'>
                                        View Details 
                                    </button>
                                </Link>
                            </div>
                            <div className="coin-data">
                            {card.DISPLAY ?
                                <>
                                    <p className="coin-price"><b>Price: </b>{card.DISPLAY.USD.PRICE}</p>
                                    <p className="coin-volume"><b>Volume: </b>{card.DISPLAY.USD.TOTALVOLUME24H}</p>
                                    <p><b>Percent Change:</b> <span className={card.DISPLAY.USD.CHANGEPCT24HOUR > 0 ? 'coin-percent green' : 'coin-percent red'}>{Math.round(card.RAW.USD.CHANGEPCT24HOUR * 100) / 100}%</span></p>
                                </> 
                            : <p>Pricing data not found</p>}
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}

export default CryptoCard;