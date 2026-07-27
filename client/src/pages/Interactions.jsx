import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import InteractionForm from "../components/InteractionForm";
import { getRole } from "../utils/auth";

import {
    getInteractions,
    createInteraction,
    updateInteraction,
    deleteInteraction,
} from "../services/interactionService";

import { getLeads } from "../services/leadService";

function Interactions() {
    const [interactions, setInteractions] = useState([]);
    const [leads, setLeads] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingInteraction, setEditingInteraction] = useState(null);

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const role = getRole();

    useEffect(() => {
        fetchInteractions();
        fetchLeads();
    }, []);

    const fetchInteractions = async () => {
        try {
            const data = await getInteractions();
            setInteractions(data);
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

    const handleAddInteraction = async (interactionData) => {
        try {
            if (editingInteraction) {
                await updateInteraction(
                    editingInteraction._id,
                    interactionData
                );
                alert("Interaction Updated Successfully");
            } else {
                await createInteraction(interactionData);
                alert("Interaction Added Successfully");
            }

            fetchInteractions();
            setEditingInteraction(null);
            setShowForm(false);

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (interaction) => {
        setEditingInteraction(interaction);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this interaction?")) return;

        try {
            await deleteInteraction(id);
            alert("Interaction Deleted Successfully");
            fetchInteractions();
        } catch (error) {
            console.log(error);
        }
    };

    const filteredInteractions = interactions
        .filter((interaction) =>
            interaction.lead?.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
        )
        .filter((interaction) =>
            typeFilter === "All"
                ? true
                : interaction.type === typeFilter
        );

    return (
        <Layout>

            <div className="container-fluid mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Interaction Management</h2>
                    {(role === "Admin" || role === "Sales Manager") && (
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setEditingInteraction(null);
                                setShowForm(!showForm);
                            }}
                        >
                            {showForm ? "Close Form" : "Add New Interaction"}
                        </button>
                    )}

                                    

                </div>

                {showForm && (

                    <div className="card shadow p-4 mb-4">

                        <InteractionForm
                            onAdd={handleAddInteraction}
                            editingInteraction={editingInteraction}
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
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={typeFilter}
                            onChange={(e) =>
                                setTypeFilter(e.target.value)
                            }
                        >
                            <option value="All">
                                All Types
                            </option>

                            <option value="Call">
                                Call
                            </option>

                            <option value="Email">
                                Email
                            </option>

                            <option value="Meeting">
                                Meeting
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
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Notes</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredInteractions.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center"
                                        >
                                            No Interactions Found
                                        </td>

                                    </tr>

                                ) : (

                                    filteredInteractions.map((interaction) => (

                                        <tr key={interaction._id}>

                                            <td>
                                                {interaction.lead?.name}
                                            </td>

                                            <td>

                                                <span
                                                    className={`badge ${
                                                        interaction.type === "Call"
                                                            ? "bg-primary"
                                                            : interaction.type === "Email"
                                                            ? "bg-success"
                                                            : "bg-warning text-dark"
                                                    }`}
                                                >
                                                    {interaction.type}
                                                </span>

                                            </td>

                                            <td>
                                                {new Date(
                                                    interaction.date
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>
                                                {interaction.notes}
                                            </td>

                                            <td>
                                            <td>

                                                {(role === "Admin" || role === "Sales Manager") && (
                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => handleEdit(interaction)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}

                                                    {role === "Admin" && (
                                                        <button
                                                            className="btn btn-danger btn-sm ms-2"
                                                            onClick={() => handleDelete(interaction._id)}
                                                        >
                                                        Delete
                                                        </button>
                                                    )}

                                                </td>

                                                
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

export default Interactions;