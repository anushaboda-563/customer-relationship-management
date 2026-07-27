import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import UserForm from "../components/UserForm";

import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../services/userService";

function Users() {

    const [users, setUsers] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingUser, setEditingUser] = useState(null);

    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddUser = async (userData) => {
        try {

            if (editingUser) {
                await updateUser(editingUser._id, userData);
                alert("User Updated Successfully");
            } else {
                await createUser(userData);
                alert("User Added Successfully");
            }

            fetchUsers();

            setEditingUser(null);

            setShowForm(false);

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            }

        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this user?")) return;

        try {

            await deleteUser(id);

            alert("User Deleted Successfully");

            fetchUsers();

        } catch (error) {

            console.log(error);

        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>

            <div className="container-fluid mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>User Management</h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setEditingUser(null);
                            setShowForm(!showForm);
                        }}
                    >
                        {showForm ? "Close Form" : "Add User"}
                    </button>

                </div>

                {showForm && (

                    <div className="card shadow p-4 mb-4">

                        <UserForm
                            onAdd={handleAddUser}
                            editingUser={editingUser}
                        />

                    </div>

                )}

                <div className="row mb-4">

                    <div className="col-md-6">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search User..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                </div>

                <div className="card shadow">

                    <div className="card-body">

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">

                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredUsers.length === 0 ? (

                                    <tr>

                                        <td colSpan="4" className="text-center">
                                            No Users Found
                                        </td>

                                    </tr>

                                ) : (

                                    filteredUsers.map((user) => (

                                        <tr key={user._id}>

                                            <td>{user.name}</td>

                                            <td>{user.email}</td>

                                            <td>{user.role}</td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm ms-2"
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    Delete
                                                </button>

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

export default Users;