import React, { createContext, useState, useContext } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    currentSong: null,
    isShuffle: false,
    isRepeat: false,
    volume: 1.0,
  });


  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };


  const togglePlayPause = () => {
    setAudioState((prevState) => ({
      ...prevState,
      isPlaying: !prevState.isPlaying,
    }));
  };

  const toggleShuffle = () => {
    setAudioState((prevState) => ({
      ...prevState,
      isShuffle: !prevState.isShuffle,
    }));
  };

  const toggleRepeat = () => {
    setAudioState((prevState) => ({
      ...prevState,
      isRepeat: !prevState.isRepeat,
    }));
  };

  const changeVolume = (volume) => {
    setAudioState((prevState) => ({
      ...prevState,
      volume,
    }));
  };

  return (
    <AudioContext.Provider value={{ isPlaying, setIsPlaying, handlePlayPause }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
