import { useState, useEffect } from "react";

function InteractionForm({ onAdd, editingInteraction, leads }) {

    const [formData, setFormData] = useState({
        lead: "",
        type: "Call",
        date: "",
        notes: "",
    });

    useEffect(() => {

        if (editingInteraction) {

            setFormData({
                lead: editingInteraction.lead?._id || editingInteraction.lead,
                type: editingInteraction.type,
                date: editingInteraction.date
                    ? editingInteraction.date.substring(0, 10)
                    : "",
                notes: editingInteraction.notes,
            });

        }

    }, [editingInteraction]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onAdd(formData);

        if (!editingInteraction) {

            setFormData({
                lead: "",
                type: "Call",
                date: "",
                notes: "",
            });

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <select
                name="lead"
                value={formData.lead}
                onChange={handleChange}
                required
            >
                <option value="">Select Lead</option>

                {leads.map((lead) => (

                    <option key={lead._id} value={lead._id}>
                        {lead.name}
                    </option>

                ))}

            </select>

            <br /><br />

            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
            >
                <option>Call</option>
                <option>Email</option>
                <option>Meeting</option>
            </select>

            <br /><br />

            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
            />

            <br /><br />

            <textarea
                name="notes"
                placeholder="Notes"
                rows="4"
                cols="40"
                value={formData.notes}
                onChange={handleChange}
                required
            />

            <br /><br />

            <button type="submit">

                {editingInteraction
                    ? "Update Interaction"
                    : "Save Interaction"}

            </button>

        </form>

    );
}

export default InteractionForm;