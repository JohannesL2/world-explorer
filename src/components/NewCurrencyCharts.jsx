import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useMemo } from 'react';

export default function NewCurrencyCharts({chartsData}) {
    if (!chartsData || !Array.isArray(chartsData) || chartsData.length === 0) {
    return <p className="text-gray-400 text-sm">Laddar valutadata...</p>;
  }


    const data = useMemo(() => ({
        labels: chartsData.map(item => item.date),
        datasets: [
            {
                label: 'Exchange Rate',
                data: chartsData.map(item => item.value),
            }
        ]
    }), [chartsData]);

    const options = {
        responsive: true,
        plugins: {
            legend: {position: 'top', labels: {color: 'white'}},
            title: {display: true, text: 'Currency Exchange Rate (Chart.js)'},
        },
        scales: {
            x: {
                ticks: {color: 'white', font: { size: 12}},
                grid: {color: 'rgba(255,255,255,0.1)' },
            },
      y: {
        ticks: { color: 'white', font: { size: 12 } },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
  };

  if (!chartsData.length) {
    return <p className="text-gray-400 text-sm">Laddar valutadata...</p>;
  }

  return (
    <div>
            <div className="w-full mt-8 p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
      <Bar data={data} options={options} />
    </div>

    </div>
  )
}
