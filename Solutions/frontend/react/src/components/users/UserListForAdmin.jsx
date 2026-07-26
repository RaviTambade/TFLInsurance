

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserListForAdmin() {

    const [users, setUsers] = useState([]);
   
    const navigate = useNavigate();

    const resetPassword = (userId) => {
        navigate(`/ResetPassword/${userId}`);
    };

     const assignRole = () => {
        navigate("/");
    };

    const deleteUser=()=>{
        navigate("/");
    }

    const loadUsers = async () => {

        const response = await fetch(
            `http://localhost:5000/api/users/getAllUsers`
        );

        const data = await response.json();
        setUsers(data);
        console.log(data);

    };

     useEffect(() => {
        loadUsers();
    }, []);

    return (

       <div className="container mt-5">

    <h2 className="text-center mb-4">
        Users List
    </h2>

    <div className="row justify-content-center">

        <div className="col-md-8">

            <table className="table table-bordered table-striped shadow">
                
                 <thead>
                    <tr>
                        <th>UserId</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>ReferenceId</th>
                        <th>IsActive</th>
                    </tr>
                </thead>

             {Array.isArray(users) &&
                        users.map((user) => (
                           <React.Fragment key={user.UserId}>

                            <tbody>
                                 
                                <tr>

                                <td>{user.UserId}</td>
                                <td>{user.Username}</td>
                                <td>{user.Password}</td>
                                <td>{user.Role}</td>
                                <td>{user.ReferenceId}</td>
                                <td>{user.IsActive}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => resetPassword(user.UserId)}
                                    >
                                        Reset Password
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={assignRole}
                                    >
                                        Assign Role
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={deleteUser}
                                    >
                                        Delete User
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


export default UserListForAdmin;