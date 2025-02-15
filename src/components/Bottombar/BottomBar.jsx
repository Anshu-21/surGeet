import React from "react";
import { IoIosShuffle } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { MdArrowBack, MdArrowForward, MdPause, MdPlayArrow } from "react-icons/md";
import { useMusic } from "../../pages/MusicContext";

function BottomBar() {
  const {
    currentSong,
    currentTime,
    duration,
    isPlaying,
    isShuffle,
    isRepeat,
    volume,
    handlePlayPause,
    handleNext,
    handlePrev,
    handleShuffle,
    handleRepeat,
    handleSeek,
    handleVolumeChange,
    formatTime,
  } = useMusic();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {currentSong && <img src={currentSong.cover} alt={currentSong.name} className="w-16 h-16 rounded-lg" />}
          <div>
            <h3 className="font-semibold">{currentSong?.name || "Unknown Song"}</h3>
            <p className="text-sm text-gray-400">{currentSong?.artist || "Unknown Artist"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span>{formatTime(currentTime)}</span>
          <input type="range" min="0" max="100" value={(currentTime / duration) * 100 || 0} onChange={handleSeek} />
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={handlePrev}><MdArrowBack size={24} /></button>
          <button onClick={handlePlayPause}>{isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />}</button>
          <button onClick={handleNext}><MdArrowForward size={24} /></button>
          <button onClick={handleShuffle} className={isShuffle ? "text-green-400" : ""}><IoIosShuffle size={24} /></button>
          <button onClick={handleRepeat} className={isRepeat ? "text-green-400" : ""}><IoMdRepeat size={24} /></button>
        </div>
        <input type="range" min="0" max="100" value={volume * 100} onChange={handleVolumeChange} />
      </div>
    </div>
  );
}

export default BottomBar;
