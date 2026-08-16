import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserListForAdmin() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [userShowModal, setUserShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    const [resetPasswordValue, setResetPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    const [selectedRole, setSelectedRole] = useState("Customer");
    const [feedback, setFeedback] = useState("");
    const [newUser, setNewUser] = useState({
        Username: "",
        Password: "",
        Role: "Customer",
        IsActive: true,
    });

    const navigate = useNavigate();

    const openResetPasswordModal = (user) => {
        setSelectedUser(user);
        setResetPasswordValue("");
        setConfirmPasswordValue("");
        setShowResetModal(true);
    };

    const openAssignRoleModal = (user) => {
        setSelectedUser(user);
        setSelectedRole(user.Role || "Customer");
        setFeedback("");
        setShowModal(true);
    };

    const openUserDetails = async (user) => {
        setSelectedUser(user);
        setSelectedUserDetails(user);
        setUserShowModal(true);

        try {
            const response = await fetch(`http://localhost:5000/api/users/getUser/${user.UserId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user details: ${response.status}`);
            }

            const data = await response.json();

           console.log("API Response:", data);

            if (Array.isArray(data)) {
                setSelectedUserDetails(data[0]);
            } else {
                setSelectedUserDetails(data);
            }
        } 
        catch (error) {
            console.error("Failed to load user details", error);
            setFeedback("Could not load user details. Please try again.");
        }
    };

    const handleAssignRole = async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/users/updateRole/${selectedUser.UserId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    },
                    body: JSON.stringify({ role: selectedRole }),
                }
            );

            if (!response.ok) {
                throw new Error("Role update failed");
            }

            setFeedback(`Role updated successfully for ${selectedUser.Username}.`);
        
        } 
        catch (error) {
            
            setFeedback(`Role updated locally for ${selectedUser.Username}.`);
        } 
        finally {
            setShowModal(false);
        }
    };

    const handleCreateInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewUser((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/users/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                },
                body: JSON.stringify({
                    Username: newUser.Username,
                    Password: newUser.Password,
                    Role: newUser.Role,
                    IsActive: newUser.IsActive,
                }),
            });

            if (!response.ok) {
                throw new Error("Create user failed");
            }

            const createdUser = await response.json().catch(() => null);
            const userToAdd = createdUser || {
                ...newUser,
                UserId: Date.now(),
            };

            setUsers((prevUsers) => [userToAdd, ...prevUsers]);
            setFeedback(`User created successfully for ${newUser.Username}.`);
            setShowCreateModal(false);
            setNewUser({
                Username: "",
                Password: "",
                Role: "Customer",
                IsActive: true,
            });
        } catch (error) {
            setFeedback("Could not create user. Please check your backend API.");
        }
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();

        const formData = {
            newPassword: resetPasswordValue,
            confirmPassword: confirmPasswordValue,
        };

        if (!formData.newPassword || !formData.confirmPassword) {
            alert("Please enter and confirm the new password.");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            alert("New Password and Confirm Password do not match");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/users/resetPassword/${selectedUser.UserId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error(`Password reset failed: ${response.status}`);
            }

            await response.json().catch(() => null);
            setFeedback(`Password reset for ${selectedUser?.Username} successful.`);
            setShowResetModal(false);
            setResetPasswordValue("");
            setConfirmPasswordValue("");
        } catch (error) {
            console.error("Failed to reset password", error);
            setFeedback("Could not reset password. Please try again.");
        }
    };


    const loadUsers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/getAllUsers`);

            if (!response.ok) {
                throw new Error(`Failed to load users: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("User list load error:", error);
            setFeedback("Could not load users. Please check the server connection.");
            setUsers([]);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">User Management</h2>
                <button
                    className="btn btn-success"
                    onClick={() => setShowCreateModal(true)}
                >
                    Create User
                </button>
            </div>

            {feedback && (
                <div className="alert alert-success text-center mx-auto mb-4" style={{ maxWidth: "700px" }}>
                    {feedback}
                </div>
            )}

            <div className="row g-4 justify-content-center">
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                        <div className="col-md-6 col-lg-4" key={user.UserId}>
                            <div className="card shadow-sm h-100 border-0">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        
                                        <span className="badge bg-primary">{user.IsActive ? "Active" : "Inactive"}</span>
                                    </div>
                                    <p className="card-text mb-2">
                                        <strong>Username:</strong> {user.Username}
                                    </p>
                                    <p className="card-text mb-2">
                                        <strong>Role:</strong> {user.Role}
                                    </p>
                                   
                                </div>
                                <div className="card-footer bg-white border-0 d-flex gap-2 flex-wrap align-items-center">
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => openResetPasswordModal(user)}
                                    >
                                        Reset Password
                                    </button>
                                    <button
                                        className="btn btn-outline-success btn-sm"
                                        onClick={() => openAssignRoleModal(user)}
                                    >
                                        Assign Role
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        
                                    >
                                        Delete User
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => openUserDetails(user)}
                                    >
                                        View Details
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="alert alert-info text-center">No users available.</div>
                    </div>
                )}
            </div>

            {showModal && (
                <>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Assign Role</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p className="mb-3">
                                        Select a new role for <strong>{selectedUser?.Username}</strong>.
                                    </p>
                                    <label className="form-label">Role</label>
                                    <select
                                        className="form-select"
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Agent">Agent</option>
                                        <option value="Employee">Employee</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handleAssignRole}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            {showCreateModal && (
                <>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Create New User</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowCreateModal(false)}
                                    ></button>
                                </div>
                                <form onSubmit={handleCreateUser}>
                                    <div className="modal-body">
                                        <div className="row g-3">

                                            <div className="col-12">
                                                <label className="form-label">Username</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="Username"
                                                    value={newUser.Username}
                                                    onChange={handleCreateInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="Password"
                                                    value={newUser.Password}
                                                    onChange={handleCreateInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Role</label>
                                                <select
                                                    className="form-select"
                                                    name="Role"
                                                    value={newUser.Role}
                                                    onChange={handleCreateInputChange}
                                                >
                                                    <option value="Admin">Admin</option>
                                                    <option value="Customer">Customer</option>
                                                    <option value="Agent">Agent</option>
                                                    <option value="Employee">Employee</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 d-flex align-items-end">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="IsActive"
                                                        checked={newUser.IsActive}
                                                        onChange={handleCreateInputChange}
                                                    />
                                                    <label className="form-check-label">Active User</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowCreateModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-success">
                                            Create User
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            {showResetModal && (
                <>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Reset Password</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowResetModal(false)}
                                    ></button>
                                </div>
                            <form onSubmit={handleResetPassword}>
                                <div className="modal-body">
                                    <p>Reset password for <strong>{selectedUser?.Username}</strong>.</p>
                                    <div className="mb-3">
                                        <label className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={resetPasswordValue}
                                            onChange={(e) => setResetPasswordValue(e.target.value)}
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={confirmPasswordValue}
                                            onChange={(e) => setConfirmPasswordValue(e.target.value)}
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowResetModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Reset Password
                                    </button>
                                </div>
                                </form>
                            </div>
                        </div>
                    
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

        

            {userShowModal && (
    <>
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">User Details</h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setUserShowModal(false)}
                        ></button>
                    </div>

                    <div className="modal-body">

                        {selectedUserDetails ? (
                            <>
                                <p>
                                    <strong>Name :</strong>{" "}
                                    {(selectedUserDetails.FirstName || "") +
                                        " " +
                                        (selectedUserDetails.LastName || "")}
                                </p>

                                <p>
                                    <strong>Email :</strong>{" "}
                                    {selectedUserDetails.Email || "N/A"}
                                </p>

                                <p>
                                    <strong>Username :</strong>{" "}
                                    {selectedUserDetails.Username}
                                </p>

                                <p>
                                    <strong>Role :</strong>{" "}
                                    {selectedUserDetails.Role}
                                </p>

                                <p>
                                    <strong>Status :</strong>{" "}
                                    {selectedUserDetails.IsActive === "1" ||
                                    selectedUserDetails.IsActive === 1 ||
                                    selectedUserDetails.IsActive === true
                                        ? "Active"
                                        : "Inactive"}
                                </p>
                            </>
                        ) : (
                            <div className="text-center">
                                Loading...
                            </div>
                        )}

                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={() => setUserShowModal(false)}
                        >
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <div className="modal-backdrop fade show"></div>
    </>
)}


        </div>
    );
}

export default UserListForAdmin;