import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function MonthlyChart({ leads, deals }) {

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const leadData = new Array(12).fill(0);
    const dealData = new Array(12).fill(0);

    leads.forEach((item) => {
        leadData[item._id - 1] = item.total;
    });

    deals.forEach((item) => {
        dealData[item._id - 1] = item.total;
    });

    const data = {
        labels: months,
        datasets: [
            {
                label: "Leads",
                data: leadData,
                borderColor: "blue",
                backgroundColor: "blue",
                tension: 0.4,
            },
            {
                label: "Deals",
                data: dealData,
                borderColor: "green",
                backgroundColor: "green",
                tension: 0.4,
            },
        ],
    };

    return <Line data={data} />;
}

export default MonthlyChart;