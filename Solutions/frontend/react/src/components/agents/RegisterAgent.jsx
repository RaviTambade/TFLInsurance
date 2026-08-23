import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterAgent() {
    const navigate = useNavigate();

    const [agent, setAgent] = useState({
        FullName: "",
        Email: "",
        Password: "",
        MobileNumber: "",
        LicenseNumber: "",
        Branch: "",
        Designation: "",
        CommissionRate: "",
        TotalCommissionEarned: 0
    });

    const handleChange = (e) => {
        setAgent({
            ...agent,
            [e.target.name]: e.target.value
        });
    };

    const saveAgent = async (e) => {
        e.preventDefault();

        const agentDetails = {
            fullName: agent.FullName || "",
            email: agent.Email || "",
            password: agent.Password || "",
            mobileNumber: agent.MobileNumber || "",
            licenseNumber: agent.LicenseNumber || "",
            branch: agent.Branch || "",
            designation: agent.Designation || "",
            commissionRate: agent.CommissionRate !== "" ? Number(agent.CommissionRate) : 0,
            totalCommissionEarned: agent.TotalCommissionEarned !== "" ? Number(agent.TotalCommissionEarned) : 0
        };

        console.log("Register agent payload:", agentDetails);

        try {
            const response = await fetch("http://localhost:5000/api/agents/register",
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(agentDetails)
            });

            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch {
                result = { message: text };
            }

            if (response.ok) {
                alert("Agent Registered Successfully");
                navigate("/Login");
            } else {
                console.log("Status:", response.status);
                console.log("Payload sent:", agentDetails);
                console.log("Server response:", text);
                console.log("Parsed result:", result);
                alert(result?.message || result?.sqlMessage || text || "Failed to Register Agent");
            }
        } catch (error) {
            console.error("Register agent error", error);
            alert("Error occurred: " + (error.message || error));
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-xl-9 col-lg-10">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-primary text-white text-center py-4">
                            <h3 className="mb-1">Agent Registration</h3>
                            <p className="mb-0 text-white-75">Fill in the agent details to complete registration.</p>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={saveAgent}>
                                <div className="mb-4">
                                    <h5 className="mb-3">Personal information</h5>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Full Name</label>
                                            <input
                                                type="text"
                                                name="FullName"
                                                className="form-control"
                                                value={agent.FullName}
                                                onChange={handleChange}
                                                placeholder="Full name"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                name="Email"
                                                className="form-control"
                                                value={agent.Email}
                                                onChange={handleChange}
                                                placeholder="email@example.com"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="password"
                                                name="Password"
                                                className="form-control"
                                                value={agent.Password}
                                                onChange={handleChange}
                                                placeholder="Enter Password"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Mobile Number</label>
                                            <input
                                                type="tel"
                                                name="MobileNumber"
                                                className="form-control"
                                                value={agent.MobileNumber}
                                                onChange={handleChange}
                                                placeholder="1234567890"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h5 className="mb-3">Agent details</h5>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label">License Number</label>
                                            <input
                                                type="text"
                                                name="LicenseNumber"
                                                className="form-control"
                                                value={agent.LicenseNumber}
                                                onChange={handleChange}
                                                placeholder="LIC123456"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Branch</label>
                                            <input
                                                type="text"
                                                name="Branch"
                                                className="form-control"
                                                value={agent.Branch}
                                                onChange={handleChange}
                                                placeholder=" "
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Designation</label>
                                            <input
                                                type="text"
                                                name="Designation"
                                                className="form-control"
                                                value={agent.Designation}
                                                onChange={handleChange}
                                                placeholder=" "
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Commission Rate (%)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="100"
                                                name="CommissionRate"
                                                className="form-control"
                                                value={agent.CommissionRate}
                                                onChange={handleChange}
                                                placeholder="5.5"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Total Commission Earned</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                name="TotalCommissionEarned"
                                                className="form-control"
                                                value={agent.TotalCommissionEarned}
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center mt-4">
                                    <button type="submit" className="btn btn-primary btn-lg px-4">
                                        Register Agent
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

export default RegisterAgent;
