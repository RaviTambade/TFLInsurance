import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({});

    // Handle input change
    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    // Submit Update
    const submitProfile = async (e) => {

        e.preventDefault();

        try {

            const customerId = localStorage.getItem("customerId");

            const response = await fetch(
                `http://localhost:5000/api/customers/${customerId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(profile)
                }
            );

            const result = await response.json();

            if (response.ok) {
                alert("Customer Updated Successfully");
                navigate("/profile");
            }
            else {
                alert(result.message);
            }

        }
        catch (error) {
            console.log(error);
            alert("Error Occurred");
        }
    };


return (
    <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="card shadow-lg border-0">
                    <div className="card-header bg-primary text-white text-center py-3">
                        <h3 className="mb-0">Update Profile</h3>
                        <p className="mb-0 mt-1 small">Keep your personal details accurate and up to date.</p>
                    </div>

                    <div className="card-body p-4">
                        <form onSubmit={submitProfile}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        name="FirstName"
                                        className="form-control"
                                        value={profile.FirstName || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="LastName"
                                        className="form-control"
                                        value={profile.LastName || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="Email"
                                        className="form-control"
                                        value={profile.Email || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="MobileNumber"
                                        className="form-control"
                                        value={profile.MobileNumber || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Address Line 1</label>
                                    <input
                                        type="text"
                                        name="AddressLine1"
                                        className="form-control"
                                        value={profile.AddressLine1 || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Address Line 2</label>
                                    <input
                                        type="text"
                                        name="AddressLine2"
                                        className="form-control"
                                        value={profile.AddressLine2 || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">City</label>
                                    <input
                                        type="text"
                                        name="City"
                                        className="form-control"
                                        value={profile.City || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">State</label>
                                    <input
                                        type="text"
                                        name="State"
                                        className="form-control"
                                        value={profile.State || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Postal Code</label>
                                    <input
                                        type="text"
                                        name="PostalCode"
                                        className="form-control"
                                        value={profile.PostalCode || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Country</label>
                                    <input
                                        type="text"
                                        name="Country"
                                        className="form-control"
                                        value={profile.Country || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mt-4">
                                <button type="submit" className="btn btn-primary px-4">
                                    Save Changes
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

export default UpdateProfile;