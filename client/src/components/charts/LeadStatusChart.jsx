import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function LeadStatusChart({ data }) {

    const chartData = {
        labels: [
            "New",
            "Contacted",
            "Qualified",
            "Lost",
        ],
        datasets: [
            {
                label: "Leads",
                data: [
                    data.New || 0,
                    data.Contacted || 0,
                    data.Qualified || 0,
                    data.Lost || 0,
                ],
                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                    "#dc3545",
                ],
            },
        ],
    };

    return <Pie data={chartData} />;
}

export default LeadStatusChart;