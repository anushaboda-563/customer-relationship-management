import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LeadForm from "../components/LeadForm";
import { getRole } from "../utils/auth";

import {
    getLeads,
    createLead,
    updateLead,
    deleteLead,
} from "../services/leadService";

function Leads() {
    const role = getRole();
    const [leads, setLeads] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingLead, setEditingLead] = useState(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const leadsPerPage = 5;

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const data = await getLeads();
            setLeads(data);
        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            }
        }
    };

    const handleAddLead = async (leadData) => {
        try {
            if (editingLead) {
                await updateLead(editingLead._id, leadData);
                alert("Lead Updated Successfully");
            } else {
                await createLead(leadData);
                alert("Lead Added Successfully");
            }

            setShowForm(false);
            setEditingLead(null);

            fetchLeads();
        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            }
        }
    };

    const handleEditLead = (lead) => {
        setEditingLead(lead);
        setShowForm(true);
    };

    const handleDeleteLead = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this lead?"
        );

        if (!confirmDelete) return;

        try {
            await deleteLead(id);

            alert("Lead Deleted Successfully");

            fetchLeads();
        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            }
        }
    };

    // Filter Leads
    const filteredLeads = leads
        .filter((lead) =>
            lead.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((lead) =>
            statusFilter === "All"
                ? true
                : lead.status === statusFilter
        );

    // Pagination Logic
    const indexOfLastLead = currentPage * leadsPerPage;
    const indexOfFirstLead = indexOfLastLead - leadsPerPage;
    const currentLeads = filteredLeads.slice(
        indexOfFirstLead,
        indexOfLastLead
    );

    const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

    return (
        <Layout>

            <div className="container-fluid mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Lead Management</h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setEditingLead(null);
                            setShowForm(!showForm);
                        }}
                    >
                        {showForm ? "Close Form" : "Add New Lead"}
                    </button>

                </div>

                {showForm && (
                    <div className="card shadow p-4 mb-4">
                        <LeadForm
                            onAdd={handleAddLead}
                            editingLead={editingLead}
                        />
                    </div>
                )}

                <div className="row mb-4">

                    <div className="col-md-6">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="All">All Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Lost">Lost</option>
                        </select>

                    </div>

                </div>

                <div className="card shadow">

                    <div className="card-body">

                        <table className="table table-hover table-bordered align-middle">

                            <thead className="table-dark">

                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th width="180">Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {currentLeads.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >
                                            No Leads Found
                                        </td>

                                    </tr>

                                ) : (

                                    currentLeads.map((lead) => (

                                        <tr key={lead._id}>

                                            <td>{lead.name}</td>

                                            <td>{lead.email}</td>

                                            <td>{lead.phone}</td>

                                            <td>{lead.company}</td>

                                            <td>

                                                <span
                                                    className={`badge ${
                                                        lead.status === "New"
                                                            ? "bg-primary"
                                                            : lead.status === "Contacted"
                                                            ? "bg-warning text-dark"
                                                            : lead.status === "Qualified"
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                    }`}
                                                >
                                                    {lead.status}
                                                </span>

                                            </td>

                                            <td>

                                                {role === "Admin" && (
                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => handleEditLead(lead)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}

                                               
                                                {role === "Admin" && (

                                                    <button
                                                        className="btn btn-danger btn-sm ms-2"
                                                        onClick={() => handleDeleteLead(lead._id)}
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

                        {/* Pagination */}

                        <div className="d-flex justify-content-between align-items-center mt-3">

                            <button
                                className="btn btn-secondary"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage(currentPage - 1)
                                }
                            >
                                Previous
                            </button>

                            <h6 className="mb-0">
                                Page {currentPage} of {totalPages || 1}
                            </h6>

                            <button
                                className="btn btn-secondary"
                                disabled={
                                    currentPage === totalPages ||
                                    totalPages === 0
                                }
                                onClick={() =>
                                    setCurrentPage(currentPage + 1)
                                }
                            >
                                Next
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    );
}

export default Leads;