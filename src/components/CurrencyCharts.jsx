import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CurrencyChart({country, currencyCode, setCurrencyCode, targetCurrency, setTargetCurrency}) {
  const [chartsData, setChartsData] = useState([]);

  useEffect(() => {
    setCurrencyCode(Object.keys(country.currencies)[0])

    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30)
    const start = startDate.toISOString().split("T")[0];


    fetch(`https://api.frankfurter.app/${start}..${endDate}?from=${currencyCode}`)
      .then(res => res.json())
      .then(json => {
        const chartData = Object.entries(json.rates).map(([date, rate]) => ({
          date,
          value: rate[targetCurrency]
        }))
        setChartsData(chartData)
      })
  }, [country, targetCurrency]);

  const currencies = ['EUR', 'USD', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'];

  if (!country || !country.currencies) return <p>Ingen valutadata tillgänglig</p>;

return (
    <div className='w-full h-96 p-4 rounded-xl shadow-lg backdrop-blur-md bg-white/10 border border-white/20'>
        <div>
            <label>Compare with:</label>
            <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className='border rounded px-2 py-1'
            >
                <option value="" disabled>Select currency</option>
                {currencies.map(cur => <option key={cur} value={cur}>{cur}</option>)}
            </select>
        </div>

    
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={chartsData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" stroke='#a855f7'/>
        <XAxis dataKey="date" />
            <YAxis 
      tick={{ fill: 'white', fontSize: 12 }} 
      domain={['dataMin * 0.95', 'dataMax * 1.05']} 
    />
                  <Line type="monotone" dataKey="value" stroke="#ec4899" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
        <Tooltip formatter={(value) => value.toFixed(4)}/>
      </LineChart>
    </ResponsiveContainer>
        </div>
)
}

export default CurrencyChart;