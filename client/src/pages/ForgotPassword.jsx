import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Password reset link sent to " + email);

        setEmail("");
    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(to right,#4facfe,#00f2fe)"
            }}
        >
            <div
                className="card shadow-lg p-4"
                style={{ width: "420px", borderRadius: "15px" }}
            >
                <div className="text-center mb-4">
                    <h2 className="text-primary">
                        Forgot Password
                    </h2>

                    <p className="text-muted">
                        Enter your email to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="btn btn-primary w-100"
                        type="submit"
                    >
                        Send Reset Link
                    </button>

                </form>

                <div className="text-center mt-3">
                    <Link to="/">
                        Back to Login
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;