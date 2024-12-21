import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { sendRequest } from "../../config/request";

const SideNavBuyer = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await sendRequest({
        method: "POST",
        route: "/logout",
        includeHeaders: true,
      });

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
          Owned Properties
        </div>

        {/* Navigation Links */}
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/buyerpage/properties"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-green-100 text-green-600"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                Search Properties
            </NavLink>
          </li>
        </ul>

                {/* Navigation Links */}
                <ul className="space-y-4">
          <li>
            <NavLink
              to="/buyerpage/reservedproperties"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-green-100 text-green-600"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <FontAwesomeIcon icon={faBuilding} className="mr-2" />
              Reserved Properties
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

export default SideNavBuyer;
