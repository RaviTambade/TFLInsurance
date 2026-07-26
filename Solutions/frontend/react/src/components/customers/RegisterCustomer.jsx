import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function RegisterCustomer() {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState({});

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    };

   
    
     const saveCustomer = async (e) => {      //Event handling Logic
        e.preventDefault();
         console.log(customer);

      
     try {
            const response = await fetch(
                "http://localhost:5000/api/customers/addCustomer",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(customer)
                }
            );

           if (response.ok) {

                const result = await response.json();

                console.log(result);
                
                localStorage.setItem("customerId", result.CustomerId);

                alert("Customer Registered Successfully");
                
                navigate("/CustomerDashboard");
            }
            else 
                {
                alert("Failed to Register Customer");
                }
            }
            catch (error) {
                console.error(error);
                alert("Error occurred");
            }
    };


   return (
    <div className="container mt-5 mb-5">

        <div className="row justify-content-center">

            <div className="col-lg-8">

                <div className="card shadow-lg">

                    <div className="card-header bg-primary text-white text-center">
                        <h3>Customer Registration</h3>
                    </div>

                    <div className="card-body">

                        <form onSubmit={saveCustomer}>

                            <table className="table table-bordered align-middle">

                                <tbody>

                                    <tr>
                                        <th width="35%">Customer Code</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="CustomerCode"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>First Name</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="FirstName"
                                                className="form-control"
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
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Date Of Birth</th>
                                        <td>
                                            <input
                                                type="date"
                                                name="DateOfBirth"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Gender</th>
                                        <td>
                                            <select
                                                name="Gender"
                                                className="form-select"
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Gender</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Email</th>
                                        <td>
                                            <input
                                                type="email"
                                                name="Email"
                                                className="form-control"
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
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>PAN Number</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="PanNumber"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Aadhaar Number</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="AadhaarNumber"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Occupation</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="Occupation"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Annual Income</th>
                                        <td>
                                            <input
                                                type="number"
                                                name="AnnualIncome"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Nominee Name</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="NomineeName"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Nominee Relationship</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="NomineeRelationship"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Nominee Contact Number</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="NomineeContactNumber"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="2" className="text-center">

                                            <button
                                                type="submit"
                                                className="btn btn-success px-5"
                                            >
                                                Register Customer
                                            </button>

                                        </td>
                                    </tr>

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

export default RegisterCustomer;