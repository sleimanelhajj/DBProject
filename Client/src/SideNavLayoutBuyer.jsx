import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import SideNavBuyer from "./components/SideNavBuyer/";

const SideNavLayoutBuyer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 border-r border-gray-300">
          <SideNavBuyer />
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideNavLayoutBuyer;
