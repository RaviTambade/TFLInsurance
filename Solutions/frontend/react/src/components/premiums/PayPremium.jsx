import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PayPremium() {

    const location = useLocation();
    const navigate = useNavigate();

    const policy = location.state?.policy;

    const [premium, setPremium] = useState({
        PolicyId: policy?.PolicyId || "",
        CustomerId: policy?.CustomerId || "",
        PolicyAmount: policy?.PolicyAmount || "",
        AmountPaid: "",
        PaymentFrequency: "",
        PaymentDate: "",
        PaymentMode: "",
        TransactionId: "",
        Remarks: "",
        PaymentStatus: "Success"
    });



    const handleChange = (e) => {

        setPremium({
            ...premium,
            [e.target.name]: e.target.value
        });

    };

    const calculatePremium = (frequency) => {

        const policyAmount = Number(policy.PolicyAmount);

        let payable = 0;

        if (frequency === "Monthly") {
            payable = policyAmount / 12;
        }
        else if (frequency === "Quarterly") {
            payable = policyAmount / 4;
        }
        else if (frequency === "Half-Yearly") {
            payable = policyAmount / 2;
        }
        else if (frequency === "Yearly") {
            payable = policyAmount;
        }

        setPremium({
            ...premium,
            PaymentFrequency: frequency,
            AmountPaid: payable.toFixed(2)
        });

    };

    const payPremium = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5000/api/premiums",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(premium)
                }
            );

            const result = await response.json();

            alert(result.message);

           // navigate("/premiums");

        }
        catch (err) {

            console.log(err);

            alert("Payment Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow-lg">

                        <div className="card-header bg-primary text-white text-center">

                            <h3>Pay Premium</h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={payPremium}>

                                <table className="table table-bordered">

                                    <tbody>

                                        <tr>

                                            <th width="35%">Policy Id</th>

                                            <td>

                                                <input
                                                    className="form-control"
                                                    value={premium.PolicyId}
                                                    readOnly
                                                />

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>Customer Id</th>

                                            <td>

                                                <input
                                                    className="form-control"
                                                    value={premium.CustomerId}
                                                    readOnly
                                                />

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>Policy Amount</th>

                                            <td>

                                                <input
                                                    className="form-control"
                                                    value={premium.PolicyAmount}
                                                    readOnly
                                                />

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>Payment Frequency</th>

                                            <td>

                                                <select
                                                    className="form-control"
                                                    value={premium.PaymentFrequency}
                                                    onChange={(e) =>
                                                        calculatePremium(e.target.value)
                                                    }
                                                >

                                                    <option value="">
                                                        Select Frequency
                                                    </option>

                                                    <option value="Monthly">
                                                        Monthly
                                                    </option>

                                                    <option value="Quarterly">
                                                        Quarterly
                                                    </option>

                                                    <option value="Half-Yearly">
                                                        Half-Yearly
                                                    </option>

                                                    <option value="Yearly">
                                                        Yearly
                                                    </option>

                                                </select>

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>Amount Paid</th>

                                            <td>

                                                <input
                                                    className="form-control"
                                                    value={premium.AmountPaid}
                                                    readOnly
                                                />

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>Payment Date</th>

                                            <td>

                                                <input
                                                    type="datetime-local"
                                                    name="PaymentDate"
                                                    className="form-control"
                                                    value={premium.PaymentDate}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>Payment Mode</th>

                                            <td>

                                                <select
                                                    name="PaymentMode"
                                                    className="form-control"
                                                    value={premium.PaymentMode}
                                                    onChange={handleChange}
                                                    required
                                                >

                                                    <option value="">
                                                        Select Payment Mode
                                                    </option>

                                                    <option value="UPI">
                                                        UPI
                                                    </option>

                                                    <option value="Debit Card">
                                                        Debit Card
                                                    </option>

                                                    <option value="Credit Card">
                                                        Credit Card
                                                    </option>

                                                    <option value="Net Banking">
                                                        Net Banking
                                                    </option>

                                                    <option value="Cash">
                                                        Cash
                                                    </option>

                                                </select>

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>Transaction Id</th>

                                            <td>

                                                <input
                                                    type="text"
                                                    name="TransactionId"
                                                    className="form-control"
                                                    value={premium.TransactionId}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </td>

                                        </tr>

                                        <tr>

                                            <th>Remarks</th>

                                            <td>

                                                <textarea
                                                    name="Remarks"
                                                    className="form-control"
                                                    value={premium.Remarks}
                                                    onChange={handleChange}
                                                />

                                            </td>

                                        </tr>

                                        <tr>

                                            <td
                                                colSpan="2"
                                                className="text-center"
                                            >

                                                <button
                                                    type="submit"
                                                    className="btn btn-success me-3"
                                                >
                                                    Pay Premium
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => navigate("/policylistinpremium")}
                                                >
                                                    Back
                                                </button>

                                            </td>

                                        </tr>

                                    </tbody>

                                </table>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default PayPremium;