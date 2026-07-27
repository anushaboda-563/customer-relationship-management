import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import Layout from "../components/Layout";
import LeadStatusChart from "../components/charts/LeadStatusChart";
import DealStageChart from "../components/charts/DealStageChart";
import InteractionChart from "../components/charts/InteractionChart";
import MonthlyChart from "../components/charts/MonthlyChart";
import { getUser, getRole } from "../utils/auth";


function Dashboard() {

    const [stats, setStats] = useState({
        users: 0,
        leads: 0,
        deals: 0,
        interactions: 0,
        documents: 0,

        leadStatus: {},
        dealStage: {},
        interactionType: {},

        recentLeads: [],
        recentDeals: [],
        recentInteractions: [],
        recentDocuments: [],

        monthlyLeads: [],
        monthlyDeals: [],

        upcomingMeetings: [],

    });

    const user = getUser();
    const role = getRole();

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const data = await getDashboard();

            console.log("Dashboard Data:", data);

            setStats(data);

        } catch (error) {

            console.log(error);

            if (error.response) {
                console.log(error.response.data);
                alert(error.response.data.message);
            } else {
                alert("Cannot connect to backend");
            }

        }
    };
    return (
    <Layout>

        <div className="container-fluid mt-4">
            <h2 className="mb-4">
                CRM Dashboard
            </h2>

            <div className="alert alert-primary mb-4">
                <h5>Welcome, {user?.name}</h5>

                <p className="mb-0">
                    Role: <strong>{role}</strong>
                </p>
            </div>


            {/* Statistics Cards */}

            <div className="row g-4">

                <div className="col-md-6 col-lg">
                    <div className="card text-center shadow border-primary">
                        <div className="card-body">
                            <h5>Users</h5>
                            <h2>{stats.users}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg">
                    <div className="card text-center shadow border-success">
                        <div className="card-body">
                            <h5>Leads</h5>
                            <h2>{stats.leads}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg">
                    <div className="card text-center shadow border-warning">
                        <div className="card-body">
                            <h5>Deals</h5>
                            <h2>{stats.deals}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg">
                    <div className="card text-center shadow border-info">
                        <div className="card-body">
                            <h5>Interactions</h5>
                            <h2>{stats.interactions}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg">
                    <div className="card text-center shadow border-danger">
                        <div className="card-body">
                            <h5>Documents</h5>
                            <h2>{stats.documents}</h2>
                        </div>
                    </div>
                </div>

            </div>

            {/* Charts */}

            <div className="row mt-5">

                <div className="col-lg-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body">

                            <h5 className="text-center mb-3">
                                Lead Status
                            </h5>

                            <LeadStatusChart
                                data={stats.leadStatus}
                            />

                        </div>

                    </div>

                </div>

                <div className="col-lg-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body">

                            <h5 className="text-center mb-3">
                                Deal Stage
                            </h5>

                            <DealStageChart
                                data={stats.dealStage}
                            />

                        </div>

                    </div>

                </div>

                <div className="col-lg-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body">

                            <h5 className="text-center mb-3">
                                Interaction Types
                            </h5>

                            <InteractionChart
                                data={stats.interactionType}
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* Monthly Chart */}

            <div className="card shadow mt-4">

                <div className="card-body">

                    <h4 className="text-center mb-4">
                        Monthly Leads vs Deals
                    </h4>

                    <MonthlyChart
                        leads={stats.monthlyLeads}
                        deals={stats.monthlyDeals}
                    />

                </div>

            </div>
            <div className="card shadow mt-4">

                <div className="card-body">

                    <h4 className="mb-3">
                        Upcoming Meetings
                    </h4>

                    {(stats.upcomingMeetings|| []).length === 0 ? (

                        <p className="text-muted">
                            No upcoming meetings.
                        </p>

                    ) : (

                        <table className="table table-hover">

                            <thead className="table-light">

                                <tr>
                                    <th>Lead</th>
                                    <th>Date & Time</th>
                                    <th>Notes</th>
                                </tr>

                            </thead>

                            <tbody>

                                {(stats.upcomingMeetings || []).map((meeting) => (

                                    <tr key={meeting._id}>

                                        <td>{meeting.lead?.name}</td>

                                        <td>
                                            {new Date(meeting.date).toLocaleString()}
                                        </td>

                                        <td>{meeting.notes}</td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>

            {/* Recent Activities */}

            <div className="card shadow mt-5">

                <div className="card-body">

                    <h3 className="mb-4">
                        Recent Activities
                    </h3>

                    <div className="table-responsive">

                        <table className="table table-striped table-hover">

                            <thead className="table-dark">

                                <tr>
                                    <th>Type</th>
                                    <th>Name / Title</th>
                                    <th>Details</th>
                                    <th>Date</th>
                                </tr>

                            </thead>

                            <tbody>

                                {stats.recentLeads.map((lead) => (

                                    <tr key={lead._id}>
                                        <td>Lead</td>
                                        <td>{lead.name}</td>
                                        <td>{lead.company}</td>
                                        <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                                    </tr>

                                ))}

                                {stats.recentDeals.map((deal) => (

                                    <tr key={deal._id}>
                                        <td>Deal</td>
                                        <td>{deal.title}</td>
                                        <td>
                                            ₹{deal.value} ({deal.stage})
                                        </td>
                                        <td>{new Date(deal.createdAt).toLocaleDateString()}</td>
                                    </tr>

                                ))}

                                {stats.recentInteractions.map((interaction) => (

                                    <tr key={interaction._id}>
                                        <td>Interaction</td>
                                        <td>{interaction.type}</td>
                                        <td>{interaction.notes}</td>
                                        <td>{new Date(interaction.createdAt).toLocaleDateString()}</td>
                                    </tr>

                                ))}

                                {stats.recentDocuments.map((doc) => (

                                    <tr key={doc._id}>
                                        <td>Document</td>
                                        <td>{doc.fileName}</td>
                                        <td>{doc.lead?.name}</td>
                                        <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    </Layout>
);
}

 export default Dashboard;   