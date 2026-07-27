import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getProfile, updateProfile } from "../services/profileService";

function Profile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateProfile({
                name: user.name,
                email: user.email,
            });

            alert("Profile Updated Successfully");

            localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">
                        <h3>My Profile</h3>
                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Role
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={user.role}
                                    disabled
                                />
                            </div>

                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Update Profile
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </Layout>
    );
}

export default Profile;