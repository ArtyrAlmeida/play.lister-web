import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<{ labels: string[], data: number[] }> = ({ labels, data }) => {
    const graphData = {
        labels,
        datasets: [
            {
                label: '# de audições',
                data,
                backgroundColor: [
                    'rgba(74, 255, 123, 0.2)',
                    'rgba(50, 168, 74, 0.2)',
                    'rgba(0, 255, 4, 0.2)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return <Bar data={graphData} />
} 

export default PieChart;