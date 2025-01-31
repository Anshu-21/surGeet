import React, { createContext, useState, useRef } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef(new Audio());

  const playSong = (song) => {
    if (currentSong?.url !== song.url) {
      audioRef.current.src = song.url;
      setCurrentSong(song);
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      togglePlayPause();
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  React.useEffect(() => {
    const updateTime = () => setCurrentTime(audioRef.current.currentTime);
    const updateDuration = () => setDuration(audioRef.current.duration);

    audioRef.current.addEventListener("timeupdate", updateTime);
    audioRef.current.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateTime);
      audioRef.current.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlayPause,
        currentTime,
        duration,
        handleSeek,
        handleVolumeChange,
        volume,
        isShuffle,
        setIsShuffle,
        isRepeat,
        setIsRepeat,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContext;
