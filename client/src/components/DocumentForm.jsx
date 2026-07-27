import { useState } from "react";

function DocumentForm({ onUpload, leads }) {
    const [lead, setLead] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("lead", lead);
        formData.append("document", file);

        onUpload(formData);

        setLead("");
        setFile(null);

        e.target.reset();
    };

    return (
        <form onSubmit={handleSubmit}>

            <select
                value={lead}
                onChange={(e) => setLead(e.target.value)}
                required
            >
                <option value="">Select Lead</option>

                {leads.map((lead) => (
                    <option key={lead._id} value={lead._id}>
                        {lead.name}
                    </option>
                ))}
            </select>

            <br />
            <br />

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
            />

            <br />
            <br />

            <button type="submit">
                Upload Document
            </button>

        </form>
    );
}

export default DocumentForm;