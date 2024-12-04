import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import SideNavLayout from "./SideNavLayout.jsx"; // New layout for SideNav
import RegisterPage from "./RegisterPage.jsx";
import SellersList from "./pages/sellersRender.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AddProperty from "./pages/AddProperty.jsx";
import Schedule from "./pages/Schedule";
import UserProperties from "./pages/UserProperties.jsx";

function App() {
  return (
    <Routes>
      {/* Routes without SideNav */}
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      
      </Route>

      {/* Routes with SideNav */}
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
