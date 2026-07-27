import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <a className="navbar-brand fw-bold" href="#">
          CRM Management
        </a>

        <div className="ms-auto">
          <Link to="/login" className="btn btn-light me-2">
            Login
          </Link>

          <Link to="/register" className="btn btn-warning">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">

        <div className="container">

          <h1>Customer Relationship Management System</h1>

          <p>
            Manage Leads, Deals, Meetings, Documents and
            Sales Analytics in one powerful CRM.
          </p>

          <div className="mt-4">

            <Link to="/register" className="btn btn-primary btn-lg me-3">
              Get Started
            </Link>

            <Link to="/login" className="btn btn-outline-primary btn-lg">
              Login
            </Link>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="container py-5">

        <h2 className="text-center mb-5">
          CRM Features
        </h2>

        <div className="row g-4">

          <div className="col-md-4">

            <div className="feature-card">

              <h4>Lead Management</h4>

              <p>
                Track and organize customer leads easily.
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="feature-card">

              <h4>Deal Pipeline</h4>

              <p>
                Visual Kanban board for sales tracking.
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="feature-card">

              <h4>Analytics</h4>

              <p>
                Monitor sales using charts and reports.
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="feature-card">

              <h4>Interactions</h4>

              <p>
                Store meetings, calls and emails.
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="feature-card">

              <h4>Documents</h4>

              <p>
                Upload contracts and important files.
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="feature-card">

              <h4>User Management</h4>

              <p>
                Admin can manage users and permissions.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="footer">

        <p>
          © 2026 CRM Management System | Built with React & Node.js
        </p>

      </footer>

    </div>
  );
}

export default Home;