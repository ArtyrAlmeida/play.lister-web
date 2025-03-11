import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2"

import styles from "./PieChart.module.scss"

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<{ data: { labels: string[], values: number[] }, label: string }> = ({ data, label }) => {
    const graphData = {
        labels: data.labels,
        datasets: [
            {
                label,
                data: data.values,
                backgroundColor: [
                    'rgba(74, 255, 123, 0.2)',
                    'rgba(50, 168, 74, 0.2)',
                    'rgba(0, 255, 4, 0.2)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return <div className={styles.pie}><Pie data={graphData} /></div>
} 

export default PieChart;