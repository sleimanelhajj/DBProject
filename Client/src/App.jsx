/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import RegisterPage from './pages/RegisterPage.jsx'
import RegisterSeller from './pages/RegisterSeller.jsx'
import RegisterClient from './pages/RegisterBuyer.jsx'
// import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import SideNavLayout from "./SideNavLayout.jsx"; // New layout for SideNav
import SideNavLayoutBuyer from "./SideNavLayoutBuyer.jsx"; // New layout for SideNav

import SellersList from "./pages/sellersRender.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AddProperty from "./pages/AddProperty.jsx";
import Schedule from "./pages/Schedule";
import UserProperties from "./pages/UserProperties.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx"
import ReservedProperties from "./pages/ReservedProperties.jsx"
import Landing from "./Landing/index.jsx";
import Homes from './pages/Homes.jsx';
import About from './pages/About.jsx'
import Lands from './pages/Lands.jsx';
import Authentication from "./components/Authentication/index.jsx";
import SuccessPage from "./pages/Success.jsx";
import ContactUs from "./pages/ContactUs.jsx";
function App() {
  return (
    <Routes>
      {/* Routes Outside */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/registerSeller' element={<RegisterSeller/>} />
        <Route path='/registerClient' element={<RegisterClient/>} />
        <Route path='/ContactUs' element={<ContactUs/>} />

      </Route>

      {/* Routes for BuyerSide*/}
      <Route path="/buyerpage" element={<SideNavLayoutBuyer />}>
      <Route path='properties' element={<Lands />} /> 
      <Route path="properties/details/:id" element={<PropertyDetails />} />
   
      <Route path="reservedproperties" element={<ReservedProperties />} />

      </Route>

      {/* Routes with SideNav for Seller */}

      <Route path='/auth' element={<Authentication />} />
      <Route path="/accountpage" element={<SideNavLayout />}>
     
        <Route index element={<AccountPage />} />
        <Route path="add" element={<AddProperty />} />
        <Route path="sellersRender" element={<SellersList />} />
        <Route path = "meetings" element = {<Schedule />}/>
        <Route path = "myproperties" element = {<UserProperties/>}/>    

        </Route>
    {/* Miscalaneous Roots */}
        <Route>          
          <Route path="success" element={<SuccessPage />} />
        </Route>

    </Routes>
  );
}

export default App;
