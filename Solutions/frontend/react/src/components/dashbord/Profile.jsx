

import React from "react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {

    const [Profile, setProfile] = useState({});

    const customerId = localStorage.getItem("customerId");

    const navigate = useNavigate();

   const updateProfile = (e) => {

        navigate("/UpdateProfile");

    };
   
    const purchasePolicy = (e) => {

        navigate("/PurchasePolicy");

    };


    const loadCustomer = async () => {

        const response = await fetch(
            `http://localhost:5000/api/customers/${customerId}`
        );

        const data = await response.json();

        setProfile(data);
        console.log(data);

    };

     useEffect(() => {
        loadCustomer();
    }, []);

    

    

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

                            {Array.isArray(Profile) && Profile.length > 0 ? (
                                Profile.map((profile) => (
                                    <div key={profile.CustomerId}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="p-3 rounded bg-light">
                                                    <h5 className="mb-3">Personal Information</h5>
                                                    <p className="mb-2"><strong>First Name:</strong> {profile.FirstName}</p>
                                                    <p className="mb-2"><strong>Last Name:</strong> {profile.LastName}</p>
                                                    <p className="mb-2"><strong>Date of Birth:</strong> {profile.DateOfBirth}</p>
                                                    <p className="mb-2"><strong>Gender:</strong> {profile.Gender}</p>
                                                    <p className="mb-2"><strong>Email:</strong> {profile.Email}</p>
                                                    <p className="mb-0"><strong>Mobile Number:</strong> {profile.MobileNumber}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="p-3 rounded bg-light">
                                                    <h5 className="mb-3">Address Details</h5>
                                                    <p className="mb-2"><strong>Address Line 1:</strong> {profile.AddressLine1}</p>
                                                    <p className="mb-2"><strong>Address Line 2:</strong> {profile.AddressLine2}</p>
                                                    <p className="mb-2"><strong>City:</strong> {profile.City}</p>
                                                    <p className="mb-2"><strong>State:</strong> {profile.State}</p>
                                                    <p className="mb-0"><strong>Country:</strong> {profile.Country}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="p-3 rounded bg-light">
                                                    <h5 className="mb-3">Identity & Income</h5>
                                                    <p className="mb-2"><strong>PAN Number:</strong> {profile.PanNumber}</p>
                                                    <p className="mb-2"><strong>Aadhaar Number:</strong> {profile.AadhaarNumber}</p>
                                                    <p className="mb-2"><strong>Occupation:</strong> {profile.Occupation}</p>
                                                    <p className="mb-0"><strong>Annual Income:</strong> {profile.AnnualIncome}</p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="p-3 rounded bg-light">
                                                    <h5 className="mb-3">Nominee Information</h5>
                                                    <p className="mb-2"><strong>Nominee Name:</strong> {profile.NomineeName}</p>
                                                    <p className="mb-2"><strong>Relationship:</strong> {profile.NomineeRelationship}</p>
                                                    <p className="mb-0"><strong>Contact Number:</strong> {profile.NomineeContactNumber}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
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