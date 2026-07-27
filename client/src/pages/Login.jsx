import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log("Backend Response:", error.response.data);

        alert(
          error.response.data.message ||
            error.response.data.error ||
            "Login failed"
        );
      } else if (error.request) {
        alert("Cannot connect to backend");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "420px",
          borderRadius: "15px",
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">
            <i className="bi bi-bar-chart-fill"></i> CRM System
          </h2>
          <p className="text-muted">Welcome Back!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div>
              <input type="checkbox" className="form-check-input me-2" />
              <label className="form-check-label">
                Remember Me
              </label>
            </div>

            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
          >
            Login
          </button>
        </form>

        <hr />

        <div className="text-center">
          <p className="mb-2">New User?</p>

          <Link
            to="/register"
            className="btn btn-success w-100"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;