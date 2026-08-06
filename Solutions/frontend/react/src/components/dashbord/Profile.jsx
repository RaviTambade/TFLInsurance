import React, { useEffect, useState } from "react";

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        const userId = localStorage.getItem("userId");

        if (!userId) {
            setFeedback("Please login first.");
            setLoading(false);
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:5000/api/users/customerProfileByUserId/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load profile");
            }

            const data = await response.json();

            console.log("Profile API Response:", data);

            setUser(Array.isArray(data) ? data[0] : data);

        } catch (error) {
            console.error(error);
            setFeedback("Unable to load profile.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h4>Loading...</h4>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    {feedback}
                </div>
            </div>
        );
    }

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h3>My Profile</h3>

                        </div>

                        <div className="card-body">

                            <div className="row mb-3">

                                <div className="col-md-4">
                                    <strong>First Name</strong>
                                    <p>{user.FirstName}</p>
                                </div>

                                <div className="col-md-4">
                                    <strong>Last Name</strong>
                                    <p>{user.LastName}</p>
                                </div>

                                 <div className="col-md-4">
                                    <strong>Email</strong>
                                    <p>{user.Email}</p>
                                </div>


                            </div>

                            <div className="row mb-3">

                                <div className="col-md-4">
                                    <strong>Nominee Name</strong>
                                    <p>{user.NomineeName}</p>
                                </div>

                                <div className="col-md-4">
                                    <strong>Nominee Relationship</strong>
                                    <p>{user.NomineeRelationship}</p>
                                </div>

                                 <div className="col-md-4">
                                    <strong>Nominee Contact</strong>
                                    <p>{user.NomineeContactNumber}</p>
                                </div>

                            </div>

                            <div className="row mb-3">

                              
                                <div className="col-md-12">
                                    <strong>Status</strong>
                                    <p>{user.IsActive ? "Active" : "Inactive"}</p>
                                </div>

                            </div>

                        </div>

                        <div className="card-footer d-flex justify-content-between">

                            <button
                                className="btn btn-success"
                            >
                                Purchase Policy
                            </button>

                            <button
                                className="btn btn-primary"
                            >
                                Edit Profile
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Profile;