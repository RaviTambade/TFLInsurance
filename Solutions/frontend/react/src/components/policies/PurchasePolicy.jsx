import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

function PurchasePolicy() {
    //const navigate = useNavigate();
    const customerId = localStorage.getItem("customerId");
    const [policy, setPolicy] = useState({
        PolicyNumber: "",
        CustomerId: customerId,
        PolicyType: "",
        PolicyAmount: "",
        IsRenewed: ""
    });

    const handleChange = (e) => {
        setPolicy({
            ...policy,
            [e.target.name]: e.target.value
        });
    };

    const savePolicy = async (e) => {
        e.preventDefault();

        console.log(policy);

        try {

            const response = await fetch("http://localhost:5000/api/policies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(policy)
        });

         if (response.ok) {

                const result = await response.json();

                console.log(result);
                
                alert("Customer Purchased Policy Successfully");
            
            }
            else 
                {
                alert("Failed to Purchase Policy");
                }
            }
            catch (error) {
                console.error(error);
                alert("Error occurred");
            }
        
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h3 className="mb-0">Purchase Policy</h3>
                            <p className="mb-0 mt-1 small">Secure your coverage with a few simple details.</p>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={savePolicy}>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label">Policy Number</label>
                                        <input
                                            type="text"
                                            name="PolicyNumber"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Customer ID</label>
                                        <input
                                            type="number"
                                            name="CustomerId"
                                            className="form-control"
                                            value={policy.CustomerId}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Policy Type</label>
                                        <select
                                            name="PolicyType"
                                            className="form-select"
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Policy</option>
                                            <option value="Health">Health</option>
                                            <option value="Life">Life</option>
                                            <option value="Vehicle">Vehicle</option>
                                            <option value="Home">Home</option>
                                            <option value="Travel">Travel</option>
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Policy Amount</label>
                                        <input
                                            type="number"
                                            name="PolicyAmount"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Is Renewed</label>
                                        <select
                                            name="IsRenewed"
                                            className="form-select"
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end mt-4">
                                    <button type="submit" className="btn btn-primary px-4">
                                        Purchase Policy
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchasePolicy;