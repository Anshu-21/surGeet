import React, { useState, useRef, useEffect, useContext } from "react";
import { FaMusic, FaList, FaMicrophone } from "react-icons/fa";
import { MdArrowBack, MdArrowForward, MdPause, MdPlayArrow } from "react-icons/md";
import { IoIosShuffle, IoMdRepeat, IoIosVolumeHigh } from "react-icons/io";
import { BsFillHeartFill, BsFillPlusCircleFill } from "react-icons/bs";
import { assets } from "../assets/assets"; 
import { useAudio } from "../pages/AudioContext"; 

const AllList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTaste, setSelectedTaste] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [likedSongs, setLikedSongs] = useState([]); 
  const [playlist, setPlaylist] = useState([]); 
  const audioRef = useRef(null); 

  const { 
    isPlaying, 
    setIsPlaying, 
    isShuffle, 
    setIsShuffle, 
    isRepeat, 
    setIsRepeat, 
    playNext, 
    playPrev, 
    handlePlayPause 
  } = useAudio();

  const musicTastes = ["Taste 1", "Taste 2", "Taste 3", "Taste 4", "Taste 5"];

  const songs = {
    "Taste 1": [
      { name: "Song 1", artist: "Artist 1", url: assets.songs.song1, image: assets.images.ts },
      { name: "Song 2", artist: "Artist 2", url: assets.songs.song2, image: assets.images.ts2 }
    ],
    "Taste 2": [
      { name: "Song 3", artist: "Artist 3", url: assets.songs.song3, image: assets.images.ts3 },
      { name: "Song 4", artist: "Artist 4", url: assets.songs.song4, image: assets.images.ts4 }
    ],
    "Taste 3": [
      { name: "Song 5", artist: "Artist 5", url: assets.songs.song5, image: assets.images.ts5 },
      { name: "Song 6", artist: "Artist 6", url: assets.songs.song6, image: assets.images.ts6 }
    ],
    "Taste 4": [
      { name: "Song 7", artist: "Artist 7", url: assets.songs.song7, image: assets.images.ts7 },
      { name: "Song 8", artist: "Artist 8", url: assets.songs.song8, image: assets.images.ts8 }
    ],
    "Taste 5": [
      { name: "Song 9", artist: "Artist 9", url: assets.songs.song9, image: assets.images.ts9 },
      { name: "Song 10", artist: "Artist 10", url: assets.songs.song10, image: assets.images.ts10 }
    ],
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedTaste(null);
    setSelectedSong(null);
  };

  const handleTasteClick = (taste) => {
    setSelectedTaste(taste);
    setCurrentSongIndex(0); 
  };

  const handleSongClick = (song, index) => {
    setSelectedSong(song);
    setCurrentSongIndex(index); 
    setIsPlaying(true); 
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const handleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handleLike = (song) => {
    setLikedSongs((prevLikes) =>
      prevLikes.includes(song.name) ? prevLikes.filter((like) => like !== song.name) : [...prevLikes, song.name]
    );
  };

  const handleAddToPlaylist = (song) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
  };

  useEffect(() => {
    if (selectedSong && audioRef.current) {
      audioRef.current.src = selectedSong.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [selectedSong, setIsPlaying]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white">
      <div className="w-64 bg-gradient-to-br from-gray-800 via-gray-950 to-black h-screen p-6 flex flex-col space-y-8">
        <h2 className="text-3xl font-bold mb-4">Explore</h2>
        <button
          className="flex items-center space-x-4 text-lg hover:text-purple-300 transition"
          onClick={() => handleCategoryClick("Music Taste")}
        >
          <FaMusic size={24} />
          <span>Music Taste</span>
        </button>
        <button
          className="flex items-center space-x-4 text-lg hover:text-purple-300 transition"
          onClick={() => handleCategoryClick("Playlists")}
        >
          <FaList size={24} />
          <span>Playlists</span>
        </button>
        <button
          className="flex items-center space-x-4 text-lg hover:text-purple-300 transition"
          onClick={() => handleCategoryClick("Recordings")}
        >
          <FaMicrophone size={24} />
          <span>Recordings</span>
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden mx-3 my-3">
        {selectedCategory === "Music Taste" && (
          <div
            className={`absolute inset-0 transition-transform duration-500 ${
              selectedTaste ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Music Taste</h2>
            <div className="grid grid-cols-2 gap-4">
              {musicTastes.map((taste, index) => (
                <div
                  key={index}
                  onClick={() => handleTasteClick(taste)}
                  className="p-4 bg-gray-600 rounded-lg shadow-lg cursor-pointer hover:bg-gray-950"
                >
                  {taste}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTaste && (
          <div
            className={`absolute inset-0 transition-transform duration-500 ${
              selectedTaste ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={() => setSelectedTaste(null)}
              className="flex items-center space-x-2 text-lg hover:text-purple-300 transition mb-4"
            >
              <MdArrowBack size={24} />
              <span>Back to Music Taste</span>
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedTaste} Songs</h2>
            <div className="grid grid-cols-2 gap-4">
              {songs[selectedTaste]?.map((song, index) => (
                <div
                  key={index}
                  onClick={() => handleSongClick(song, index)}
                  className="p-4 bg-gray-600 rounded-lg shadow-lg cursor-pointer hover:bg-gray-950"
                >
                  {song.name}
                  <div className="flex space-x-2 mt-2">
                    <button onClick={() => handleLike(song)} className="hover:text-red-500">
                      <BsFillHeartFill />
                    </button>
                    <button onClick={() => handleAddToPlaylist(song)} className="hover:text-blue-500">
                      <BsFillPlusCircleFill />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedSong && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={selectedSong.image} alt={selectedSong.name} className="w-12 h-12 rounded-full" />
              <div>
                <div className="text-lg font-semibold">{selectedSong.name}</div>
                <div className="text-sm text-gray-400">{selectedSong.artist}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={handleShuffle}>
                <IoIosShuffle size={24} />
              </button>
              <button onClick={playPrev}>
                <MdArrowBack size={24} />
              </button>
              <button onClick={handlePlayPause}>
                {isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
              </button>
              <button onClick={playNext}>
                <MdArrowForward size={24} />
              </button>
              <button onClick={handleRepeat}>
                <IoMdRepeat size={24} />
              </button>
              <button>
                <IoIosVolumeHigh size={24} />
              </button>
            </div>
          </div>
        )}

        <audio ref={audioRef} onEnded={playNext} />
      </div>
    </div>
  );
};

export default AllList;
