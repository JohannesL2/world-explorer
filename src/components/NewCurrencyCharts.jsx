import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useMemo } from 'react';

export default function NewCurrencyCharts({chartsData}) {
  return (
    <div>

        <div className="dataCard revenueCard">
            <Bar
                data={{
                    labels: ["A", "B", "C"],
                    datasets: [
                        {
                            label: "Revenue",
                            data: [chartsData],
                        },
                    ]
                }}
            />
            </div>

    </div>
  )
}
