import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PayPremium() {

    const location = useLocation();
    const navigate = useNavigate();

    const policy = location.state?.policy;

    const getCurrentLocalDateTime = () => {
        const now = new Date();
        const offsetMinutes = now.getTimezoneOffset();
        const local = new Date(now.getTime() - offsetMinutes * 60000);
        return local.toISOString().slice(0, 16);
    };

    const generateTransactionId = () => {
        return `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    };

    const [premium, setPremium] = useState({
        PolicyId: policy?.PolicyId || "",
        CustomerId: policy?.CustomerId || "",
        PolicyAmount: policy?.PolicyAmount || "",
        AmountPaid: "",
        PaymentFrequency: "",
        PaymentDate: getCurrentLocalDateTime(),
        PaymentMode: "",
        TransactionId: generateTransactionId(),
        Remarks: "",
        PaymentStatus: "Success"
    });

    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [nextDueDate, setNextDueDate] = useState("");

    const getNextDueDate = (paymentDate, frequency) => {
        if (!paymentDate || !frequency) return "";

        const date = new Date(paymentDate);
        switch (frequency) {
            case "Monthly":
                date.setMonth(date.getMonth() + 1);
                break;
            case "Quarterly":
                date.setMonth(date.getMonth() + 3);
                break;
            case "Half-Yearly":
                date.setMonth(date.getMonth() + 6);
                break;
            case "Yearly":
                date.setFullYear(date.getFullYear() + 1);
                break;
            default:
                return "";
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

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

            if (response.ok) {
                setPaymentCompleted(true);
                setNextDueDate(getNextDueDate(premium.PaymentDate, premium.PaymentFrequency));
                alert(result.message);
            } else {
                alert(result.message || "Payment Failed");
            }

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
                                <div className="row gy-4">
                                    <div className="col-12">
                                        <div className="alert alert-light border rounded p-3">
                                            <div className="d-flex justify-content-between flex-column flex-md-row gap-3">
                                                <div>
                                                    <h6 className="mb-1">Policy Amount</h6>
                                                    <p className="mb-0 fs-5">Rs.{premium.PolicyAmount || "0.00"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Payment Frequency</label>
                                        <select
                                            className="form-select"
                                            value={premium.PaymentFrequency}
                                            onChange={(e) => calculatePremium(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Frequency</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Quarterly">Quarterly</option>
                                            <option value="Half-Yearly">Half-Yearly</option>
                                            <option value="Yearly">Yearly</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Amount Due</label>
                                        <input
                                            className="form-control"
                                            value={premium.AmountPaid}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Payment Date</label>
                                        <input
                                            type="datetime-local"
                                            name="PaymentDate"
                                            className="form-control"
                                            value={premium.PaymentDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Payment Mode</label>
                                        <select
                                            name="PaymentMode"
                                            className="form-select"
                                            value={premium.PaymentMode}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Payment Mode</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Debit Card">Debit Card</option>
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="Net Banking">Net Banking</option>
                                            <option value="Cash">Cash</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Remarks</label>
                                        <textarea
                                            name="Remarks"
                                            className="form-control"
                                            value={premium.Remarks}
                                            onChange={handleChange}
                                            rows="3"
                                        />
                                    </div>

                                    <div className="col-12">
                                        {paymentCompleted && nextDueDate && (
                                            <div className="alert alert-success">
                                                Premium paid successfully. Next premium due on <strong>{nextDueDate}</strong>.
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-12 d-flex flex-column flex-sm-row justify-content-start gap-3 mt-2">
                                        <button type="submit" className="btn btn-primary px-4" disabled={paymentCompleted}>
                                            {paymentCompleted ? "Payment Completed" : "Pay Premium"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary px-4"
                                            onClick={() => navigate("/policylistinpremium")}
                                        >
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default PayPremium;