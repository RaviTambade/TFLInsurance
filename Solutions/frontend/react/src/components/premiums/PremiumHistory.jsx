
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PremiumHistory() {

    const [premiums, setPremiums] = useState([]);

    const location = useLocation();

    // Get selected policy from previous page
    const policy = location.state?.policy;
    console.log("Selected Policy:", policy);
    console.log("PolicyId:", policy?.PolicyId);

    const loadPremiums = async () => {

        try {

            if (!policy?.PolicyId) {
                console.error("PolicyId not found");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/api/premiums/${policy.PolicyId}`
            );

            if (!response.ok) {
                throw new Error("Failed to load Premium List");
            }

            const data = await response.json();
            console.log("Premium API Response:", data);

            setPremiums(data);

        } catch (error) {

            console.error("Premium list load error:", error);

        }
    };


    useEffect(() => {

        loadPremiums();

    }, []);


    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="mb-1">
                        Premium History
                    </h2>

                    {policy && (
                        <small className="text-muted">
                            Policy: {policy.PolicyNumber}
                        </small>
                    )}
                </div>

            </div>


            <div className="row g-4 justify-content-center">

                {premiums.length > 0 ? (

                    premiums.map((premium) => (

                        <div
                            className="col-md-6 col-lg-4"
                            key={premium.PremiumId}
                        >

                            <div className="card shadow-sm h-100 border-0">

                                <div className="card-body">

                                    <div className="d-flex justify-content-between align-items-start mb-3">

                                        <h5 className="card-title">
                                            Premium Payment
                                        </h5>

                                        <span className="badge bg-success">
                                            {premium.paymentStatus
                                                ? "Success"
                                                : "Pending"}
                                        </span>

                                    </div>


                                    <p className="card-text mb-2">
                                        <strong>Premium Amount:</strong>{" "}
                                        ₹{premium.AmountPaid}
                                    </p>


                                    <p className="card-text mb-2">
                                        <strong>Payment Date:</strong>{" "}
                                        {premium.PaymentDate}
                                    </p>


                                    <p className="card-text mb-2">
                                        <strong>Payment Mode:</strong>{" "}
                                        {premium.PaymentMode}
                                    </p>


                                    <p className="card-text mb-2">
                                        <strong>Transaction ID:</strong>{" "}
                                        {premium.TransactionId}
                                    </p>

                                </div>


                                <div className="card-footer bg-white border-0">

                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                    >
                                        View Receipt
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="col-12">

                        <div className="alert alert-info text-center">

                            No Premiums available for this policy.

                        </div>

                    </div>

                )}

            </div>

        </div>

    );
}

export default PremiumHistory;
