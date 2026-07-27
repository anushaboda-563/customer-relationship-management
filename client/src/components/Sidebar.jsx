import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { getRole } from "../utils/auth";

import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaHandshake,
  FaColumns,
  FaComments,
  FaFileAlt,
  FaUserCircle,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
    const navigate = useNavigate();
    const role = getRole();

    const handleLogout = () => {
        logout();

        alert("Logged out successfully");

        navigate("/", { replace: true });
    };

    return (
        <div
            className="bg-dark text-white p-3 shadow"
            style={{
                width: "250px",
                minHeight: "100vh",
            }}
        >
            <h2 className="text-center mb-4 fw-bold">
                CRM
            </h2>

            <ul className="nav flex-column">

                <li className="nav-item mb-2">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "bg-primary text-white rounded"
                                    : "text-white"
                            }`
                        }
                    >
                        <FaTachometerAlt className="sidebar-icon" />
                        Dashboard
                    </NavLink>
                </li>
                
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                `nav-link ${
                                    isActive
                                        ? "bg-primary text-white rounded"
                                        : "text-white"
                                }`
                            }
                        >
                        <FaUsers className="menu-icon" />

                            Users
                        </NavLink>
                    </li>
                


                <li className="nav-item mb-2">
                    <NavLink
                        to="/leads"
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "bg-primary text-white rounded"
                                    : "text-white"
                            }`
                        }
                    >
                        <FaUserTie className="sidebar-icon" />
                        Leads
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink
                        to="/deals"
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "bg-primary text-white rounded"
                                    : "text-white"
                            }`
                        }
                    >
                        <FaHandshake className="sidebar-icon" />
                        Deals
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/pipeline"
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "bg-primary text-white rounded"
                                    : "text-white"
                            }`
                        }
                    >
                        <FaColumns className="sidebar-icon" />
                        Deal Pipeline
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink
                        to="/interactions"
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "bg-primary text-white rounded"
                                    : "text-white"
                            }`
                        }
                    >
                        <FaComments className="sidebar-icon" />
                        Interactions
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink
                        to="/documents"
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "bg-primary text-white rounded"
                                    : "text-white"
                            }`
                        }
                    >
                        <FaFileAlt className="sidebar-icon" />
                        Documents
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "bg-primary text-white rounded"
                                    : "text-white"
                            }`
                        }
                    >
                            <FaUserCircle className="sidebar-icon" />
                        Profile
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/change-password"
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "bg-primary text-white rounded"
                                    : "text-white"
                            }`
                        }
                    >
                        <FaKey className="sidebar-icon" />
                        Change Password
                    </NavLink>
                </li>
                



                <li className="nav-item mt-5">
                    <button
                        className="btn btn-danger w-100"
                        onClick={handleLogout}
                    >
                            <FaSignOutAlt className="sidebar-icon" />
                        Logout
                    </button>
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;