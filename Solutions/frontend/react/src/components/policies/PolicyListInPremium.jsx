import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PolicyListInPremium() {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const customerId = localStorage.getItem("customerId");
    const navigate = useNavigate();

    const loadPolicies = async () => {
        if (!customerId) {
            setError("Customer not found. Please login again.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `http://localhost:5000/api/policies/getPolicyByCustomerId/${customerId}`
            );

            if (!response.ok) {
                throw new Error(`Failed to load policies (${response.status})`);
            }

            const data = await response.json();
            setPolicies(Array.isArray(data) ? data : []);
        } catch (fetchError) {
            console.error("Policy load failed", fetchError);
            setError("Unable to load policies at this time.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPolicies();
    }, [customerId]);

    const handlePayPremium = (policy) => {
        navigate("/PayPremium", { state: { policy } });
    };

    const handlePaidPremiumList = (policy) => {
        navigate("/PremiumHistory", {state:{policy}});
    }
    return (
        <div className="container mt-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                <div>
                    <h2 className="mb-1">My Premium Policies</h2>
                    <p className="text-muted mb-0">
                        Review your active policies and make premium payments quickly.
                    </p>
                </div>
                <span className="badge bg-primary fs-6">{policies.length} policies</span>
            </div>

            {loading ? (
                <div className="alert alert-secondary text-center">Loading policy data...</div>
            ) : error ? (
                <div className="alert alert-danger text-center">{error}</div>
            ) : policies.length === 0 ? (
                <div className="alert alert-info text-center">No premium policies found.</div>
            ) : (
                <div className="row g-4">
                    {policies.map((policy) => (
                        <div className="col-12" key={policy.PolicyId || policy.PolicyNumber || policy.CustomerId}>
                            <div className="card shadow-sm border-0">
                                <div className="card-body d-flex flex-column flex-md-row justify-content-between gap-3">
                                    <div>
                                        <h5 className="card-title mb-2">{policy.PolicyNumber || "Policy"}</h5>
                                        <p className="mb-1"><strong className="me-2">Type:</strong>{policy.PolicyType || "N/A"}</p>
                                        <p className="mb-1"><strong className="me-2">Amount:</strong>{policy.PolicyAmount ? `Rs.${policy.PolicyAmount}` : "N/A"}</p>
                                        <p className="mb-0"><strong className="me-2">Renewed:</strong>{policy.IsRenewed === "1" || policy.IsRenewed === 1 ? "Yes" : "No"}</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                         <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => handlePaidPremiumList(policy)}
                                        >
                                            Paid Premium List
                                        </button>
                                        
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handlePayPremium(policy)}
                                        >
                                            Pay Premium
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PolicyListInPremium;
