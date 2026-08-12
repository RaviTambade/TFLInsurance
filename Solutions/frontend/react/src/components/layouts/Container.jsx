import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../../pages/Home";
import CustomerDashboard from "../../pages/CustomerDashboard";
import Login from "../auth/Login";
import RegisterCustomer from "../customers/RegisterCustomer";
import Profile from "../dashbord/Profile";
import UpdateProfile from "../customers/UpdateProfile";
import PurchasePolicy from "../policies/PurchasePolicy";
import PolicyList from "../policies/PolicyList";
import PolicyListInPremium from "../policies/PolicyListInPremium";
import PayPremium from "../premiums/PayPremium";
import AdminDashboard from "../../pages/AdminDashboard";
import CustomerList from "../customers/CustomerList";
import PolicyListForAdmin from "../policies/PolicyListForAdmin"
import UserListForAdmin from "../users/UserListForAdmin";
import ResetPassword from "../auth/ResetPassword";


function Container() {
  return (
    <div>
      <h1> TFL Insurance</h1>
      <hr />

      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/Login">Login</Link> | 
          <Link to="/RegisterCustomer">Register</Link> 
          
        </nav>
        <hr />

<Routes>
    
    <Route path="/" element={<Home />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/RegisterCustomer" element={<RegisterCustomer />} />

    <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
    <Route path="/AdminDashboard" element={<AdminDashboard />}/>
    <Route path="/PolicyListForAdmin" element={<PolicyListForAdmin />} />
      <Route path="CustomerList" element={<CustomerList />}/>
      <Route path="UserListForAdmin" element={<UserListForAdmin />} />
      <Route path="/ResetPassword/:id" element={<ResetPassword />} />
      <Route path="/Profile" element={<Profile />}/>
      <Route path="/UpdateProfile" element={<UpdateProfile />}/>
      <Route path="/PurchasePolicy" element={<PurchasePolicy />}/>
      <Route path="/PolicyList" element={<PolicyList />}/>
      <Route path="/PolicyListInPremium" element={<PolicyListInPremium />}/>
      <Route path="/PayPremium" element={<PayPremium />}/>

</Routes>
      </BrowserRouter>
    </div>
  );
}

export default Container;
