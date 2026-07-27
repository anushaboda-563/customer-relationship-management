import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DocumentForm from "../components/DocumentForm";
import { getRole } from "../utils/auth";

import {
    getDocuments,
    uploadDocument,
    deleteDocument,
} from "../services/documentService";

import { getLeads } from "../services/leadService";

function Documents() {

    const [documents, setDocuments] = useState([]);
    const [leads, setLeads] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [search, setSearch] = useState("");
    const role = getRole();

    useEffect(() => {
        fetchDocuments();
        fetchLeads();
    }, []);

    const fetchDocuments = async () => {
        try {
            const data = await getDocuments();
            setDocuments(data);
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

    const handleUpload = async (formData) => {
        try {

            await uploadDocument(formData);

            alert("Document Uploaded Successfully");

            fetchDocuments();

            setShowForm(false);

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            }
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmDelete) return;

        try {

            await deleteDocument(id);

            alert("Document Deleted Successfully");

            fetchDocuments();

        } catch (error) {

            console.log(error);

        }
    };

    const filteredDocuments = documents.filter((document) =>
        document.lead?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <Layout>

            <div className="container-fluid mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Documents Management</h2>
                    {(role === "Admin" || role === "Sales Manager") && (
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? "Close Form" : "Upload Document"}
                        </button>
                    )}

                   

                </div>
                {showForm && (role === "Admin" || role === "Sales Manager") && (

                    <div className="card shadow p-4 mb-4">

                        <DocumentForm
                            onUpload={handleUpload}
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

                </div>

                <div className="card shadow">

                    <div className="card-body">

                        <table className="table table-hover table-bordered align-middle">

                            <thead className="table-dark">

                                <tr>

                                    <th>Lead</th>
                                    <th>File Name</th>
                                    <th>View</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredDocuments.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center"
                                        >
                                            No Documents Found
                                        </td>

                                    </tr>

                                ) : (

                                    filteredDocuments.map((document) => (

                                        <tr key={document._id}>

                                            <td>
                                                {document.lead?.name}
                                            </td>

                                            <td>
                                                {document.fileName}
                                            </td>

                                            <td>

                                                <a
                                                    href={`http://localhost:5000/${document.filePath}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-success btn-sm"
                                                >
                                                    View File
                                                </a>

                                            </td>

                                            
                                                <td>

                                                    {role === "Admin" && (
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDelete(document._id)}
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

export default Documents;