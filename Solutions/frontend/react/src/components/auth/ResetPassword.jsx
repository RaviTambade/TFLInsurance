import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const resetPassword = async (e) => {

        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert("New Password and Confirm Password do not match");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/users/resetPassword/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert(data.message);

                navigate("/UserListForAdmin");

            } else {

                alert(data.message);

            }

        } catch (err) {

            console.log(err);
            alert("Something went wrong");

        }

    };

    return (

        <div className="container mt-5 mb-5">

           <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">

                <div className="card shadow-lg mx-auto" style={{ maxWidth: "520px" }}>
                <div className="card-header bg-primary text-white">
                    <h3>Reset User Password</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={resetPassword}>

                        <div className="mb-3 text-center">
                            <label className="form-label d-block">
                                New Password
                            </label>
                            <div className="d-flex justify-content-center">
                                <input
                                    type="password"
                                    name="newPassword"
                                    className="form-control"
                                    style={{ maxWidth: "400px" }}
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3 text-center">
                            <label className="form-label d-block">
                                Confirm Password
                            </label>
                            <div className="d-flex justify-content-center">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    style={{ maxWidth: "400px" }}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Reset Password
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

export default ResetPassword;