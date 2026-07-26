

import React from "react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function PolicyListInPremium() {

    const [policies, setPolicies] = useState([]);

    const customerId = localStorage.getItem("customerId");

    const navigate = useNavigate();

 

   
       const loadpolicies = async () => {
   
           const response = await fetch(
               `http://localhost:5000/api/policies/getPolicyByCustomerId/${customerId}`
           );
   
           const data = await response.json();
   
           setPolicies(data);
           console.log(data);
   
       };
   
        // eslint-disable-next-line react-hooks/exhaustive-deps
        
        useEffect(() => {
           loadpolicies();
       }, []);

    

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

             {Array.isArray(policies) &&
                        policies.map((policy) => (
                           <React.Fragment key={policy.PolicyId}>

                            <tbody>
                                 
                                <tr>
                                 <td>{policy.PolicyNumber}</td>
                                <td>{policy.CustomerId}</td>
                                <td>{policy.PolicyType}</td>
                                <td>{policy.PolicyAmount}</td>
                                <td>{policy.IsRenewed}</td>
  
                                <td>
                                        <button className="btn btn-primary" onClick={() => {
                                                    navigate("/PayPremium", {
                                                        state: { policy: policy }
                                                    });
                                                }}
                                            >
                                                Pay Premium
                                            </button>
                                    </td>  

                                </tr>                              
                        </tbody>    
                           </React.Fragment>
                        ))
                    }

                 </table>

        
               <div className="text-center mt-3">

    


</div>

</div>
</div>
          

        </div>
    );
}


export default PolicyListInPremium;