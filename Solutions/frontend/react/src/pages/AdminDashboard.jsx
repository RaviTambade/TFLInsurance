import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

    const navigate = useNavigate();

    const [customerCount, setCustomerCount] = useState(0);
    const [policyCount, setPolicyCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);


    // Load Customer Count
    useEffect(() => {
        loadCustomerCount();
    }, []);


    // Load Policy Count
    useEffect(() => {
        loadPolicyCount();
    }, []);


    // Load User Count
    useEffect(() => {
        loadUserCount();
    }, []);


    // Load Notifications
    useEffect(() => {
        loadNotifications();
    }, []);


    const loadCustomerCount = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/customers/count"
            );

            const data = await response.json();

            setCustomerCount(data.count);

        } catch (error) {
            console.error("Error loading customer count:", error);
        }
    };


    const loadPolicyCount = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/policies/count"
            );

            const data = await response.json();

            setPolicyCount(data.count);

        } catch (error) {
            console.error("Error loading policy count:", error);
        }
    };


    const loadUserCount = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/users/count"
            );

            const data = await response.json();

            setUserCount(data.count);

        } catch (error) {
            console.error("Error loading user count:", error);
        }
    };


    const loadNotifications = async () => {
        try {

            const response = await fetch(
                "http://localhost:5000/api/notifications"
            );

            const data = await response.json();

            console.log("Notifications:", data);

            if (data.success) {

                setNotifications(data.notifications);

                const unread = data.notifications.filter(
                    notification => Number(notification.IsRead) === 0
                ).length;

                setUnreadCount(unread);
            }

        } catch (error) {
            console.error("Error loading notifications:", error);
        }
    };


    return (

        <div className="container-fluid">

            {/* ================= HEADER ================= */}

            <div className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">

                <div>

                    <h2 className="mb-1">
                        TFL Insurance Management System
                    </h2>

                    <h5 className="mb-0">
                        Welcome Admin
                    </h5>

                </div>


                {/* ================= NOTIFICATION ================= */}

                <div className="position-relative">

                    <button
                        type="button"
                        className="btn btn-light position-relative"
                        onClick={() =>
                            setShowNotifications(!showNotifications)
                        }
                    >

                        🔔

                        {unreadCount > 0 && (

                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">

                                {unreadCount}

                            </span>

                        )}

                    </button>


                    {/* Notification Dropdown */}

                    {showNotifications && (

                        <div
                            className="position-absolute end-0 mt-2 bg-white text-dark shadow rounded"
                            style={{
                                width: "320px",
                                maxHeight: "400px",
                                overflowY: "auto",
                                zIndex: 1000
                            }}
                        >

                            {/* Notification Header */}

                            <div className="p-2 border-bottom d-flex justify-content-between align-items-center">

                                <strong>
                                    Notifications
                                </strong>

                                <button
                                    className="btn btn-sm btn-link p-0"
                                    onClick={() =>
                                        setUnreadCount(0)
                                    }
                                >
                                    Mark all read
                                </button>

                            </div>


                            {/* Notification List */}

                            {notifications.length === 0 ? (

                                <div className="p-3 text-center text-muted small">

                                    No notifications

                                </div>

                            ) : (

                                notifications.map((notification) => (

                                    <div
                                        key={notification.NotificationId}
                                        className="px-3 py-2 border-bottom"
                                    >

                                        <div className="fw-semibold small">

                                            {notification.Type === "Agent"}
                                            {notification.Type === "SalesPerson"}
                                            {notification.Type === "AccountPerson"}

                                            {notification.Title}

                                        </div>


                                        <div className="text-muted small">

                                            {notification.Message}

                                        </div>


                                        <small className="text-secondary">

                                            {new Date(
                                                notification.CreatedAt
                                            ).toLocaleString()}

                                        </small>

                                    </div>

                                ))

                            )}


                            {/* View All */}

                            <div className="p-2 text-center">

                                <button
                                    className="btn btn-sm btn-link"
                                    onClick={() =>
                                        navigate("/Notifications")
                                    }
                                >

                                    View All Notifications →

                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>


            {/* ================= DASHBOARD ================= */}

            <div className="card shadow text-center h-100">

                <div className="container mt-4">

                    <h3>
                        Admin Dashboard
                    </h3>

                    <hr />


                    <div className="row">


                        {/* Customer Card */}

                        <div className="col-md-3 mb-3">

                            <div className="card bg-maroon-soft text-dark">

                                <button
                                    type="button"
                                    className="btn btn-link-maroon text-start w-100 p-4"
                                    onClick={() =>
                                        navigate("/CustomerList")
                                    }
                                >

                                    <h5>
                                        Total Customers
                                    </h5>

                                    <h2>
                                        {customerCount}
                                    </h2>

                                </button>

                            </div>

                        </div>


                        {/* Policy Card */}

                        <div className="col-md-3 mb-3">

                            <div className="card bg-maroon-light text-dark">

                                <button
                                    type="button"
                                    className="btn btn-link-maroon text-start w-100 p-4"
                                    onClick={() =>
                                        navigate("/PolicyListForAdmin")
                                    }
                                >

                                    <h5>
                                        Total Policies
                                    </h5>

                                    <h2>
                                        {policyCount}
                                    </h2>

                                </button>

                            </div>

                        </div>


                        {/* User Card */}

                        <div className="col-md-3 mb-3">

                            <div className="card bg-maroon-light text-dark">

                                <button
                                    type="button"
                                    className="btn btn-link-maroon text-start w-100 p-4"
                                    onClick={() =>
                                        navigate("/UserListForAdmin")
                                    }
                                >

                                    <h5>
                                        Total Users
                                    </h5>

                                    <h2>
                                        {userCount}
                                    </h2>

                                </button>

                            </div>

                        </div>


                        {/* Premium Card */}

                        <div className="col-md-3 mb-3">

                            <div className="card bg-maroon-strong text-white">

                                <div className="card-body p-4">

                                    <h5>
                                        Premium Collection
                                    </h5>

                                    <h2>
                                        ₹35L
                                    </h2>

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