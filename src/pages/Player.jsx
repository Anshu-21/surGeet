import React, { useState, useRef, useEffect } from "react";
import service from "../appwrite/config";
import authService from "../appwrite/auth";

const Player = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [timer, setTimer] = useState(0);
  const [recordingName, setRecordingName] = useState("");
  const [recordings, setRecordings] = useState([]);
  const [volume, setVolume] = useState(1);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const intervalRef = useRef(null);

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

  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    audioChunksRef.current = [];
    setTimer(0);

    intervalRef.current = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });

          if (recordingName) {
            const file = new File([audioBlob], `${recordingName}.wav`, {
              type: "audio/wav",
            });

            try {
              const user = await authService.getCurrentUser(); 
              const metadata = {
                recording_name: recordingName,
                uploaded_by: user.$id,
              };

              const uploadedData = await service.uploadRecording(file, metadata);

              const updatedRecordings = await service.listRecordings();
              setRecordings(updatedRecordings.documents || []);
              setRecordingName("");
            } catch (error) {
              console.error("Error saving recording:", error);
            }
          } else {
            alert("Please provide a name for the recording.");
          }
        };

        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(intervalRef.current);
    mediaRecorderRef.current.stop();
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(intervalRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setIsPaused(false);

      intervalRef.current = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div className="grid grid-cols-4 px-3 bg-gray-900 min-h-screen text-white">
      <div className="col-span-1 bg-gray-800 p-6 rounded-lg flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-6rem)]">
      
        <h3 className="text-xl font-semibold mb-4">All Recordings</h3>
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
      
       
      </div>

      <div className="col-span-3 flex flex-col items-center justify-center space-y-6">
        <div className="w-full max-w-lg bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Record Your Track
          </h2>
          <div className="mb-4">
            <label
              htmlFor="recordingName"
              className="block text-sm font-medium mb-2"
            >
              Recording Name
            </label>
            <input
              id="recordingName"
              type="text"
              value={recordingName}
              onChange={(e) => setRecordingName(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white"
              placeholder="Enter recording name..."
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={startRecording}
              className="bg-green-500 text-white px-12 py-2 rounded-lg hover:bg-green-400"
              disabled={isRecording}
            >
              Start
            </button>
            
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white px-12 py-2 rounded-lg hover:bg-red-400"
              disabled={!isRecording}
            >
              Stop
            </button>
          </div>
          <div>
            <p className="text-center text-sm text-gray-400">
              Recording Duration: {formatTime(timer)}
            </p>
            <div className="bg-gray-700 w-full h-2 rounded-lg mt-2">
              <div
                className="bg-blue-500 h-2 rounded-lg"
                style={{ width: `${(timer / 60) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
