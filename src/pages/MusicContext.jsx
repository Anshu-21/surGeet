// MusicContext.jsx
import React, { createContext, useContext, useState, useRef } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(1);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  const playSong = (song, index) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = song.url;
        audioRef.current.play();
      }
    }, 200);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    let nextIndex = isShuffle
      ? Math.floor(Math.random() * songs.length)
      : (currentSongIndex + 1) % songs.length;
    playSong(songs[nextIndex], nextIndex);
  };

  const handlePrev = () => {
    let prevIndex =
      isShuffle || currentSongIndex === 0
        ? Math.floor(Math.random() * songs.length)
        : (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex], prevIndex);
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const handleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        currentTime,
        duration,
        isPlaying,
        isShuffle,
        isRepeat,
        volume,
        playSong,
        handlePlayPause,
        handleNext,
        handlePrev,
        handleShuffle,
        handleRepeat,
        handleSeek,
        handleVolumeChange,
        formatTime,
        setSongs,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={isRepeat ? () => audioRef.current.play() : handleNext}
      />
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);