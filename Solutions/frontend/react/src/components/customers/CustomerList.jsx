

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

    <h2 className="text-center mb-4">
        Customers List
    </h2>

    <div className="row justify-content-center">

        <div className="col-md-8">

            <table className="table table-bordered table-striped shadow">
                
                 <thead>
                    <tr>
                        <th>CustomerId</th>
                        <th>Customer Code</th>
                        <th>First name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Address Line 1</th>
                        <th>Address Line 2</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                        <th>Country</th>
                        <th>PAN Number</th>
                        <th>Adhar Number</th>
                        <th>Occupation </th>
                        <th>Annual Income</th>
                        <th>Nominee Name</th>
                        <th>Nominee Relationship</th>
                        <th>Nominee Contact Number</th>
                        <th>Registration Date</th>
                        <th>IsActive</th>
                        <th>Total Policies Purchased</th>
                    </tr>
                </thead>

                        <tbody>
                            {Array.isArray(customers) && customers.length > 0 ? (
                                customers.map((customer) => (
                                    <tr
                                        key={customer.CustomerId }
                                    >
                                        <td>{customer.CustomerId}</td>
                                        <td>{customer.CustomerCode}</td>
                                        <td>{customer.FirstName}</td>
                                        <td>{customer.LastName}</td>
                                        <td>{customer.DateOfBirth}</td>
                                        <td>{customer.Gender}</td>
                                        <td>{customer.Email}</td>
                                        <td>{customer.MobileNumber}</td>
                                        <td>{customer.AddressLine1}</td>
                                        <td>{customer.AddressLine2}</td>
                                        <td>{customer.City}</td>
                                        <td>{customer.State}</td>
                                        <td>{customer.PostalCode}</td>
                                        <td>{customer.Country}</td>
                                        <td>{customer.PANNumber}</td>
                                        <td>{customer.AdharNumber}</td>
                                        <td>{customer.Occupation}</td>
                                        <td>{customer.AnnualIncome}</td>
                                        <td>{customer.NomineeName}</td>
                                        <td>{customer.NomineeRelationship}</td>
                                        <td>{customer.NomineeContactNumber}</td>
                                        <td>{customer.RegistrationDate}</td>
                                        <td>{customer.IsActive ? "Yes" : "No"}</td>
                                        <td>{customer.TotalPoliciesPurchased}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={UpdateProfile}
                                            >
                                                Update Profile
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="27" className="text-center">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-center gap-2 mt-3">
                        <button className="btn btn-primary" onClick={activeCustomers}>
                            Active Customers
                        </button>
                        <button className="btn btn-primary" onClick={deactiveCustomers}>
                            DeActive Customers
                        </button>
                    </div>

        
               <div className="text-center mt-3">

    


</div>

</div>
</div>
          

        </div>
    );
}


export default CustomerList;