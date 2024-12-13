// import { Link } from "react-router-dom";

// export default function Header() {
//   return (
//     <header className="flex items-center justify-between px-8 py-4 bg-gray-100">
//       {/* Logo Section */}
//       <div className="flex items-center">
//         <a href="/" className="flex items-center gap-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-8 h-8 text-gray-800"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
//             />
//           </svg>
//           <span className="font-bold text-lg text-gray-800">SALOESTATES</span>
//         </a>
//       </div>

//       {/* Search Bar */}
//       <div className="flex-grow flex justify-center items-center">
//         <div
//           className="flex items-center bg-white border border-gray-300 shadow-md rounded-full"
//           style={{
//             height: "40px", // Search bar height
//             maxWidth: "600px", // Set a maximum width for the search bar
//             width: "100%", // Full width inside the parent flex container
//             overflow: "hidden", // Makes the border seamless
//           }}
//         >
//           {/* Search Icon Button */}
//           <button
//             onClick={() => console.log("Search initiated")}
//             className="flex items-center justify-center px-4 border-r border-gray-300 focus:outline-none"
//             style={{
//               height: "40px",
//               backgroundColor: "#5a30e2", // Ensure transparency
//             }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="white"
//               className="w-5 h-5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//               />
//             </svg>
//           </button>

//           {/* Search Input */}
//           <input
//             type="text"
//             placeholder="Search by Address, City, Neighborhood, Zip"
//             className="flex-grow bg-transparent focus:outline-none text-gray-600 placeholder-gray-500 px-2"
//             style={{
//               height: "38px",
//               backgroundColor: "transparent", // Ensure input background is fully transparent
//               border: "none", // Remove any default borders
//               boxShadow: "none", // Prevent shadows from appearing
//             }}
//           />
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <div className="flex items-center gap-6">
//         <Link to="/" className="text-gray-700 font-medium hover:text-gray-900">
//           Home Search
//         </Link>
//         <Link
//           to="/login"
//           className="text-gray-700 font-medium hover:text-gray-900"
//         >
//           Login
//         </Link>
//         <button className="text-gray-700 font-medium hover:text-gray-900">
//           Menu
//         </button>
//       </div>
//     </header>
//   );
// }


//Header to consider 

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-b from-white to-gray-100 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-purple-600">moment</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-8">
        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-purple-600 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/houses"
          className="text-gray-700 font-medium hover:text-purple-600 transition-colors"
        >
          Houses
        </Link>
        <Link
          to="/lands"
          className="text-gray-700 font-medium hover:text-purple-600 transition-colors"
        >
          Lands
        </Link>
        <Link
          to="/accountpage"
          className="text-gray-700 font-medium hover:text-purple-600 transition-colors"
        >
          Account
        </Link>
      </nav>

      {/* Contact Button */}
      <div>
        <Link
          to="/login"
          className="bg-purple-600 text-white font-medium py-2 px-6 rounded-full hover:bg-purple-700 transition-all"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
