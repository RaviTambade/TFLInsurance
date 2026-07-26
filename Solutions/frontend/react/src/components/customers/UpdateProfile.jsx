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

                <div className="card shadow-lg">

                    <div className="card-header bg-primary text-white text-center">
                        <h3>Customer Updation </h3>
                    </div>

                    <div className="card-body">

                        <form onSubmit={submitProfile}>

                            <table className="table table-bordered align-middle">

                                <tbody>


                                    <tr>
                                        <th>First Name</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="FirstName"
                                                className="form-control"
                                                value={profile.FirstName || ""}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Last Name</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="LastName"
                                                className="form-control"
                                                value={profile.LastName || ""}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>


                                    <tr>
                                        <th>Email</th>
                                        <td>
                                            <input
                                                type="email"
                                                name="Email"
                                                className="form-control"
                                                value={profile.Email || ""}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Mobile Number</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="MobileNumber"
                                                className="form-control"
                                                value={profile.MobileNumber || ""}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Address Line 1</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="AddressLine1"
                                                className="form-control"
                                                value={profile.AddressLine1 || ""}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Address Line 2</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="AddressLine2"
                                                className="form-control"
                                                value={profile.AddressLine2 || ""}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>City</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="City"
                                                className="form-control"
                                                value={profile.City || ""}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>State</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="State"
                                                className="form-control"
                                                value={profile.State || ""}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Postal Code</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="PostalCode"
                                                className="form-control"
                                                value={profile.PostalCode || ""}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Country</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="Country"
                                                className="form-control"
                                                value={profile.Country || ""}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <button
                                                className="btn btn-primary"
                                                onClick={submitProfile}
                                            >
                                                Submit Profile
                                            </button>
                                                                        

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

export default UpdateProfile;