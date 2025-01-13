import React, { useState, useEffect } from "react";
import service from "../appwrite/config";

const PlaylistPage = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [userMusic, setUserMusic] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const userPlaylists = await service.fetchPlaylists();
        setPlaylists(userPlaylists || []);
      } catch (err) {
        setError("Error fetching playlists.");
        console.error(err);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistSubmit = async () => {
    if (!playlistName || !playlistDescription || selectedMusic.length === 0) {
      alert("Please provide a playlist name, description, and at least one track.");
      return;
    }

    try {
      const playlist = await service.createPlaylist({
        playlistName,
        playlistDescription,
        tracks: selectedMusic,
      });

      setPlaylists([...playlists, playlist]);
      setPlaylistName("");
      setPlaylistDescription("");
      setSelectedMusic([]);

      alert("Playlist created successfully!");
    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("An error occurred while creating the playlist.");
    }
  };

  const handleMusicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setUserMusic([...userMusic, { name: file.name, url: fileURL }]);
    }
  };

  const selectMusic = (music) => {
    if (!selectedMusic.includes(music)) {
      setSelectedMusic([...selectedMusic, music]);
    }
  };

  const handleRemoveMusic = (music) => {
    setSelectedMusic(selectedMusic.filter((item) => item.url !== music.url));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-semibold">Create Your Playlist</h2>
        <div className="bg-gray-800 rounded-lg p-6 w-full sm:w-80">
          <label className="block text-xl font-semibold">Playlist Name:</label>
          <input
            type="text"
            className="w-full mt-2 p-2 bg-gray-700 text-white rounded-lg"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Enter playlist name"
          />
          <label className="block text-xl font-semibold mt-4">
            Playlist Description:
          </label>
          <textarea
            className="w-full mt-2 p-2 bg-gray-700 text-white rounded-lg"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            placeholder="Enter playlist description"
          />
          <button
            onClick={handlePlaylistSubmit}
            className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg w-full mt-4"
          >
            Create Playlist
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Music Library</h2>
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <label className="text-lg font-semibold">Add Your Music File:</label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleMusicUpload}
            className="bg-purple-600 text-white p-2 rounded-md"
          />
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Available Music</h4>
            <ul className="space-y-2">
              {userMusic.length > 0 ? (
                userMusic.map((music, index) => (
                  <li key={index}>
                    <button
                      onClick={() => selectMusic(music)}
                      className="bg-gray-700 text-white font-medium py-2 px-4 rounded-md w-full text-left hover:bg-gray-600 transition duration-200"
                    >
                      {music.name}
                    </button>
                  </li>
                ))
              ) : (
                <p>No music uploaded yet.</p>
              )}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Selected Tracks</h4>
            <ul className="space-y-2">
              {selectedMusic.length > 0 ? (
                selectedMusic.map((music, index) => (
                  <li key={index} className="text-sm text-gray-400">
                    {music.name}
                    <button
                      onClick={() => handleRemoveMusic(music)}
                      className="bg-red-600 text-white ml-2 rounded-md px-2 py-1"
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <p>No tracks selected.</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="col-span-3">
        <h2 className="text-2xl font-semibold mb-4">Your Playlists</h2>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              key={playlist.$id}
              className="bg-gray-800 p-6 rounded-lg mb-4 shadow-lg"
            >
              <h3 className
                ="text-lg font-semibold">{playlist.playlist_name}</h3>
                <p className="text-sm text-gray-400">{playlist.description}</p>
                {playlist.track_ids && playlist.track_ids.length > 0 && (
                  <ul className="mt-4">
                    {playlist.track_ids.map((trackId, index) => (
                      <li key={index} className="text-gray-300 text-sm">
                        Track ID: {trackId}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p>No playlists created yet.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default PlaylistPage;
  