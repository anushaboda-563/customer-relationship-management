import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/registerService";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await register(formData);

            alert(data.message);

            navigate("/");
        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Cannot connect to backend");
            }
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Register</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        className="form-control mb-3"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        className="btn btn-success w-100"
                        type="submit"
                    >
                        Register
                    </button>

                </form>

                <div className="text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/">Login</Link>
                </div>

            </div>
        </div>
    );
}

export default Register;