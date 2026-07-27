import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function DealStageChart({ data }) {

    const chartData = {
        labels: [
            "New",
            "Negotiation",
            "Proposal",
            "Won",
            "Lost",
        ],
        datasets: [
            {
                label: "Deals",
                data: [
                    data.New || 0,
                    data.Negotiation || 0,
                    data.Proposal || 0,
                    data.Won || 0,
                    data.Lost || 0,
                ],
                backgroundColor: [
                    "#0d6efd",
                    "#ffc107",
                    "#17a2b8",
                    "#198754",
                    "#dc3545",
                ],
            },
        ],
    };

    return <Bar data={chartData} />;
}

export default DealStageChart;