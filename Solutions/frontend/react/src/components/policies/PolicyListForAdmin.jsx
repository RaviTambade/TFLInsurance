

import React from "react";
import { useEffect, useState } from "react";

function PolicyListForAdmin() {

    const [policies, setPolicies] = useState({});
   
    const loadpolicies = async () => {

        const response = await fetch(
            `http://localhost:5000/api/policies/getAllPolicies`
        );

        const data = await response.json();

        setPolicies(data);
        console.log(data);

    };

     useEffect(() => {
        loadpolicies();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Policies List</h2>
                    <p className="text-muted mb-0">Manage and review all insurance policies in one place.</p>
                </div>
                <span className="badge bg-primary fs-6">
                    {Array.isArray(policies) ? policies.length : 0} Policies
                </span>
            </div>

            <div className="row g-4">
                {Array.isArray(policies) && policies.length > 0 ? (
                    policies.map((policy) => (
                        <div className="col-md-6 col-lg-4" key={policy.PolicyId || policy.PolicyNumber}>
                            <div className="card shadow-sm h-100 border-0">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h5 className="card-title mb-0">{policy.PolicyNumber || "Policy"}</h5>
                                        <span className={`badge ${policy.IsRenewed ? "bg-success" : "bg-warning text-dark"}`}>
                                            {policy.IsRenewed ? "Renewed" : "Pending"}
                                        </span>
                                    </div>

                                    <p className="card-text mb-2">
                                        <strong>Customer ID:</strong> {policy.CustomerId}
                                    </p>
                                    <p className="card-text mb-2">
                                        <strong>Policy Type:</strong> {policy.PolicyType}
                                    </p>
                                    <p className="card-text mb-2">
                                        <strong>Amount:</strong> Rs.{policy.PolicyAmount}
                                    </p>
                                    <p className="card-text mb-0">
                                        <strong>Status:</strong> {policy.IsRenewed ? "Active Renewal" : "Awaiting Renewal"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="alert alert-info text-center">No policies available.</div>
                    </div>
                )}
            </div>
        </div>
    );
}


export default PolicyListForAdmin;