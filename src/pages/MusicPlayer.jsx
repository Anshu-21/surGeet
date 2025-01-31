import React, { useContext } from "react";
import { AudioContext } from "../pages/AudioContext";
import { MdPlayArrow, MdPause, MdArrowBack, MdArrowForward } from "react-icons/md";
import { IoIosShuffle } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    handlePlayPause,
    handleSeek,
    handleVolumeChange,
    handleNext,
    handlePrev,
  } = useContext(AudioContext);

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        {/* Song Info */}
        <div className="flex items-center space-x-4">
          {currentSong && (
            <>
              <img
                src={currentSong.image}
                alt={currentSong.name}
                className="w-16 h-16 rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{currentSong.name}</h3>
                <p className="text-sm text-gray-400">{currentSong.artist}</p>
              </div>
            </>
          )}
        </div>

        {/* Seek Bar */}
        <div className="flex items-center space-x-4">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="w-36"
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button onClick={handlePrev}>
            <MdArrowBack size={24} />
          </button>
          <button onClick={handlePlayPause}>
            {isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
          </button>
          <button onClick={handleNext}>
            <MdArrowForward size={24} />
          </button>
          <button>
            <IoIosShuffle size={24} />
          </button>
          <button>
            <IoMdRepeat size={24} />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;


// and there is last issue is that before clicking play button from any page there is shown bottom bar but i want that bottom bar is shown only when user click play buttton and there is option for cross button for disappearing bottom bar 