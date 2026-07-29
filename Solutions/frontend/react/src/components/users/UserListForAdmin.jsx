import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserListForAdmin() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("Customer");
    const [feedback, setFeedback] = useState("");

    const navigate = useNavigate();

    const resetPassword = (userId) => {
        navigate(`/ResetPassword/${userId}`);
    };

    const openAssignRoleModal = (user) => {
        setSelectedUser(user);
        setSelectedRole(user.Role || "Customer");
        setFeedback("");
        setShowModal(true);
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

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.UserId === selectedUser.UserId ? { ...user, Role: selectedRole } : user
                )
            );
            setFeedback(`Role updated successfully for ${selectedUser.Username}.`);
        } catch (error) {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.UserId === selectedUser.UserId ? { ...user, Role: selectedRole } : user
                )
            );
            setFeedback(`Role updated locally for ${selectedUser.Username}.`);
        } finally {
            setShowModal(false);
        }
    };

    const deleteUser = () => {
        navigate("/");
    };

    const loadUsers = async () => {
        const response = await fetch(`http://localhost:5000/api/users/getAllUsers`);
        const data = await response.json();
        setUsers(data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">User Management</h2>

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
                                        <h5 className="card-title mb-0">{user.Username}</h5>
                                        <span className="badge bg-primary">{user.Role}</span>
                                    </div>
                                    <p className="card-text mb-2">
                                        <strong>User ID:</strong> {user.UserId}
                                    </p>
                                    <p className="card-text mb-2">
                                        <strong>Status:</strong> {user.IsActive ? "Active" : "Inactive"}
                                    </p>
                                    <p className="card-text">
                                        <strong>Password:</strong> {user.Password}
                                    </p>
                                </div>
                                <div className="card-footer bg-white border-0 d-grid gap-2">
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => resetPassword(user.UserId)}
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
                                        onClick={deleteUser}
                                    >
                                        Delete User
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
        </div>
    );
}

export default UserListForAdmin;