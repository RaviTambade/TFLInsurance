import React, { useEffect, useState } from "react";

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);

    const [purchasePolicy, setPurchasePolicy] = useState({
        CustomerId: "",
        PolicyType: "",
        PolicyAmount: "",
        IsRenewed: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    // ==========================================
    // GET PROFILE
    // ==========================================

    const fetchProfile = async () => {

        const userId = localStorage.getItem("userId");

        console.log("Profile UserId:", userId);

        if (!userId) {
            setFeedback("Please login first.");
            setLoading(false);
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:5000/api/users/customerProfileByUserId/${userId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load profile");
            }

            const data = await response.json();

            console.log("Profile API Response:", data);

            const profileData =
                Array.isArray(data) ? data[0] : data;

            console.log("FULL PROFILE:", profileData);

            console.log(
                "CUSTOMER ID FROM PROFILE:",
                profileData.CustomerId
            );

            setUser(profileData);

            // ==========================================
            // STORE CUSTOMER ID IN LOCAL STORAGE
            // ==========================================

            if (profileData.CustomerId) {

                localStorage.setItem(
                    "customerId",
                    profileData.CustomerId.toString()
                );

                console.log(
                    "CustomerId stored in localStorage:",
                    profileData.CustomerId
                );

                // Set purchase policy customer ID
                setPurchasePolicy(prev => ({
                    ...prev,
                    CustomerId: profileData.CustomerId
                }));

            } else {

                console.error(
                    "CustomerId is missing from Profile API response"
                );
            }

        } catch (error) {

            console.error(error);

            setFeedback(
                "Unable to load profile."
            );

        } finally {

            setLoading(false);
        }
    };

    // ==========================================
    // PROFILE FIELD CHANGE
    // ==========================================

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // ==========================================
    // PURCHASE POLICY FIELD CHANGE
    // ==========================================

    const handlePurchaseChange = (e) => {

        setPurchasePolicy({
            ...purchasePolicy,
            [e.target.name]: e.target.value
        });
    };

    // ==========================================
    // PURCHASE POLICY
    // ==========================================

    const savePolicy = async (e) => {

        e.preventDefault();

        try {

            // Get CustomerId from localStorage
            const customerId =
                localStorage.getItem("customerId");

            console.log(
                "CustomerId for policy:",
                customerId
            );

            // Check CustomerId
            if (!customerId) {

                alert(
                    "Customer ID not found. Please login again."
                );

                return;
            }

            // ==========================================
            // CREATE POLICY PAYLOAD
            // ==========================================

            const payload = {

                CustomerId: Number(customerId),

                PolicyType:
                    purchasePolicy.PolicyType,

                PolicyAmount:
                    purchasePolicy.PolicyAmount,

                IsRenewed:
                    purchasePolicy.IsRenewed
            };

            console.log(
                "Policy Payload:",
                payload
            );

            // ==========================================
            // POST POLICY
            // ==========================================

            const response = await fetch(
                `http://localhost:5000/api/policies/addPolicy/${customerId}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(payload)
                }
            );

            const result =
                await response.json();

            console.log(
                "Policy API Response:",
                result
            );

            // ==========================================
            // SUCCESS
            // ==========================================

            if (response.ok) {

                alert(
                    "Policy purchased successfully."
                );

                setShowPurchaseModal(false);

                // Reset form
                setPurchasePolicy({
                    CustomerId: customerId,
                    PolicyType: "",
                    PolicyAmount: "",
                    IsRenewed: ""
                });

            } else {

                console.error(
                    "Purchase failed:",
                    result
                );

                alert(
                    result.message ||
                    "Policy not purchased."
                );
            }

        } catch (error) {

            console.error(
                "Policy purchase error:",
                error
            );

            alert(
                "Policy not purchased."
            );
        }
    };

    // ==========================================
    // UPDATE PROFILE
    // ==========================================

    const updateProfile = async () => {

        const userId =
            localStorage.getItem("userId");

        try {

            const response = await fetch(
                `http://localhost:5000/api/customers/editProfilebyUserId/${userId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    },

                    body: JSON.stringify(user)
                }
            );

            const result =
                await response.json();

            if (response.ok) {

                alert(
                    "Profile Updated Successfully"
                );

                setEditMode(false);

                fetchProfile();

            } else {

                alert(
                    result.message ||
                    "Profile update failed"
                );
            }

        } catch (error) {

            console.error(error);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="container mt-5 text-center">

                <h4>
                    Loading...
                </h4>

            </div>
        );
    }

    // ==========================================
    // USER NOT FOUND
    // ==========================================

    if (!user) {

        return (
            <div className="container mt-5">

                <div className="alert alert-danger">

                    {feedback}

                </div>

            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow">

                        {/* HEADER */}

                        <div className="card-header bg-primary text-white">

                            <h3>
                                My Profile
                            </h3>

                        </div>

                        {/* BODY */}

                        <div className="card-body">

                            {/* FIRST NAME / LAST NAME / EMAIL */}

                            <div className="row mb-3">

                                <div className="col-md-4">

                                    <strong>First Name</strong>

                                    <p>{user.FirstName}</p>

                                </div>

                                <div className="col-md-4">

                                    <strong>Last Name</strong>

                                    <p>{user.LastName}</p>

                                </div>

                                <div className="col-md-4">

                                    <strong>Email</strong>

                                    <p>{user.Email}</p>

                                </div>

                            </div>

                            {/* NOMINEE */}

                            <div className="row mb-3">

                                <div className="col-md-4">

                                    <strong>Nominee Name</strong>

                                    {editMode ? (

                                        <input
                                            className="form-control"
                                            name="NomineeName"
                                            value={
                                                user.NomineeName || ""
                                            }
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>{user.NomineeName}</p>

                                    )}

                                </div>

                                <div className="col-md-4">

                                    <strong>Nominee Relationship</strong>

                                    {editMode ? (

                                        <input
                                            className="form-control"
                                            name="NomineeRelationship"
                                            value={
                                                user.NomineeRelationship || ""
                                            }
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>{user.NomineeRelationship}</p>

                                    )}

                                </div>

                                <div className="col-md-4">

                                    <strong>Nominee Contact</strong>

                                    {editMode ? (

                                        <input
                                            className="form-control"
                                            name="NomineeContactNumber"
                                            value={
                                                user.NomineeContactNumber || ""
                                            }
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>{user.NomineeContactNumber}</p>

                                    )}

                                </div>

                            </div>

                            {/* ADDRESS */}

                            <div className="row mb-3">

                                <div className="col-md-4">

                                    <strong>Address Line 1</strong>

                                    {editMode ? (

                                        <input
                                            className="form-control"
                                            name="AddressLine1"
                                            value={
                                                user.AddressLine1 || ""
                                            }
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>{user.AddressLine1}</p>

                                    )}

                                </div>

                                <div className="col-md-4">

                                    <strong>Address Line 2</strong>

                                    {editMode ? (

                                        <input
                                            className="form-control"
                                            name="AddressLine2"
                                            value={
                                                user.AddressLine2 || ""
                                            }
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>{user.AddressLine2}</p>

                                    )}

                                </div>

                                <div className="col-md-4">

                                    <strong>City</strong>

                                    {editMode ? (

                                        <input
                                            className="form-control"
                                            name="City"
                                            value={
                                                user.City || ""
                                            }
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>{user.City}</p>

                                    )}

                                </div>

                            </div>

                            {/* STATE / POSTAL / COUNTRY */}

                            <div className="row mb-3">

                                <div className="col-md-4">

                                    <strong>State</strong>

                                    {editMode ? (

                                        <input
                                            className="form-control"
                                            name="State"
                                            value={
                                                user.State || ""
                                            }
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>{user.State}</p>

                                    )}

                                </div>

                                <div className="col-md-4">

                                    <strong>Postal Code</strong>

                                    {editMode ? (

                                        <input
                                            className="form-control"
                                            name="PostalCode"
                                            value={
                                                user.PostalCode || ""
                                            }
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>{user.PostalCode}</p>

                                    )}

                                </div>

                                <div className="col-md-4">

                                    <strong>Country</strong>

                                    {editMode ? (

                                        <input
                                            className="form-control"
                                            name="Country"
                                            value={
                                                user.Country || ""
                                            }
                                            onChange={handleChange}
                                        />

                                    ) : (

                                        <p>{user.Country}</p>

                                    )}

                                </div>

                            </div>

                            {/* STATUS */}

                            <div className="row mb-3">

                                <div className="col-md-12">

                                    <strong>Status</strong>

                                    <p>{user.IsActive
                                            ? "Active"
                                            : "Inactive"}</p>

                                </div>

                            </div>

                        </div>

                        {/* FOOTER */}

                        <div className="card-footer d-flex justify-content-between">

                            {/* PURCHASE */}

                            <button
                                className="btn btn-success"
                                onClick={() =>
                                    setShowPurchaseModal(true)
                                }
                            >
                                Purchase Policy
                            </button>

                            {/* EDIT */}

                            {!editMode ? (

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        setEditMode(true)
                                    }
                                >
                                    Edit Profile
                                </button>

                            ) : (

                                <div>

                                    <button
                                        className="btn btn-success me-2"
                                        onClick={updateProfile}
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {

                                            setEditMode(false);

                                            fetchProfile();

                                        }}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

            {/* ==========================================
                PURCHASE POLICY MODAL
            ========================================== */}

            {showPurchaseModal && (

                <>

                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                    >

                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5 className="modal-title">
                                        Purchase Policy
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() =>
                                            setShowPurchaseModal(false)
                                        }
                                    ></button>

                                </div>

                                <form onSubmit={savePolicy}>

                                    <div className="modal-body">

                                        {/* POLICY TYPE */}

                                        <div className="mb-3">

                                            <label className="form-label">
                                                Policy Type
                                            </label>

                                            <select
                                                name="PolicyType"
                                                className="form-select"
                                                value={
                                                    purchasePolicy.PolicyType
                                                }
                                                onChange={
                                                    handlePurchaseChange
                                                }
                                                required
                                            >

                                                <option value="">
                                                    Select Policy Type
                                                </option>

                                                <option value="Health">
                                                    Health
                                                </option>

                                                <option value="Life">
                                                    Life
                                                </option>

                                                <option value="Vehicle">
                                                    Vehicle
                                                </option>

                                                <option value="Home">
                                                    Home
                                                </option>

                                                <option value="Travel">
                                                    Travel
                                                </option>

                                            </select>

                                        </div>

                                        {/* AMOUNT */}

                                        <div className="mb-3">

                                            <label className="form-label">
                                                Policy Amount
                                            </label>

                                            <input
                                                type="number"
                                                name="PolicyAmount"
                                                className="form-control"
                                                value={
                                                    purchasePolicy.PolicyAmount
                                                }
                                                onChange={
                                                    handlePurchaseChange
                                                }
                                                required
                                            />

                                        </div>

                                        {/* RENEWED */}

                                        <div className="mb-3">

                                            <label className="form-label">
                                                Is Renewed
                                            </label>

                                            <select
                                                name="IsRenewed"
                                                className="form-select"
                                                value={
                                                    purchasePolicy.IsRenewed
                                                }
                                                onChange={
                                                    handlePurchaseChange
                                                }
                                                required
                                            >

                                                <option value="">
                                                    Select
                                                </option>

                                                <option value="1">
                                                    Yes
                                                </option>

                                                <option value="0">
                                                    No
                                                </option>

                                            </select>

                                        </div>

                                    </div>

                                    <div className="modal-footer">

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() =>
                                                setShowPurchaseModal(false)
                                            }
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Purchase Policy
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                    <div className="modal-backdrop fade show"></div>

                </>

            )}

        </div>
    );
}

export default Profile;
