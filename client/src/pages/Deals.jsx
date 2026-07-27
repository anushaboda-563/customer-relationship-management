import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DealForm from "../components/DealForm";
import { getRole } from "../utils/auth";

import {
    getDeals,
    createDeal,
    updateDeal,
    deleteDeal,
} from "../services/dealService";

import { getLeads } from "../services/leadService";

function Deals() {
    const [deals, setDeals] = useState([]);
    const [leads, setLeads] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingDeal, setEditingDeal] = useState(null);

    const [search, setSearch] = useState("");
    const [stageFilter, setStageFilter] = useState("All");
    const role = getRole();

    useEffect(() => {
        fetchDeals();
        fetchLeads();
    }, []);

    const fetchDeals = async () => {
        try {
            const data = await getDeals();
            setDeals(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLeads = async () => {
        try {
            const data = await getLeads();
            setLeads(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddDeal = async (dealData) => {
        try {
            if (editingDeal) {
                await updateDeal(editingDeal._id, dealData);
                alert("Deal Updated Successfully");
            } else {
                await createDeal(dealData);
                alert("Deal Added Successfully");
            }

            fetchDeals();
            setEditingDeal(null);
            setShowForm(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (deal) => {
        setEditingDeal(deal);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this deal?")) return;

        try {
            await deleteDeal(id);
            alert("Deal Deleted Successfully");
            fetchDeals();
        } catch (error) {
            console.log(error);
        }
    };

    const filteredDeals = deals
        .filter((deal) =>
            deal.lead?.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
        )
        .filter((deal) =>
            stageFilter === "All"
                ? true
                : deal.stage === stageFilter
        );

    return (
        <Layout>

            <div className="container-fluid mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Deals Management</h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setEditingDeal(null);
                            setShowForm(!showForm);
                        }}
                    >
                        {showForm ? "Close Form" : "Add New Deal"}
                    </button>

                </div>

                {showForm && (
                    <div className="card shadow p-4 mb-4">

                        <DealForm
                            onAdd={handleAddDeal}
                            editingDeal={editingDeal}
                            leads={leads}
                        />

                    </div>
                )}

                <div className="row mb-4">

                    <div className="col-md-6">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Lead Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={stageFilter}
                            onChange={(e) =>
                                setStageFilter(e.target.value)
                            }
                        >
                            <option value="All">All Stages</option>
                            <option value="Negotiation">
                                Negotiation
                            </option>
                            <option value="Proposal">
                                Proposal
                            </option>
                            <option value="Won">
                                Won
                            </option>
                            <option value="Lost">
                                Lost
                            </option>
                        </select>

                    </div>

                </div>

                <div className="card shadow">

                    <div className="card-body">

                        <table className="table table-hover table-bordered align-middle">

                            <thead className="table-dark">

                                <tr>
                                    <th>Lead</th>
                                    <th>Value</th>
                                    <th>Stage</th>
                                    <th>Close Date</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredDeals.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center"
                                        >
                                            No Deals Found
                                        </td>

                                    </tr>

                                ) : (

                                    filteredDeals.map((deal) => (

                                        <tr key={deal._id}>

                                            <td>{deal.lead?.name}</td>

                                            <td>
                                                ₹{deal.value.toLocaleString()}
                                            </td>

                                            <td>

                                                <span
                                                    className={`badge ${
                                                        deal.stage === "Negotiation"
                                                            ? "bg-warning text-dark"
                                                            : deal.stage === "Proposal"
                                                            ? "bg-info"
                                                            : deal.stage === "Won"
                                                            ? "bg-success"
                                                            : deal.stage === "Lost"
                                                            ? "bg-danger"
                                                            : "bg-secondary"
                                                    }`}
                                                >
                                                    {deal.stage}
                                                </span>

                                            </td>

                                            <td>

                                                {deal.expectedCloseDate
                                                    ? new Date(
                                                          deal.expectedCloseDate
                                                      ).toLocaleDateString()
                                                    : "No Date"}

                                            </td>

                                            <td>

                                                {(role === "Admin" || role==="Sales Manager") &&(
                                                    <>
                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            onClick={() => handleEdit(deal)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </>
                                                )}



                                                 {role === "Admin" && (
                                                    <button
                                                        className="btn btn-danger btn-sm ms-2"
                                                        onClick={() => handleDelete(deal._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </Layout>
    );
}

export default Deals;