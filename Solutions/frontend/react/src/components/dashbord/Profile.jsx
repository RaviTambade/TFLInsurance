

import React from "react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {

    const [Profile, setProfile] = useState({});

    const customerId = localStorage.getItem("customerId");

    const navigate = useNavigate();

   const updateProfile = (e) => {

        navigate("/UpdateProfile");

    };
   
    const purchasePolicy = (e) => {

        navigate("/PurchasePolicy");

    };


    const loadCustomer = async () => {

        const response = await fetch(
            `http://localhost:5000/api/customers/${customerId}`
        );

        const data = await response.json();

        setProfile(data);
        console.log(data);

    };

     useEffect(() => {
        loadCustomer();
    }, []);

    

    

    return (

       <div className="container mt-5">

    <h2 className="text-center mb-4">
        My Profile
    </h2>

    <div className="row justify-content-center">

        <div className="col-md-8">

            <table className="table table-bordered table-striped shadow">
                
                 
             {Array.isArray(Profile) &&
                        Profile.map((Profile) => (
                           <React.Fragment key={Profile.CustomerId}>

                            <tbody>
                                 

                                         <tr>
                                            <th>FirstName</th>
                                            <td>{Profile.FirstName}</td>
                                        </tr>
                                        <tr>
                                            <th>LastName</th>
                                            <td>{Profile.LastName}</td>
                                        </tr>
                                        <tr>
                                            <th>DateOfBirth</th>
                                            <td>{Profile.DateOfBirth}</td>
                                        </tr>
                                        <tr>
                                            <th>Gender</th>
                                            <td>{Profile.Gender}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{Profile.Email}</td>
                                        </tr>
                                        <tr>
                                            <th>MobileNumber</th>
                                            <td>{Profile.MobileNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>AddressLine1</th>
                                            <td>{Profile.AddressLine1}</td>
                                        </tr>
                                        <tr>
                                            <th>AddressLine2</th>
                                            <td>{Profile.AddressLine2}</td>
                                        </tr>
                                        <tr>
                                            <th>City</th>
                                            <td>{Profile.City}</td>
                                        </tr>
                                        <tr>
                                            <th>State</th>
                                            <td>{Profile.State}</td>
                                        </tr>
                                        <tr>
                                            <th>Country</th>
                                            <td>{Profile.Country}</td>
                                        </tr>
                                        <tr>
                                            <th>PanNumber</th>
                                            <td>{Profile.PanNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>AadhaarNumber</th>
                                            <td>{Profile.AadhaarNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Occupation</th>
                                            <td>{Profile.Occupation}</td>
                                        </tr>
                                        <tr>
                                            <th>AnnualIncome</th>
                                            <td>{Profile.AnnualIncome}</td>
                                        </tr>
                                        <tr>
                                            <th>NomineeName</th>
                                            <td>{Profile.NomineeName}</td>
                                        </tr>
                                        <tr>
                                            <th>NomineeRelationship</th>
                                            <td>{Profile.NomineeRelationship}</td>
                                        </tr>
                                        <tr>
                                            <th>NomineeContactNumber</th>
                                            <td>{Profile.NomineeContactNumber}</td>
                                        </tr>

                                       

                        </tbody>    
                           </React.Fragment>
                        ))
                    }



            </table>

        
               <div className="text-center mt-3">

    <button
        className="btn btn-primary"
        onClick={updateProfile}
    >
        Update Profile
    </button>

    <button
        className="btn btn-primary"
        onClick={purchasePolicy}
    >
        Purchase Policy
    </button>

</div>

</div>
</div>
          

        </div>
    );
}


export default Profile;