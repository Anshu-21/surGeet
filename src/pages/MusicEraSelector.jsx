import React, { useState, useRef } from 'react';
import { Music, ChevronLeft, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { assets } from "../assets/assets"; 

const artists = [
  { name: 'Arijit Singh', songs: ['song1', 'song2', 'song3'], image: assets.images.ari },
  { name: 'AR Rahman', songs: ['song4', 'song5', 'song6'], image: assets.images.ar },
  { name: 'King', songs: ['song7', 'song8', 'song9'], image: assets.images.ki },
  { name: 'Kishore Kumar', songs: ['song10', 'song11', 'song12'], image: assets.images.kk },
  { name: 'Darshan Raval', songs: ['song13', 'song14', 'song15'], image: assets.images.dr },
  { name: 'Old Songs', songs: ['song16', 'song17', 'song18'], image: assets.images.obs }
];

export default function MusicEraSelector() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const audioRef = useRef(null);

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
    setSelectedSong(null); 
  };

  const handleSongClick = (song) => {
    setSelectedSong(song);
    const songUrl = assets.songs[song];
    if (audioRef.current) {
      audioRef.current.src = songUrl;
      audioRef.current.play();
    }
  };

  const handleBackClick = () => {
    setSelectedArtist(null);
    setSelectedSong(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-2">
      <header className="flex items-center justify-between mb-4 mx-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Music className="w-8 h-8 text-blue-500" /> Select Your Artists
        </h1>
        
      </header>

      {!selectedArtist ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
          {artists.map((artist) => (
            <motion.div
              key={artist.name}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => handleArtistClick(artist)}
            >
              <div className="p-4 bg-gradient-to-r from-[#134e5e] to-[#71b280] shadow-lg rounded-2xl flex flex-col items-center"
                style={{ backgroundImage: `url(${artist.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <img className="w-32 h-32 rounded-full mb-4 object-cover" />
                <div className="text-center text-xl font-semibold mb-4">{artist.name}</div>
                <button className="mt-auto px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-900 transition">
                  Select Artist
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : null}

      {selectedArtist && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#134e5e] to-[#71b280] p-6 rounded-2xl shadow-lg"
        >
          <button onClick={handleBackClick} className="flex items-center mb-4 text-green-600 hover:text-blue-700 transition">
            <ChevronLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="flex flex-col items-center mb-4">
            <img src={selectedArtist.image} alt={selectedArtist.name} className="w-40 h-40 rounded-full mb-4 object-cover" />
            <h2 className="text-2xl font-bold">{selectedArtist.name}'s Hits</h2>
          </div>
          <ul className="space-y-2">
            {selectedArtist.songs.map((song, index) => (
              <motion.li
                key={index}
                className="p-3 bg-violet-500 rounded-xl shadow-sm"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleSongClick(song)}
              >
                {song}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {selectedSong && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex justify-center items-center">
          <audio ref={audioRef} controls className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
