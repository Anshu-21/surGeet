import { Client, Databases, Storage } from "appwrite";
import authService from "../appwrite/auth";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("677351890026d97dd5a6"); // Replace with your Appwrite project ID

const databases = new Databases(client);
const storage = new Storage(client); // Initialize the storage service

// Function to upload recording
const uploadRecording = async (file, metadata) => {
  try {
    const response = await storage.createFile(
      "6777e4e6000fd92f38ea", // Replace with your Appwrite storage bucket ID
      "unique()",  // Generate a unique file ID
      file
    );

    // Store metadata in the database
    await databases.createDocument(
      "6777dcf30030191a36ec", // Replace with your database ID
      "6777de770002c58af978", // Replace with your collection ID
      "unique()", // Generate a unique document ID
      {
        recording_name: metadata.recording_name,
        file_url: response.$id, // Reference to the uploaded file
        uploaded_by: metadata.uploaded_by,
      }
    );
  } catch (error) {
    console.error("Error uploading recording:", error);
    throw error;
  }
};

// Function to list recordings
const listRecordings = async () => {
  try {
    const response = await databases.listDocuments(
      "6777dcf30030191a36ec", // Replace with your database ID
      "6777de770002c58af978"  // Replace with your collection ID
    );
    return response;
  } catch (error) {
    console.error("Error fetching recordings:", error);
    throw error;
  }
};

export default {
  client,
  databases,
  storage,
  uploadRecording,
  listRecordings,
};
