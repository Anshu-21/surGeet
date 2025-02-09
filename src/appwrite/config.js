import { Client, Databases, Storage } from "appwrite";
import conf from '../conf/conf.js';

const client = new Client();

client
.setEndpoint(conf.appwriteUrl) 
.setProject(conf.appwriteProjectId);

const databases = new Databases(client);
const storage = new Storage(client);

const uploadRecording = async (file, metadata) => {
  try {
    const response = await storage.createFile(
      "6777e4e6000fd92f38ea",
      "unique()",
      file
    );

    await databases.createDocument(
      "6777dcf30030191a36ec",
      "6777de770002c58af978",
      "unique()",
      {
        recording_name: metadata.recording_name,
        file_url: response.$id,
        uploaded_by: metadata.uploaded_by,
      }
    );
  } catch (error) {
    console.error("Error uploading recording:", error);
    throw error;
  }
};

const listRecordings = async () => {
  try {
    const response = await databases.listDocuments(
      "6777dcf30030191a36ec",
      "6777de770002c58af978"
    );
    return response;
  } catch (error) {
    console.error("Error fetching recordings:", error);
    throw error;
  }
};

const fetchFiles = async () => {
  try {
    const response = await storage.listFiles("6777e4e6000fd92f38ea");
    return response;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};


export default {
  client,
  databases,
  storage,
  uploadRecording,
  listRecordings,
  fetchFiles,
};
