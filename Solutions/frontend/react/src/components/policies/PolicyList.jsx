import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PolicyList() {

    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // ==========================================
    // LOAD CUSTOMER POLICIES
    // ==========================================

    const loadPolicies = async () => {

        setLoading(true);
        setError("");

        // Get CustomerId from localStorage
        const customerId =
            localStorage.getItem("customerId");

        console.log(
            "PolicyList CustomerId:",
            customerId
        );

        // ==========================================
        // CUSTOMER ID CHECK
        // ==========================================

        if (!customerId) {

            setError(
                "Customer ID not found. Please login again."
            );

            setLoading(false);

            return;
        }

        try {

            // ==========================================
            // GET POLICIES
            // ==========================================

            const url =
                `http://localhost:5000/api/policies/getPolicyByCustomerId/${customerId}`;

            console.log(
                "Policy API URL:",
                url
            );

            const response =
                await fetch(url);

            console.log(
                "Policy API Status:",
                response.status
            );

            // ==========================================
            // RESPONSE CHECK
            // ==========================================

            if (!response.ok) {

                const errorText =
                    await response.text();

                console.error(
                    "Policy API Error:",
                    errorText
                );

                throw new Error(
                    `Unable to fetch policies (${response.status})`
                );
            }

            // ==========================================
            // RESPONSE DATA
            // ==========================================

            const data =
                await response.json();

            console.log(
                "Policy API Response:",
                data
            );

            // ==========================================
            // SET POLICIES
            // ==========================================

            if (Array.isArray(data)) {

                setPolicies(data);

            } else {

                setPolicies([]);

            }

        } catch (err) {

            console.error(
                "Policy load failed:",
                err
            );

            setError(
                "Unable to load policies. Please try again later."
            );

        } finally {

            setLoading(false);

        }
    };

    // ==========================================
    // COMPONENT LOAD
    // ==========================================

    useEffect(() => {

        loadPolicies();

    }, []);

    // ==========================================
    // CANCEL POLICY
    // ==========================================

    const goToCancelPolicy = () => {

        navigate("/CancelPolicy");

    };

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="container mt-5">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="mb-1">
                        My Policies
                    </h2>

                    <p className="text-muted mb-0">
                        Track your active insurance coverage
                        and manage renewals.
                    </p>

                </div>

                <span className="badge bg-primary fs-6">

                    {policies.length} Policies

                </span>

            </div>

            {/* LOADING */}

            {loading && (

                <div className="alert alert-secondary text-center">

                    Loading policies...

                </div>

            )}

            {/* ERROR */}

            {!loading && error && (

                <div className="alert alert-danger text-center">

                    {error}

                </div>

            )}

            {/* NO POLICIES */}

            {!loading &&
                !error &&
                policies.length === 0 && (

                    <div className="alert alert-info text-center">

                        No policies available.

                    </div>

                )}

            {/* POLICIES */}

            {!loading &&
                !error &&
                policies.length > 0 && (

                    <div className="row g-4">

                        {policies.map((policy) => (

                            <div
                                className="col-md-6 col-lg-4"
                                key={
                                    policy.PolicyId ||
                                    policy.PolicyNumber
                                }
                            >

                                <div className="card shadow-sm h-100 border-0">

                                    <div className="card-body">

                                        {/* POLICY HEADER */}

                                        <div className="d-flex justify-content-between align-items-start mb-3">

                                            <h5 className="card-title mb-0">

                                                {policy.PolicyNumber ||
                                                    `Policy ${policy.PolicyId || "#"}`}

                                            </h5>

                                            <span
                                                className={
                                                    `badge ${
                                                        policy.IsRenewed
                                                            ? "bg-success"
                                                            : "bg-warning text-dark"
                                                    }`
                                                }
                                            >

                                                {policy.IsRenewed
                                                    ? "Renewed"
                                                    : "Pending"}

                                            </span>

                                        </div>

                                        {/* POLICY TYPE */}

                                        <p className="card-text mb-2">

                                            <strong>Policy Type:</strong>{" "}

                                            {policy.PolicyType ||
                                                "N/A"}

                                        </p>

                                        {/* POLICY AMOUNT */}

                                        <p className="card-text mb-2">

                                            <strong>Amount:</strong>{" "}

                                            {policy.PolicyAmount
                                                ? `Rs.${policy.PolicyAmount}`
                                                : "N/A"}

                                        </p>

                                        {/* STATUS */}

                                        <p className="card-text mb-3">

                                            <strong>Status:</strong>{" "}

                                            {policy.IsRenewed
                                                ? "Active Renewal"
                                                : "Awaiting Renewal"}

                                        </p>

                                        {/* CANCEL */}

                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={
                                                goToCancelPolicy
                                            }
                                        >
                                            Cancel Policy
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

        </div>
    );
}

export default PolicyList;
