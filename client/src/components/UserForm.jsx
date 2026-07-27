import { useEffect, useState } from "react";

function UserForm({ onAdd, editingUser }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "Sales Representative",
    });

    useEffect(() => {
        if (editingUser) {
            setFormData({
                name: editingUser.name,
                email: editingUser.email,
                password: "",
                role: editingUser.role,
            });
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);

        if (!editingUser) {
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "Sales Representative",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {!editingUser && (
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}

            <div className="mb-3">
                <label>Role</label>

                <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option>Admin</option>
                    <option>Sales Manager</option>
                    <option>Sales Representative</option>
                </select>
            </div>

            <button className="btn btn-primary">
                {editingUser ? "Update User" : "Add User"}
            </button>

        </form>
    );
}

export default UserForm;