import React, { Component, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const api_key = import.meta.env.VITE_API_KEY;
import '../App.css';

const CoinChart = ({ symbol, market }) => {
    const [histData, setHistData] = useState(null);

    const getHistoricalData = async () => {
        const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&e=${market}&api_key=${api_key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setHistData(cleanData(data.Data.Data));

        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getHistoricalData();
    }, []);

    const cleanData = (data) => {
        let filteredData = [];
        let countDays = 0;

        for (const item of data) {
          let accurateDay = new Date();
          accurateDay.setDate(accurateDay.getDate() - countDays);
      
          filteredData.push({
            'time': accurateDay.toLocaleDateString("en-US"),
            'open price': item.open,
          });
          countDays++;
        }
      
        // data is given counting backwards, so return the reverse to have data ordered from oldest to newest for accurate plotting
        return filteredData.reverse();    
    };

    const TooltipContent = ({ active, payload, label }) => {
        if (active) {
          return (
            <div className="custom-tooltip">
              <p className="label"><b>Date: </b>{`${label}`}</p>
              <p className="intro"><b>Open Price: </b>{`$${payload[0].value.toLocaleString()}`}</p>
            </div>
          );
        }
      
        return null;
    };

    return (
        <> 
            <h2>30-Day Historical Price Data</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='chart-container'>
                    {histData ?
                        <LineChart width={600} height={300} data={histData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="open price" stroke="red" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="time" />
                            <YAxis dataKey='open price'/>
                            <Tooltip content={TooltipContent}  />
                        </LineChart>
                    : null}
                </div>
            </div>
        </>
    )
}

export default CoinChart;