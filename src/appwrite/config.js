import { Client, Databases, Storage, Query, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject("677351890026d97dd5a6"); 

const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);

const getCurrentUser = async () => {
  try {
    const session = await account.getSession("current");
    if (session) {
      return await account.get();
    }
    return null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw new Error("Unable to fetch current user.");
  }
};

const createPlaylist = async ({ playlistName, playlistDescription, tracks = [] }) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User is not authenticated.");

    const userId = currentUser.$id;

    const playlist = await databases.createDocument(
      "6777dcf30030191a36ec", 
      "6777dd830024d8068010", 
      "unique()",
      {
        playlist_name: playlistName,
        description: playlistDescription,
        user_id: userId,
        track_ids: [],
      }
    );

    const trackIds = [];
    for (const track of tracks) {
      if (!track.name || !track.url) {
        throw new Error("Each track must have a name and URL.");
      }

      const trackDoc = await databases.createDocument(
        "6777dcf30030191a36ec", 
        "6777ddd8003dd9c01604", 
        "unique()",
        {
          track_name: track.name,
          track_url: track.url,
          playlist_id: playlist.$id,
        }
      );
      trackIds.push(trackDoc.$id);
    }

    await databases.updateDocument(
      "6777dcf30030191a36ec",
      "6777dd830024d8068010",
      playlist.$id,
      { track_ids: trackIds }
    );

    return playlist;
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
};

const fetchPlaylists = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User is not authenticated.");

    const userId = currentUser.$id;

    const response = await databases.listDocuments(
      "6777dcf30030191a36ec", 
      "6777dd830024d8068010", 
      [Query.equal("user_id", userId)]
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
};

export default {
  client,
  databases,
  storage,
  getCurrentUser,
  createPlaylist,
  fetchPlaylists,
};
