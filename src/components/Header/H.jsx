// import { Link } from "react-router-dom";
// import {useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import {Container, Logo, LogoutBtn} from '../index'
// import {
//   FaPause,
//   FaPlay,
//   FaStepBackward,
//   FaStepForward,
//   FaBars,
// } from "react-icons/fa"; 

// function Header({ toggleSidebar }) {
//   const [isPlaying, setIsPlaying] = useState(false);

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handlePrev = () => {
//     console.log("Previous track");
//   };

//   const handleNext = () => {
//     console.log("Next track");
//   };

//   return (
//     <header className="shadow-md sticky z-50 top-0 bg-gray-900">
//       <nav className="py-4 flex justify-between items-center max-w-screen-xl mx-5">
//         {/* Hamburger Icon and Logo */}
//         <div className="flex space-x-8">
//           <button
//             onClick={toggleSidebar}
//             className="text-white"
//             aria-label="Open Sidebar"
//           >
//             <FaBars size={24} />
//           </button>
//           <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-600 to-purple-500">
//             SurGeet
//           </div>
//         </div>

//         {/* Search Bar and Media Controls */}
//         <div className="hidden lg:flex flex-1 mx-8 relative items-center">
//           <input
//             type="text"
//             placeholder="Search for music, artists, or albums..."
//             className="w-full max-w-lg mx-40 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             aria-label="Search"
//           />
         
//         </div>

//         {/* Authentication Links */}
//         <div className="hidden lg:flex items-center space-x-4">
//           <Link
//             to="/login"
//             className="text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 font-medium rounded-lg text-sm px-4 py-2"
//           >
//             Log in
//           </Link>
//           <Link
//             to="/signup"
//             className="text-white bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 transition-all duration-200 font-medium rounded-lg text-sm px-4 py-2"
//           >
//             Get Started
//           </Link>
//         </div>
//       </nav>

//       {/* Small Screen Search Bar and Links */}
//       <div className="lg:hidden mt-4">
//         <div className="relative flex items-center px-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             aria-label="Search"
//           />
//         </div>
//         <div className="flex justify-center space-x-4 mt-4">
//           <button
//             onClick={handlePrev}
//             className="text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
//             aria-label="Previous Track"
//           >
//             <FaStepBackward size={20} />
//           </button>
//           <button
//             onClick={togglePlayPause}
//             className="text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
//             aria-label={isPlaying ? "Pause" : "Play"}
//           >
//             {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
//           </button>
//           <button
//             onClick={handleNext}
//             className="text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
//             aria-label="Next Track"
//           >
//             <FaStepForward size={20} />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;