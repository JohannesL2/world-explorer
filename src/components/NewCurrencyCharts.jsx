import "chart.js/auto";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { useMemo } from 'react';

export default function NewCurrencyCharts({chartsData}) {
      const safeData = Array.isArray(chartsData) ? chartsData : [];

      const data = useMemo(() => ({
        datasets: [
     {
       label: "Exchange Rate",
       data: safeData.map(item => ({
         x: item.date,
         y: parseFloat(item.value),
       })),
       borderColor: "#ec4899",
       backgroundColor: "rgba(236, 72, 153, 0.3)",
       borderWidth: 3,
       tension: 0.3,
       pointRadius: 3,
       pointHoverRadius: 6,
     },
   ],
    }), [safeData]);

    if (safeData.length === 0) {
    return <p className="text-gray-400 text-sm">Laddar valutadata...</p>;
  }

    const options = {
        responsive: true,
        plugins: {
            legend: {position: 'top', labels: {color: 'white'}},
            title: {display: true, text: 'Currency Exchange Rate (Chart.js)'},
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: { day: 'MMM d' },
                },
                ticks: { color: 'white', font: { size: 12 } },
                grid: { color: 'rgba(255,255,255,0.1)' },
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

  return (
    <div>
            <div className="w-full mt-8 p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
      <Line data={data} options={options} />
    </div>

    </div>
  )
}
