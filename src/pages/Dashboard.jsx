import React, { useEffect, useState } from 'react';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [favorites, setFavorites] = useState([]); 
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await service.listRecordings();
        if (response && response.documents) {
          setRecordings(response.documents);
        }
      } catch (error) {
        console.error("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await service.listPlaylists();
        if (response && response.documents) {
          setPlaylists(response.documents);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await service.listFavorites();
        if (response && response.documents) {
          setFavorites(response.documents);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen p-8">
      {user && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold text-white mb-8"
        >
          Welcome, {user.name}!
        </motion.div>
      )}

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveSection('recordings')}
          className={`px-4 py-2 rounded ${activeSection === 'recordings' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          Recordings
        </button>
        <button
          onClick={() => setActiveSection('playlists')}
          className={`px-4 py-2 rounded ${activeSection === 'playlists' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          Songs
        </button>
        <button
          onClick={() => setActiveSection('favorites')}
          className={`px-4 py-2 rounded ${activeSection === 'favorites' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          Favorite Music
        </button>
      </div>

      <AnimatePresence>
        {activeSection === 'recordings' && (
          <motion.section
            key="recordings"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-gray-700 via-gray-800 to-black"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Your Recordings
            </h2>
            <div className="space-y-4">
              {recordings.length > 0 ? (
                recordings.map((recording) => (
                  <div key={recording.$id} className="bg-gray-600 p-4 rounded-lg">
                    <p className="text-sm font-semibold">{recording.recording_name}</p>
                    <audio controls className="w-full mt-2">
                      <source
                        src={`https://cloud.appwrite.io/v1/storage/buckets/6777e4e6000fd92f38ea/files/${recording.file_url}/view?project=677351890026d97dd5a6`}
                        type="audio/wav"
                      />
                    </audio>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No recordings found.</p>
              )}
            </div>
          </motion.section>
        )}

        {activeSection === 'playlists' && (
          <motion.section
            key="playlists"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="p-4 bg-gray-600 shadow-md rounded-md"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Your Songs</h2>
            {playlists.length > 0 ? (
              <div className="grid gap-4">
                {playlists.map((playlist) => (
                  <p key={playlist.$id}>{playlist.name}</p>
                ))}
              </div>
            ) : (
              <p className="text-white">No songs available</p>
            )}
          </motion.section>
        )}

        {activeSection === 'favorites' && (
          <motion.section
            key="favorites"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="p-4 bg-gray-600 shadow-md rounded-md"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Favorite Music</h2>
            {favorites.length > 0 ? (
              <div className="grid gap-4">
                {favorites.map((fav) => (
                  <p key={fav.$id}>{fav.name}</p>
                ))}
              </div>
            ) : (
              <p className="text-white">No favorite music available</p>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
