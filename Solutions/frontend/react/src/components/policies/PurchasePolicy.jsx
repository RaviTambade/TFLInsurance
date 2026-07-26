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
        <div className="container mt-5 d-flex justify-content-center">

            <div className="card shadow p-4" style={{ width: "600px" }}>

                <h2 className="text-center mb-4">
                    Policy Registration
                </h2>

                <form onSubmit={savePolicy}>

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <td><b>Policy Number</b></td>
                                <td>
                                    <input
                                        type="text"
                                        name="PolicyNumber"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><b>Customer ID</b></td>
                                <td>
                                    <input
                                        type="number"
                                        name="CustomerId"
                                        className="form-control"
                                        value={policy.CustomerId}
                                        readOnly
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><b>Policy Type</b></td>
                                <td>
                                    <select
                                        name="PolicyType"
                                        className="form-control"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Policy</option>
                                        <option>Health</option>
                                        <option>Life</option>
                                        <option>Vehicle</option>
                                        <option>Home</option>
                                        <option>Travel</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td><b>Policy Amount</b></td>
                                <td>
                                    <input
                                        type="number"
                                        name="PolicyAmount"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><b>Is Renewed</b></td>
                                <td>
                                    <select
                                        name="IsRenewed"
                                        className="form-control"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="2" className="text-center">
                                    <button className="btn btn-primary">
                                        Purchase Policy
                                    </button>
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </form>

            </div>

        </div>
    );
}

export default PurchasePolicy;