import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; 
import { MusicContext } from "../pages/MusicContext";

const song = { 
  id: 1, 
  name: "Tera Ho Ke", 
  artist: "King, Bella", 
  url: assets.songs.songki, 
  image: assets.images.th 
};

function Home() {
  const musicContext = useContext(MusicContext);

  const { selectedSong, isPlaying, playSong, handlePlayPause } = musicContext;
  const isLoggedIn = useSelector((state) => state.auth.status);  
  const navigate = useNavigate();

  const handlePlay = () => {
    if (!isLoggedIn) {
      navigate("/login"); 
      return;
    }
    if (selectedSong?.id !== song.id) {
      playSong(song);
    } else {
      handlePlayPause();
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white min-h-screen">
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="backdrop-blur-sm bg-white bg-opacity-10 border border-gray-200 border-opacity-20 p-6 rounded-xl shadow-sm transform transition-transform duration-300 hover:scale-105 w-full max-w-sm">
              <img
                src={song.image}
                alt="Album Cover"
                className="rounded-md w-full shadow-lg"
              />
              <div className="mt-4 text-center">
                <h1 className="text-3xl font-bold">{song.name}</h1>
                <p className="text-sm text-gray-300">{song.artist}</p>
              </div>
              <div className="flex items-center justify-center mt-4 space-x-4">
                <button
                  onClick={handlePlay}
                  className="bg-white text-black py-2 px-6 rounded-full shadow-md hover:bg-gray-100"
                >
                  {isPlaying && selectedSong?.id === song.id ? "Pause" : "Play"}
                </button>
                <button className="bg-gray-700 py-2 px-6 rounded-full shadow-md hover:bg-gray-600">
                  Add to Playlist
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Trending Playlists</h2>
            <div className="backdrop-blur-md bg-white bg-opacity-10 border border-gray-200 border-opacity-20 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <img
                className="rounded-md w-full transform transition-transform duration-300 hover:scale-105"
                src={assets.images.ts}
                alt="Trending Playlist"
              />
            </div>

            <div className="my-8"></div>

            <h2 className="text-3xl font-bold mb-4">Top Artists</h2>
            <div className="grid grid-cols-2 gap-4">
              {["ar", "ari", "ki", "jn"].map((artist, index) => (
                <img
                  key={index}
                  src={assets.images[artist]}
                  alt="Artist"
                  className="rounded-full w-24 h-24 mx-auto transform transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
