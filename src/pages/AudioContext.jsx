import React, { createContext, useState, useRef, useEffect } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume 100%
  const [playlist, setPlaylist] = useState([]); // Array of songs
  const [currentIndex, setCurrentIndex] = useState(0); // Current song index
  
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    // Update current time
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    // Set duration when metadata loads
    const updateDuration = () => {
      setDuration(audio.duration);
    };

    // Play next song when current ends
    const handleSongEnd = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleSongEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, []);

  const playSong = (song, index) => {
    if (currentSong?.url !== song.url) {
      audioRef.current.src = song.url;
      audioRef.current.play();
      setCurrentSong(song);
      setCurrentIndex(index);
      setIsPlaying(true);
    } else {
      handlePlayPause();
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 🔹 Seek song position
  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // 🔹 Volume Control
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // 🔹 Handle Next Song
  const handleNext = () => {
    if (playlist.length > 0) {
      const nextIndex = (currentIndex + 1) % playlist.length;
      playSong(playlist[nextIndex], nextIndex);
    }
  };

  // 🔹 Handle Previous Song
  const handlePrev = () => {
    if (playlist.length > 0) {
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      playSong(playlist[prevIndex], prevIndex);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        handlePlayPause,
        currentTime,
        duration,
        handleSeek,
        volume,
        handleVolumeChange,
        handleNext,
        handlePrev,
        setPlaylist, // Allows setting the playlist from outside
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
