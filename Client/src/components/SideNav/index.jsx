import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faHome,
  faBuilding,
  faCalendar,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { sendRequest } from "../../config/request";

const SideNav = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      if (!token) {
        console.error("No token found");
        navigate("/login"); // Redirect to login page if no token exists
        return;
      }
  
      await sendRequest({
        method: "POST",
        route: "/logout",
        includeHeaders: true,
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });
  
      localStorage.removeItem("token"); // Clear token from local storage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  return (
    <div className="bg-gray-100 h-full min-h-screen w-60 border-r border-gray-300">
      <div className="px-4 py-6">
        {/* Sidebar Header */}
        <div className="text-lg font-bold text-gray-800 mb-6">
          <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
          Dashboard
        </div>

        {/* Navigation Links */}
        <ul className="space-y-4">
          <li>
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-green-100 text-green-600"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="properties"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-green-100 text-green-600"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faBuilding} className="mr-2" />
              My Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="add"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-green-100 text-green-600"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Add Property
            </NavLink>
          </li>
          <li>
            <NavLink
              to="meetings"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-green-100 text-green-600"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faCalendar} className="mr-2" />
              Meetings
            </NavLink>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          className="mt-6 flex items-center px-3 py-2 w-full rounded-md bg-red-100 text-red-600 hover:bg-red-200 text-sm font-medium"
          onClick={logout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};
export default SideNav;
