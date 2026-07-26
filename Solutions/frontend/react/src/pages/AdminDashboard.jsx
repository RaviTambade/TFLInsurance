import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminDashboard() {

    const navigate = useNavigate();

    const [customerCount, setCustomerCount] = useState(0);
    const [policyCount, setPolicyCount] = useState(0);
    const [userCount, setUserCount] =useState(0);

    useEffect(() => {

        loadCustomerCount();

    }, []);

    useEffect(() => {

        loadPolicyCount();

    }, []);

    useEffect(() => {

        loadUserCount();

    }, []);


    const loadCustomerCount = async () => {

        const response = await fetch(
            "http://localhost:5000/api/customers/count"
        );

        const data = await response.json();
          console.log(data); 
        setCustomerCount(data.count);
      
    };

    const loadPolicyCount = async () => {

        const response = await fetch(
            "http://localhost:5000/api/policies/count"
        );

        const data = await response.json();
          console.log(data); 
        setPolicyCount(data.count);
      };

      const loadUserCount = async () => {

        const response = await fetch(
            "http://localhost:5000/api/users/count"
        );

        const data = await response.json();
          console.log(data); 
        setUserCount(data.count);
      };

    return (

        <div className="container-fluid">

            {/* Header */}

            <div className="bg-primary text-white p-3">

                <h2>TFL Insurance Management System</h2>

                <h5>Welcome Admin</h5>

            </div>

                <div className="card shadow text-center h-100">

                    <div className="container mt-4">

                        <h3>Admin Dashboard</h3>

                        <hr />

                        <div className="row">

                            <div className="col-md-3">

                                <div className="card bg-success text-white">

                                    <button className="card bg-success text-white" onClick={() => navigate("/CustomerList")}>
                                        <h5>Total Customers </h5>
                                           <h2>{customerCount}</h2>
                                    </button>

                                    </div>

                            </div>

                            <div className="col-md-3">

                                <div className="card bg-warning text-dark">

                                    <button className="card bg-warning text-dark" onClick={() => navigate("/PolicyListForAdmin")}>
                                        <h5>Total Policies </h5>
                                           <h2>{policyCount}</h2>
                                    </button>

                                    </div>

                            </div>

                            <div className="col-md-3">

                                <div className="card bg-warning text-dark">

                                    <button className="card bg-warning text-dark" onClick={() => navigate("/UserListForAdmin")}>
                                        <h5>Total Users </h5>
                                           <h2>{userCount}</h2>
                                    </button>

                                    </div>

                            </div>

                            <div className="col-md-3">

                                <div className="card bg-danger text-white">

                                    <div className="card-body">

                                        <h5>Premium Collection</h5>

                                        <h2>₹35L</h2>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <br />

                       

                        </div>

                    </div>

                </div>

    );
}
export default AdminDashboard;