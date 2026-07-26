

import React from "react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CancelPolicy() {

    const [policies, setPolicies] = useState({});

    const customerId = localStorage.getItem("customerId");

   // const navigate = useNavigate();

  
   
 const deletePolicy = async (policyId) => {


                        const response = await fetch(
                            `http://localhost:5000/api/policies/${policyId}`,
                            {
                                method: "DELETE"
                            }
                        );

                            const result = await response.json();

                            alert(result.message);

                            loadPolicies();   // Refresh table
                        };

                        useEffect(() => {
                            loadPolicies();
                        }, []);


    const loadPolicies = async () => {

                                    const response = await fetch(
                                        `http://localhost:5000/api/policies/getPolicyByCustomerId/${customerId}`
                                    );

                                    const data = await response.json();

                                    setPolicies(data);
                                };


                return (

                            <div className="container mt-5">

                            <h2 className="text-center mb-4">
                                My Policies
                            </h2>

                            <div className="row justify-content-center">

                                <div className="col-md-8">

                                    <table className="table table-bordered table-striped shadow">
                                        
                                        <thead>
                                            <tr>
                                                <th>PolicyNumber</th>
                                                <th>CustomerId</th>
                                                <th>PolicyType</th>
                                                <th>PolicyAmount</th>
                                                <th>IsRenewed</th>
                                            </tr>
                                        </thead>

                                <tbody>
                                    {Array.isArray(policies) &&
                                                policies.map((policy) => (
                                                <React.Fragment key={policy.PolicyId}>

                                                    
                                                        
                                                        <tr>
                                                        <td>{policy.PolicyNumber}</td>
                                                        <td>{policy.CustomerId}</td>
                                                        <td>{policy.PolicyType}</td>
                                                        <td>{policy.PolicyAmount}</td>
                                                        <td>{policy.IsRenewed}</td>
                        
                                                        <td>
                                                                <button className="btn btn-primary"
                                                                    onClick={() => deletePolicy(policy.PolicyId)}>
                                                                    Cancel Policy
                                                                </button>
                                                            </td>  

                                                        </tr>                              
                                                  
                                                </React.Fragment>
                                                ))
                                            }
                                </tbody>
                                        </table>

                                
                                    <div className="text-center mt-3">

                            


                        </div>

                        </div>
                        </div>
                                

                                </div>
                            );
                        }


export default CancelPolicy;