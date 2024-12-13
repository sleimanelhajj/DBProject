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
import SellersList from "./pages/sellersRender.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AddProperty from "./pages/AddProperty.jsx";
import Schedule from "./pages/Schedule";
import UserProperties from "./pages/UserProperties.jsx";
import Landing from "./Landing/index.jsx";
import Homes from './pages/Homes.jsx';
import Lands from './pages/Lands.jsx';
import Authentication from "./components/Authentication/index.jsx";
function App() {
  return (
    <Routes>
      {/* Routes without SideNav */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='/houses' element={<Homes />} />
        <Route path='/lands' element={<Lands />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/registerSeller' element={<RegisterSeller/>} />
        <Route path='/registerClient' element={<RegisterClient/>} />
      
      </Route>

      {/* Routes with SideNav */}
      <Route path='/auth' element={<Authentication />} />
      <Route path="/accountpage" element={<SideNavLayout />}>
     
        <Route index element={<AccountPage />} />
        <Route path="add" element={<AddProperty />} />
        <Route path="sellersRender" element={<SellersList />} />
        <Route path = "meetings" element = {<Schedule />}/>
        <Route path = "properties" element = {<UserProperties/>}/>
      </Route>
    </Routes>
  );
}

export default App;
