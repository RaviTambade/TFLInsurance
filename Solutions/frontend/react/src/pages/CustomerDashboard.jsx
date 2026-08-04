import React from "react";
import { Link, useNavigate } from "react-router-dom";

function CustomerDashboard() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("CustomerId");
        navigate("/");
    };

    return (

        <div className="container mt-5">

            <div className="card shadow-lg border-0">

                <div className="card-header bg-primary text-white text-center">

                    <h2>🏦 Customer Dashboard</h2>

                    <h5 className="mt-2">
                        Welcome Customer
                    </h5>


                </div>

                <div className="card-body">

                    <div className="row g-4">

                        {/* Profile */}

                        <div className="col-md-4">

                            <div className="card shadow text-center h-100">

                                <div className="card-body">

                                    <h1>👤</h1>

                                    <h4>My Profile</h4>

                                    <p>
                                        View & Update your profile
                                    </p>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate("/Profile")}
                                    >
                                        Open
                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* Policies */}

                        <div className="col-md-4">

                            <div className="card shadow text-center h-100">

                                <div className="card-body">

                                    <h1>📄</h1>

                                    <h4>My Policies</h4>

                                    <p>
                                        View purchased policies
                                    </p>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate("/PolicyList")}
                                    >
                                        Open
                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* Premium */}

                        <div className="col-md-4">

                            <div className="card shadow text-center h-100">

                                <div className="card-body">

                                    <h1>💰</h1>

                                    <h4>Premium</h4>

                                    <p>
                                        Pay your premium
                                    </p>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate("/PolicyListInPremium")}
                                    >
                                        Open
                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* Claim */}

                        <div className="col-md-4">

                            <div className="card shadow text-center h-100">

                                <div className="card-body">

                                    <h1>📋</h1>

                                    <h4>Claim</h4>

                                    <p>
                                        Apply insurance claim
                                    </p>

                                    <Link
                                        to="/claims"
                                        className="btn btn-danger"
                                    >
                                        Open
                                    </Link>

                                </div>

                            </div>

                        </div>

                        {/* Renew */}

                        <div className="col-md-4">

                            <div className="card shadow text-center h-100">

                                <div className="card-body">

                                    <h1>🔄</h1>

                                    <h4>Renew Policy</h4>

                                    <p>
                                        Renew your policy
                                    </p>

                                    <Link
                                        to="/renewpolicy"
                                        className="btn btn-info"
                                    >
                                        Open
                                    </Link>

                                </div>

                            </div>

                        </div>

                        {/* Logout */}

                        <div className="col-md-4">

                            <div className="card shadow text-center h-100">

                                <div className="card-body">

                                    <h1>🚪</h1>

                                    <h4>Logout</h4>

                                    <p>
                                        Exit from application
                                    </p>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default CustomerDashboard;