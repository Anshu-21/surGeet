import React, { useRef, useState, useEffect } from "react";
import { IoIosShuffle } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { FaMusic, FaList, FaMicrophone } from "react-icons/fa";
import { MdArrowBack, MdArrowForward, MdPause, MdPlayArrow } from "react-icons/md";
import { BsFillHeartFill, BsFillPlusCircleFill } from "react-icons/bs";
import { assets } from "../assets/assets";
import service from "../appwrite/config";

const AllList = () => {
  
  const [selectedSong, setSelectedSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likedSongs, setLikedSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Music Taste");
  const [recordings, setRecordings] = useState([]);
  const audioRef = useRef(null);

  const songs = [
    { name: "Ishq Hua", artist: "Shreya Ghoshal, Sonu Nigam", url: assets.songs.song1, image: assets.images.ts1 },
    { name: "Jaan Hai Meri", artist: "Armaan Malik", url: assets.songs.song2, image: assets.images.ts2 },
    { name: "Jaan Ban Gya", artist: "Vishal Mishra, Asees Kaur", url: assets.songs.song3, image: assets.images.ts3 },
    { name: "Aaj Se Teri", artist: "Arijit Singh", url: assets.songs.song4, image: assets.images.ts4 },
    { name: "Aankhon Mein Teri", artist: "KK", url: assets.songs.song5, image: assets.images.ts5 },
    { name: "Aashiqui Aa Gayi", artist: "Arijit Singh, Mithoon", url: assets.songs.song6, image: assets.images.ts6 },
    { name: "Achyutam Keshavam", artist: "Anup Jalota", url: assets.songs.song7, image: assets.images.ts7 },
    { name: "Meri Tarah", artist: "Jubin Nautiyal, Payal Dev", url: assets.songs.song8, image: assets.images.ts8 },
    { name: "I Love You", artist: "Akull", url: assets.songs.song9, image: assets.images.ts9 },
    { name: "Baarish Ban Jana", artist: "Emma Heesters", url: assets.songs.song10, image: assets.images.ts10 },
    { name: "Ilahi", artist: "Arijit Singh", url: assets.songs.song11, image: assets.images.ts11 },
    { name: "Jaaniya", artist: "Neha Kakkar, Nakkash Aziz", url: assets.songs.song12, image: assets.images.ts12 },
    { name: "Chaand Baaliyan", artist: "Aditya A", url: assets.songs.song13, image: assets.images.ts13 },
    { name: "Dil Ibaadat", artist: "KK", url: assets.songs.song14, image: assets.images.ts14 },
    { name: "Kaisa Mujhe Tum Gyi", artist: "Shreya Ghoshal, Benny Dayal", url: assets.songs.song15, image: assets.images.ts15 },
    { name: "Kaalank ( Title Song )", artist: "Arijit Singh", url: assets.songs.song16, image: assets.images.ts16 },
    { name: "Saawariya", artist: "Shreya Ghoshal, Vishal Dadlani", url: assets.songs.song17, image: assets.images.ts17 },
    { name: "Ladki Badi Anjani", artist: "Alka Yagnik, Kumar Sanu", url: assets.songs.song18, image: assets.images.ts18 },
    { name: "Mera Yaara", artist: "Arijit Singh, Neeti Mohan", url: assets.songs.song19, image: assets.images.ts19 },
    { name: "Loser", artist: "Dino James", url: assets.songs.song20, image: assets.images.ts20 },
    { name: "Lost", artist: "RCR", url: assets.songs.song21, image: assets.images.ts21 },
    { name: "Dil Jaaniye", artist: "Jubin Nautiyal, Neeti Mohan", url: assets.songs.song22, image: assets.images.ts22 },
    { name: "Be Intehaan", artist: "Atif Aslam, Sunidhi Chauhan", url: assets.songs.song23, image: assets.images.ts23 },
    { name: "O Bholenath jii", artist: "Hansraj Raghuwanshi", url: assets.songs.song24, image: assets.images.ts24 },
    { name: "Main yahan Tu Wahan", artist: "Udit Narayan, Sadhana Sargam", url: assets.songs.song25, image: assets.images.ts25 },
    { name: "Mera Lia Tum Kafi Ho", artist: "Ayushmann Khurrana", url: assets.songs.song26, image: assets.images.ts26 },
    { name: "Meri Zindagi Hai Tu", artist: "Jubin Nautiyal, Neeti Mohan", url: assets.songs.song27, image: assets.images.ts27 },
    { name: "Mujhe Pyaar Pyaar Hai", artist: "Jubin Nautiyal, Asees Kaur", url: assets.songs.song28, image: assets.images.ts28 },
    { name: "Muradon Se", artist: "Shivam Mahadevan", url: assets.songs.song29, image: assets.images.ts29 },
    { name: "Naam", artist: "Tulsi Kumar, Millind Gaba", url: assets.songs.song30, image: assets.images.ts30 },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSong(null);
  };

  useEffect(() => {
    if (selectedSong && audioRef.current) {
      audioRef.current.src = selectedSong.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [selectedSong]);

  const handleSongClick = (song, index) => {
    setSelectedSong(song);
    setCurrentSongIndex(index);
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
    setSelectedSong(songs[nextIndex]);
    setCurrentSongIndex(nextIndex);
  };

  const handlePrev = () => {
    let prevIndex =
      isShuffle || currentSongIndex === 0
        ? Math.floor(Math.random() * songs.length)
        : (currentSongIndex - 1 + songs.length) % songs.length;
    setSelectedSong(songs[prevIndex]);
    setCurrentSongIndex(prevIndex);
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (isRepeat) setIsRepeat(false); 
  };

  const handleRepeat = () => {
    setIsRepeat(!isRepeat);
    if (isShuffle) setIsShuffle(false); 
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

  const handleLike = (song) => {
    setLikedSongs((prevLikes) =>
      prevLikes.includes(song.name)
        ? prevLikes.filter((like) => like !== song.name)
        : [...prevLikes, song.name]
    );
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await service.storage.listFiles("6777e4e6000fd92f38ea");
        setRecordings(response.files);
      } catch (error) {
        console.error("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, []);
  
  

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-64 bg-gradient-to-br from-gray-800 via-gray-950 to-black h-screen p-6 flex flex-col space-y-8">
        <h2 className="text-3xl font-bold mb-4">Explore</h2>
        <button
          className="flex items-center space-x-4 text-lg hover:text-purple-300 transition"
          onClick={() => handleCategoryClick("Music Taste")}
        >
          <FaMusic size={24} />
          <span>Music Library</span>
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



      <div className="flex-1 relative mx-3 my-3 overflow-y-auto max-h-[calc(100vh-6rem)]">
        {selectedCategory === "Music Taste" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Library</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song, index) => (
                <div
                  key={index}
                  className="w-80 h-96 p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center space-y-2"
                >
                  <div className="w-full h-3/5">
                    <img
                      src={song.image}
                      alt={song.name}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center">{song.name}</h3>
                  <p className="text-sm text-gray-400 text-center">{song.artist}</p>
                  <div className="flex space-x-4 mt-2">
                    <button
                      onClick={() => handleSongClick(song, index)}
                      className="bg-purple-500 px-4 py-2 rounded-lg shadow-md text-white hover:bg-purple-400"
                    >
                      Play
                    </button>
                    <button
                      onClick={() => handleLike(song)}
                      className={`${likedSongs.includes(song.name) ? "text-red-500" : "text-gray-400"
                        } hover:text-red-500`}
                    >
                      <BsFillHeartFill size={20} />
                    </button>
                    <button
                      onClick={() => handleAddToPlaylist(song)}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      <BsFillPlusCircleFill size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>


          </div>
        )}
      

      {selectedCategory === "Recordings" && (
      <div>
        <h3 className="text-xl font-semibold mb-4">All Recordings</h3>
        <div className="space-y-4 flex flex-col-reverse">
        {recordings.length > 0 ? (
            recordings.map((recording) => (
              <div key={recording.$id} className="bg-gray-600 p-4 rounded-lg">
                <p className="text-sm font-semibold">
                  {recording.name || "Unnamed Recording"}
                </p>
                <p className="text-xs text-gray-300">Uploaded by: {recording.userName}</p>
                <audio controls className="w-full mt-2">
                  <source
                    src={`https://cloud.appwrite.io/v1/storage/buckets/6777e4e6000fd92f38ea/files/${recording.$id}/view?project=677351890026d97dd5a6`}
                    type="audio/wav"
                  />
                </audio>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No recordings found.</p>
          )}
        </div>
      </div>
    )}

      </div>


      {selectedSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={selectedSong.image} alt={selectedSong.name} className="w-16 h-16 rounded-lg" />
              <div>
                <h3 className="font-semibold">{selectedSong.name}</h3>
                <p className="text-sm text-gray-400">{selectedSong.artist}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
                className="w-24"
              />
              <span>{formatTime(duration)}</span>
            </div>

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
              <button onClick={handleShuffle} className={isShuffle ? "text-green-400" : ""}>
                <IoIosShuffle size={24} />
              </button>
              <button onClick={handleRepeat} className={isRepeat ? "text-green-400" : ""}>
                <IoMdRepeat size={24} />
              </button>
            </div>



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
      )}

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={isRepeat ? () => audioRef.current.play() : handleNext}
      />
    </div>
  );
};

export default AllList;
