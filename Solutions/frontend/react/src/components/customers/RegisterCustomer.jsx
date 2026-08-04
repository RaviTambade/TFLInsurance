import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function RegisterCustomer() {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState({FirstName: "",
                                        LastName: "",
                                        DateOfBirth: "",
                                        Gender: "",
                                        Occupation: "",
                                        Email: "",
                                        Password: "",
                                        MobileNumber: "",
                                        AddressLine1: "",
                                        AddressLine2: "",
                                        City: "",
                                        State: "",
                                        PostalCode: "",
                                        Country: "",
                                        PanNumber: "",
                                        AadhaarNumber: "",
                                        AnnualIncome: "",
                                        NomineeName: "",
                                        NomineeRelationship: "",
                                        NomineeContactNumber: ""
                                    });

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    };

   
    
    const saveCustomer = async (e) => { // Event handling Logic
        e.preventDefault();

        // Map form state (PascalCase keys) to API payload (camelCase keys)
        const customerDetails = {
            firstName: customer.FirstName || "",
            lastName: customer.LastName || "",
            dateOfBirth: customer.DateOfBirth || "",
            gender: customer.Gender || "",
            occupation: customer.Occupation || "",
            email: customer.Email || "",
            password: customer.Password || "",
            mobileNumber: customer.MobileNumber || "",
            addressLine1: customer.AddressLine1 || "",
            addressLine2: customer.AddressLine2 || "",
            city: customer.City || "",
            state: customer.State || "",
            postalCode: customer.PostalCode || "",
            country: customer.Country || "",
            panNumber: customer.PanNumber || "",
            aadhaarNumber: customer.AadhaarNumber || "",
            annualIncome: customer.AnnualIncome ? Number(customer.AnnualIncome) : 0,
            nomineeName: customer.NomineeName || "",
            nomineeRelationship: customer.NomineeRelationship || "",
            nomineeContactNumber: customer.NomineeContactNumber || ""
        };

        console.log('Register payload:', customerDetails);

        try {
            const response = await fetch(
                "http://localhost:5000/api/customers/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(customerDetails)
                }
            );

            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch {
                result = { message: text };
            }

            if (response.ok) {
                alert("Customer Registered Successfully");
                navigate("/Login");
            } else {
                alert(result?.message || "Failed to Register Customer");
            }
        } catch (error) {
            console.error('Register error', error);
            alert("Error occurred: " + (error.message || error));
        }
    };


   return (
    <div className="container mt-5 mb-5">

        <div className="row justify-content-center">

            <div className="col-xl-9 col-lg-10">

                <div className="card shadow-lg border-0 rounded-4">

                    <div className="card-header bg-primary text-white text-center py-4">
                        <h3 className="mb-1">Customer Registration</h3>
                        <p className="mb-0 text-white-75">Fill in the customer profile details to complete registration.</p>
                    </div>

                    <div className="card-body p-4">

                        <form onSubmit={saveCustomer}>

                            <div className="mb-4">
                                <h5 className="mb-3">Personal information</h5>
                                <div className="row g-3">
                                   
                                    
                                    <div className="col-md-6">
                                        <label className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            name="FirstName"
                                            className="form-control"
                                            value={customer.FirstName}
                                            onChange={handleChange}
                                            placeholder="First name"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            name="LastName"
                                            className="form-control"
                                            value={customer.LastName}
                                            onChange={handleChange}
                                            placeholder="Last name"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="DateOfBirth"
                                            className="form-control"
                                            value={customer.DateOfBirth}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Gender</label>
                                        <select
                                            name="Gender"
                                            className="form-control"
                                            value={customer.Gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Occupation</label>
                                        <input
                                            type="text"
                                            name="Occupation"
                                            className="form-control"
                                            value={customer.Occupation}
                                            onChange={handleChange}
                                            placeholder="Occupation"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h5 className="mb-3">Contact details</h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="Email"
                                            className="form-control"
                                            value={customer.Email}
                                            onChange={handleChange}
                                            placeholder="email@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            name="Password"
                                            className="form-control"
                                            value={customer.Password}
                                            onChange={handleChange}
                                            placeholder="Enter Password"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Mobile Number</label>
                                        <input
                                            type="tel"
                                            name="MobileNumber"
                                            className="form-control"
                                            value={customer.MobileNumber}
                                            onChange={handleChange}
                                            placeholder="1234567890"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h5 className="mb-3">Address</h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Address Line 1</label>
                                        <input
                                            type="text"
                                            name="AddressLine1"
                                            className="form-control"
                                            value={customer.AddressLine1}
                                            onChange={handleChange}
                                            placeholder="Street address"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Address Line 2</label>
                                        <input
                                            type="text"
                                            name="AddressLine2"
                                            className="form-control"
                                            value={customer.AddressLine2}
                                            onChange={handleChange}
                                            placeholder="Apartment, suite, etc."
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            name="City"
                                            className="form-control"
                                            value={customer.City}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">State</label>
                                        <input
                                            type="text"
                                            name="State"
                                            className="form-control"
                                            value={customer.State}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Postal Code</label>
                                        <input
                                            type="text"
                                            name="PostalCode"
                                            className="form-control"
                                            value={customer.PostalCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Country</label>
                                        <input
                                            type="text"
                                            name="Country"
                                            className="form-control"
                                            value={customer.Country}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h5 className="mb-3">Government details</h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">PAN Number</label>
                                        <input
                                            type="text"
                                            name="PanNumber"
                                            className="form-control"
                                            value={customer.PanNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Aadhaar Number</label>
                                        <input
                                            type="text"
                                            name="AadhaarNumber"
                                            className="form-control"
                                            value={customer.AadhaarNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Annual Income</label>
                                        <input
                                            type="number"
                                            name="AnnualIncome"
                                            className="form-control"
                                            value={customer.AnnualIncome}
                                            onChange={handleChange}
                                            placeholder="Annual income"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h5 className="mb-3">Nominee details</h5>
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Nominee Name</label>
                                        <input
                                            type="text"
                                            name="NomineeName"
                                            className="form-control"
                                            value={customer.NomineeName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Relationship</label>
                                        <input
                                            type="text"
                                            name="NomineeRelationship"
                                            className="form-control"
                                            value={customer.NomineeRelationship}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Contact Number</label>
                                        <input
                                            type="tel"
                                            name="NomineeContactNumber"
                                            className="form-control"
                                            value={customer.NomineeContactNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg px-5"
                                >
                                    Register Customer
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

export default RegisterCustomer;