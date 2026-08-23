import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeRegistration() {

    const navigate = useNavigate();

    const [role, setRole] = useState("");

    const handleContinue = () => {

        if (!role) {
            alert("Please select employee type");
            return;
        }

        if (role === "Agent") {
            navigate("/RegisterAgent");
        }
        else if (role === "SalesPerson") {
            navigate("/SalesPersonRegistration");
        }
        else if (role === "AccountPerson") {
            navigate("/AccountPersonRegistration");
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-7">

                    <div className="card shadow-lg border-0 rounded-4">

                        <div className="card-header bg-primary text-white text-center py-4">
                            <h3 className="mb-1">
                                Employee Registration
                            </h3>

                            <p className="mb-0">
                                Select employee type to continue
                            </p>
                        </div>

                        <div className="card-body p-4">

                            <label className="form-label fw-bold">
                                Employee Type
                            </label>

                            <select
                                className="form-select form-select-lg mb-4"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">
                                    Select Employee Type
                                </option>

                                <option value="Agent">
                                    Agent
                                </option>

                                <option value="SalesPerson">
                                    Sales Person
                                </option>

                                <option value="AccountPerson">
                                    Account Person
                                </option>
                            </select>


                            {role && (
                                <div className="text-center mb-4">

                                    <h5 className="mb-3">
                                        Selected Role
                                    </h5>

                                    <div className="alert alert-info">
                                        You selected{" "}
                                        <strong>{role}</strong>
                                    </div>

                                </div>
                            )}


                            <div className="d-flex justify-content-center">

                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg px-5"
                                    onClick={handleContinue}
                                >
                                    Continue →
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default EmployeeRegistration;