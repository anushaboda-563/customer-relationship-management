import { useState, useEffect } from "react";

function DealForm({ onAdd, editingDeal, leads }) {

    const [formData, setFormData] = useState({
        title: "",
        lead: "",
        value: "",
        stage: "Negotiation",
        expectedCloseDate: "",
    });


    useEffect(() => {

        if (editingDeal) {

            setFormData({
                title: editingDeal.title,
                lead: editingDeal.lead?._id || editingDeal.lead,
                value: editingDeal.value,
                stage: editingDeal.stage,
                expectedCloseDate:
                    editingDeal.expectedCloseDate?.substring(0,10)
            });

        }

    }, [editingDeal]);


    const handleChange = (e)=>{

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit=(e)=>{

        e.preventDefault();

        console.log("Sending Deal:",formData);

        onAdd(formData);

    };


    return (

        <form onSubmit={handleSubmit}>


            <input
                type="text"
                name="title"
                placeholder="Deal Title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <br/><br/>


            <select
                name="lead"
                value={formData.lead}
                onChange={handleChange}
                required
            >

                <option value="">
                    Select Lead
                </option>


                {
                    leads.map((lead)=>(

                        <option
                            key={lead._id}
                            value={lead._id}
                        >
                            {lead.name}
                        </option>

                    ))
                }


            </select>


            <br/><br/>


            <input
                type="number"
                name="value"
                placeholder="Deal Value"
                value={formData.value}
                onChange={handleChange}
                required
            />


            <br/><br/>


            <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
            >

                <option>
                    Negotiation
                </option>

                <option>
                    Proposal
                </option>

                <option>
                    Won
                </option>

                <option>
                    Lost
                </option>

            </select>


            <br/><br/>


            <input
                type="date"
                name="expectedCloseDate"
                value={formData.expectedCloseDate}
                onChange={handleChange}
                required
            />


            <br/><br/>


            <button type="submit">

                {
                    editingDeal
                    ? "Update Deal"
                    : "Save Deal"
                }

            </button>


        </form>

    );

}

export default DealForm;