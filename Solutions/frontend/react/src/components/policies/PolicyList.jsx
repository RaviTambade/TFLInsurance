
import React, { useEffect, useState } from "react";

function PolicyList() {

    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadPolicies = async () => {

        setLoading(true);
        setError("");

        const customerId = localStorage.getItem("customerId");

        console.log("PolicyList CustomerId:", customerId);

        if (!customerId) {

            setError(
                "Customer ID not found. Please login again."
            );

            setLoading(false);
            return;
        }

        try {

            const url =
                `http://localhost:5000/api/policies/getPolicyByCustomerId/${customerId}`;

            console.log("Policy API URL:", url);

            const response = await fetch(url);

            console.log(
                "Policy API Status:",
                response.status
            );

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

            const data = await response.json();

            console.log(
                "Policy API Response:",
                data
            );

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

    const deletePolicy = async (policyId) => {

        if (!policyId) {

            alert("Policy ID not found.");

            return;
        }

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this policy?"
        );

        if (!confirmCancel) {
            return;
        }

        try {

            console.log(
                "Cancelling PolicyId:",
                policyId
            );

            const response = await fetch(
                `http://localhost:5000/api/policies/${policyId}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            console.log(
                "Cancel Policy Response:",
                result
            );

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Failed to cancel policy."
                );
            }

            alert(
                result.message ||
                "Policy cancelled successfully."
            );

            // Reload policies after cancellation
            loadPolicies();

        } catch (err) {

            console.error(
                "Policy cancel error:",
                err
            );

            alert(
                err.message ||
                "Unable to cancel policy."
            );
        }
    };


    useEffect(() => {

        loadPolicies();

    }, []);

    return (

        <div className="container mt-5">

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


            {loading && (

                <div className="alert alert-secondary text-center">

                    Loading policies...

                </div>

            )}

            {!loading && error && (

                <div className="alert alert-danger text-center">

                    {error}

                </div>

            )}
            {!loading &&
                !error &&
                policies.length === 0 && (

                    <div className="alert alert-info text-center">

                        No policies available.

                    </div>

                )}

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
                                        <p className="card-text mb-2">

                                            <strong>
                                                Policy Type:
                                            </strong>{" "}

                                            {policy.PolicyType ||
                                                "N/A"}

                                        </p>

                                        <p className="card-text mb-2">

                                            <strong>
                                                Amount:
                                            </strong>{" "}

                                            {policy.PolicyAmount !==
                                            undefined &&
                                            policy.PolicyAmount !==
                                            null
                                                ? `Rs. ${policy.PolicyAmount}`
                                                : "N/A"}

                                        </p>
                                        <p className="card-text mb-3">

                                            <strong>
                                                Status:
                                            </strong>{" "}

                                            {policy.IsRenewed
                                                ? "Active Renewal"
                                                : "Awaiting Renewal"}

                                        </p>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() =>
                                                deletePolicy(
                                                    policy.PolicyId
                                                )
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

