import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function InteractionChart({ data }) {

    const chartData = {
        labels: [
            "Call",
            "Email",
            "Meeting",
        ],

        datasets: [
            {
                label: "Interactions",

                data: [
                    data.Call || 0,
                    data.Email || 0,
                    data.Meeting || 0,
                ],

                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                ],
            },
        ],
    };

    return <Doughnut data={chartData} />;
}

export default InteractionChart;