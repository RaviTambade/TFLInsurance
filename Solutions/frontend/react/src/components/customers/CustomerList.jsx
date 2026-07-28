

import React from "react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CustomerList() {

    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();

    const UpdateProfile = () => {
        navigate("/UpdateProfile");
    };

    const activeCustomers = () => {
        console.log("Active customers filter clicked");
    };

    const deactiveCustomers = () => {
        console.log("Deactive customers filter clicked");
    };
   
    const loadCustomers = async () => {

        const response = await fetch(
            `http://localhost:5000/api/customers/getAllCustomers`
        );

        const data = await response.json();

        setCustomers(data);
        console.log(data);

    };

     useEffect(() => {
        loadCustomers();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Customer Directory</h2>

            <div className="d-flex justify-content-center gap-2 mb-4">
                <button className="btn btn-outline-primary" onClick={activeCustomers}>
                    Active Customers
                </button>
                <button className="btn btn-outline-secondary" onClick={deactiveCustomers}>
                    DeActive Customers
                </button>
            </div>

            {Array.isArray(customers) && customers.length > 0 ? (
                <div className="row gx-4 gy-4">
                    {customers.map((customer) => (
                        <div className="col-12 col-lg-6" key={customer.CustomerId}>
                            <div className="card shadow-sm h-100">
                                <div className="card-header d-flex justify-content-between align-items-start">
                                    <div>
                                        <h5 className="card-title mb-1">
                                            {customer.FirstName} {customer.LastName}
                                        </h5>
                                        <p className="card-subtitle text-muted mb-0">
                                            {customer.CustomerCode}
                                        </p>
                                    </div>
                                    <span className={`badge ${customer.IsActive ? 'bg-success' : 'bg-secondary'}`}>
                                        {customer.IsActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-md-6 mb-3">
                                            <h6 className="text-uppercase text-muted fs-7">Personal</h6>
                                            <p className="mb-1"><strong>DOB:</strong> {customer.DateOfBirth}</p>
                                            <p className="mb-1"><strong>Gender:</strong> {customer.Gender}</p>
                                            <p className="mb-1"><strong>Occupation:</strong> {customer.Occupation || 'N/A'}</p>
                                            <p className="mb-1"><strong>Annual Income:</strong> {customer.AnnualIncome || 'N/A'}</p>
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <h6 className="text-uppercase text-muted fs-7">Contact</h6>
                                            <p className="mb-1"><strong>Email:</strong> {customer.Email}</p>
                                            <p className="mb-1"><strong>Phone:</strong> {customer.MobileNumber}</p>
                                            <p className="mb-1"><strong>City:</strong> {customer.City}, {customer.State}</p>
                                            <p className="mb-1"><strong>Postal Code:</strong> {customer.PostalCode}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 mb-3">
                                            <h6 className="text-uppercase text-muted fs-7">Address</h6>
                                            <p className="mb-1">{customer.AddressLine1}</p>
                                            {customer.AddressLine2 && <p className="mb-1">{customer.AddressLine2}</p>}
                                            <p className="mb-1"><strong>Country:</strong> {customer.Country}</p>
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <h6 className="text-uppercase text-muted fs-7">Nominee</h6>
                                            <p className="mb-1"><strong>Name:</strong> {customer.NomineeName}</p>
                                            <p className="mb-1"><strong>Relationship:</strong> {customer.NomineeRelationship}</p>
                                            <p className="mb-1"><strong>Contact:</strong> {customer.NomineeContactNumber}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 mb-3">
                                            <h6 className="text-uppercase text-muted fs-7">Policy Summary</h6>
                                            <p className="mb-1"><strong>Purchased:</strong> {customer.TotalPoliciesPurchased || 0}</p>
                                            <p className="mb-1"><strong>Registered:</strong> {customer.RegistrationDate}</p>
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <h6 className="text-uppercase text-muted fs-7">IDs</h6>
                                            <p className="mb-1"><strong>PAN:</strong> {customer.PANNumber}</p>
                                            <p className="mb-1"><strong>Aadhar:</strong> {customer.AdharNumber}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-white border-0 d-flex justify-content-end">
                                    <button className="btn btn-primary btn-sm" onClick={UpdateProfile}>
                                        Update Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info text-center">No customers found.</div>
            )}
        </div>
    );
}


export default CustomerList;