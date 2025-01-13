import React, { useState, useRef, useEffect } from 'react';
import service from "../appwrite/config";

const Player = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [timer, setTimer] = useState(0); 
  const [currentZone, setCurrentZone] = useState(null);
  const [currentSentence, setCurrentSentence] = useState(''); 
  const [recordings, setRecordings] = useState([]);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const intervalRef = useRef(null);
  const userId = "sampleUserId"; 

  const zones = {
    salutation: ['Hello!', 'Good Morning!', 'Good Evening!'],
    wishing: ['Happy Birthday!', 'Good Luck!', 'Have a great day!'],
    gratitude: ['Thank you!', 'I appreciate it!', 'Thanks a lot!'],
    compliments: ['You look great!', 'Well done!', 'Nice work!'],
    musicRecording: ['Record your own music!'], 
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await service.listFiles(); 
        if (response && response.files) {
          const filesWithUrls = response.files.map((file) => ({
            ...file,
            fileUrl: service.storage.getFileView("6777e4e6000fd92f38ea", file.$id), 
          }));
          setRecordings(filesWithUrls);
        }
      } catch (error) {
        console.error("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, []);
  

  const handleZoneSelection = (zone) => {
    setCurrentZone(zone);
    setSentence(''); 
    setCurrentSentence(''); 
    setTimer(0); 
    setRecordedAudio(null); 
  };


  const handleSentenceSelection = (selectedSentence) => {
    setCurrentSentence(selectedSentence);
    setSentence(selectedSentence); 
  };

  
  const startRecording = () => {
    setIsRecording(true);
    audioChunksRef.current = [];
    setTimer(0); 
    

    intervalRef.current = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);

  
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl); 
        
          if (userId && audioBlob) {
            const name = prompt("Enter a name for your recording:");
            if (name) {
              try {
                const file = new File([audioBlob], `${name}.wav`, { type: "audio/wav" });
        
                if (file) {
                  const fileUploadResponse = await service.uploadRecordingFile(file, name, userId);
        
                  const updatedRecordings = await service.listFiles(userId);
                  console.log("Updated Recordings: ", updatedRecordings);
                  setRecordings(updatedRecordings || []); 
                } else {
                  console.error("File initialization failed.");
                }
              } catch (error) {
                console.error("Error saving recording:", error);
              }
            }
          }
        };

        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(intervalRef.current); 
    mediaRecorderRef.current.stop();
  };


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="grid grid-cols-3 gap-8 p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Select Zone</h2>
        {Object.keys(zones).map((zone, index) => (
          <button
            key={index}
            onClick={() => handleZoneSelection(zone)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 px-4 rounded-md hover:opacity-80 transition duration-200"
          >
            {zone.charAt(0).toUpperCase() + zone.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-semibold">{currentZone === 'musicRecording' ? 'Music Recording' : currentSentence || 'No sentence selected'}</h2>

        <div className="bg-gray-800 rounded-lg p-6 w-80 text-center">
          {currentZone && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{currentZone.charAt(0).toUpperCase() + currentZone.slice(1)} Zone</h3>
              <p className="text-sm text-gray-400">{currentZone === 'musicRecording' ? 'Record your own music:' : 'Please record the selected sentence:'}</p>
            </div>
          )}

          {isRecording && (
            <div className="mb-4">
              <span className="text-lg">{formatTime(timer)}</span>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={startRecording}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-200"
              disabled={isRecording}
            >
              Start Recording
            </button>
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition duration-200"
              disabled={!isRecording}
            >
              Stop Recording
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
      <div className="col-span-3 mt-8 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">All Recordings</h3>
        <div className="space-y-4">
          {recordings.length > 0 ? (
            recordings.map((recording) => (
              <div key={recording.$id} className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm font-semibold">{recording.name}</p>
                <audio
                  controls
                  className="w-full mt-2"
                  onError={(e) => console.error("Error playing audio:", e, recording.fileUrl)}
                >
                  <source src={recording.fileUrl} type="audio/wav" />
                </audio>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No recordings found.</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Player;
