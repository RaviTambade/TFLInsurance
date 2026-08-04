

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const customerId = localStorage.getItem("CustomerId");

    const navigate = useNavigate();

    const updateProfile = () => navigate("/UpdateProfile");
    const purchasePolicy = () => navigate("/PurchasePolicy");

    const loadCustomer = useCallback(async () => {
        if (!customerId) {
            setError('No customerId found. Please login.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/api/customers/${customerId}`);
            const text = await response.text();

            if (!response.ok) {
                let info = text;
                try { info = JSON.parse(text); } catch {}
                setError(`Failed to load profile: ${response.status} ${typeof info === 'string' ? info : (info.message || JSON.stringify(info))}`);
                setLoading(false);
                return;
            }

            let data;
            try { data = JSON.parse(text); } catch { data = text; }
            setProfile(data);
        } catch (err) {
            console.error('Error loading customer', err);
            setError('Network error while loading profile');
        } finally {
            setLoading(false);
        }
    }, [customerId]);

    useEffect(() => {
        loadCustomer();
    }, [loadCustomer]);

    

    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                                <div>
                                    <h2 className="mb-1">My Profile</h2>
                                    <p className="text-muted mb-0">Manage your personal and nominee details securely.</p>
                                </div>
                                <span className="badge bg-primary fs-6 mt-2 mt-md-0">Customer Profile</span>
                            </div>

                            {loading ? (
                                <div className="text-center py-4">Loading profile...</div>
                            ) : error ? (
                                <div className="alert alert-danger text-center">{error}</div>
                            ) : profile ? (
                                (() => {
                                    const p = Array.isArray(profile) ? profile[0] : profile;
                                    return (
                                        <div>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <div className="p-3 rounded bg-light">
                                                        <h5 className="mb-3">Personal Information</h5>
                                                        <p className="mb-2"><strong>First Name:</strong> {p.FirstName}</p>
                                                        <p className="mb-2"><strong>Last Name:</strong> {p.LastName}</p>
                                                        <p className="mb-2"><strong>Date of Birth:</strong> {p.DateOfBirth}</p>
                                                        <p className="mb-2"><strong>Gender:</strong> {p.Gender}</p>
                                                        <p className="mb-2"><strong>Email:</strong> {p.Email}</p>
                                                        <p className="mb-0"><strong>Mobile Number:</strong> {p.MobileNumber}</p>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="p-3 rounded bg-light">
                                                        <h5 className="mb-3">Address Details</h5>
                                                        <p className="mb-2"><strong>Address Line 1:</strong> {p.AddressLine1}</p>
                                                        <p className="mb-2"><strong>Address Line 2:</strong> {p.AddressLine2}</p>
                                                        <p className="mb-2"><strong>City:</strong> {p.City}</p>
                                                        <p className="mb-2"><strong>State:</strong> {p.State}</p>
                                                        <p className="mb-0"><strong>Country:</strong> {p.Country}</p>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="p-3 rounded bg-light">
                                                        <h5 className="mb-3">Identity & Income</h5>
                                                        <p className="mb-2"><strong>PAN Number:</strong> {p.PanNumber}</p>
                                                        <p className="mb-2"><strong>Aadhaar Number:</strong> {p.AadhaarNumber}</p>
                                                        <p className="mb-2"><strong>Occupation:</strong> {p.Occupation}</p>
                                                        <p className="mb-0"><strong>Annual Income:</strong> {p.AnnualIncome}</p>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="p-3 rounded bg-light">
                                                        <h5 className="mb-3">Nominee Information</h5>
                                                        <p className="mb-2"><strong>Nominee Name:</strong> {p.NomineeName}</p>
                                                        <p className="mb-2"><strong>Relationship:</strong> {p.NomineeRelationship}</p>
                                                        <p className="mb-0"><strong>Contact Number:</strong> {p.NomineeContactNumber}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()
                            ) : (
                                <div className="alert alert-info text-center">No profile information available.</div>
                            )}

                            <div className="text-center mt-4">
                                <button className="btn btn-primary me-2" onClick={updateProfile}>
                                    Update Profile
                                </button>
                                <button className="btn btn-outline-primary" onClick={purchasePolicy}>
                                    Purchase Policy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Profile;