import { useState, useEffect } from "react";

function LeadForm({ onAdd, editingLead }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "New",
    });

    useEffect(() => {
        if (editingLead) {
            setFormData({
                name: editingLead.name,
                email: editingLead.email,
                phone: editingLead.phone,
                company: editingLead.company,
                status: editingLead.status,
            });
        }
    }, [editingLead]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);

        if (!editingLead) {
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                status: "New",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <br /><br />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <br /><br />

            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />

            <br /><br />

            <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                required
            />

            <br /><br />

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Lost</option>
            </select>

            <br /><br />

            <button type="submit">
                {editingLead ? "Update Lead" : "Save Lead"}
            </button>

        </form>
    );
}

export default LeadForm;