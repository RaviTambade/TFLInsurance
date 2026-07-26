import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onUserLogin = async (e) => {
        e.preventDefault();

        const user = {
            Username: username,
            Password: password
        };

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                }
            );

            const result = await response.json();

            if (response.ok) {

                localStorage.setItem("token", result.token);
                localStorage.setItem("refreshToken", result.refreshToken);
                localStorage.setItem("role", result.Role);

                alert("Login Successful");

                // Navigate according to role
                switch (result.role) {

                    case "Admin":
                        navigate("/AdminDashboard");
                        break;

                    case "Employee":
                        navigate("/employee");
                        break;

                    case "Agent":
                        navigate("/agent");
                        break;

                    case "Customer":
                        navigate("/CustomerDashboard");
                        break;

                    default:
                        alert("Invalid Role");
                        navigate("/");
                }

            } else {
                alert(result.message);
            }

        } catch (error) {
            console.log(error);
            alert("Server Error");
        }
    };

    return (
         <div className="container mt-5 mb-5">

        <div className="row justify-content-center">

            <div className="col-lg-8">

                <div className="card shadow-lg">

                    <div className="card-header bg-primary text-white text-center">
                        <h3>Customer Login</h3>
                    </div>

                    <div className="card-body">

            <form onSubmit={onUserLogin}>

                <div>
                    <label>Username</label>
                    <br />

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit"  className="btn btn-success px-5">
                    Login
                </button>

            </form>

        </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default Login;