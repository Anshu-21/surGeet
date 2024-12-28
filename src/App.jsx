import './App.css';


function App() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      

      <div className="relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 relative z-10">
          <div className="col-span-1">
            <h2 className="text-3xl font-bold mb-4">Discover</h2>
            <div className="space-y-4">
              <div className="backdrop-blur-md bg-white bg-opacity-10 border border-gray-200 border-opacity-20 p-4 rounded-lg shadow-lg">
                <p className="text-lg font-semibold mb-2">Trending Playlists</p>
                <img
                  src="pic/ts.jpg"
                  alt="Trending Playlist"
                  className="rounded-md w-full transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 flex flex-col items-center justify-center">
            <div className="backdrop-blur-md bg-white bg-opacity-10 border border-gray-200 border-opacity-20 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
              <img
                src="pic/th.jpg"
                alt="Album Cover"
                className="rounded-md w-full shadow-lg"
              />
              <div className="mt-4">
                <h1 className="text-2xl font-bold">TERE HO KE</h1>
                <p className="text-sm text-gray-300">King Bella</p>
              </div>
              <div className="flex items-center justify-center mt-4 space-x-4">
                <button className="bg-white text-black py-2 px-4 rounded-full shadow-md hover:bg-gray-100">
                  Play
                </button>
                <button className="bg-gray-700 py-2 px-4 rounded-full shadow-md hover:bg-gray-600">
                  Add to Playlist
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="text-3xl font-bold mb-4">Top Artists</h2>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="pic/ar.webp"
                alt="Artist"
                className="rounded-full w-24 h-24 mx-auto transform transition-transform duration-300 hover:scale-105"
              />
              <img
                src="pic/ar.jpg"
                alt="Artist"
                className="rounded-full w-24 h-24 mx-auto transform transition-transform duration-300 hover:scale-105"
              />
              <img
                src="pic/jn.webp"
                alt="Artist"
                className="rounded-full w-24 h-24 mx-auto transform transition-transform duration-300 hover:scale-105"
              />
              <img
                src="pic/ki.webp"
                alt="Artist"
                className="rounded-full w-24 h-24 mx-auto transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="relative mt-12 p-12 flex justify-center items-center">
          <div className="absolute inset-0">
            <svg
              className="opacity-70 animate-bounce absolute top-10 left-10 w-16 h-16 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19V6l12-2v13"
              ></path>
            </svg>
            <svg
              className="opacity-70 animate-bounce absolute top-40 right-20 w-16 h-16 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19V6l12-2v13"
              ></path>
            </svg>
          </div>

          <div className="relative z-10 backdrop-blur-md bg-white bg-opacity-10 border border-gray-200 border-opacity-20 p-8 rounded-xl shadow-lg max-w-3xl text-center">
            <h1 className="text-2xl font-extrabold mb-4 text-gradient bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600">
              About SurGeet
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-gray-300">
              SurGeet is a revolutionary music platform designed to bring your favorite
              melodies to life. With a sleek interface, personalized playlists, and
              seamless streaming, SurGeet connects you to a world of rhythm and beats.
            </p>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default App;
