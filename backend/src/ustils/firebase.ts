// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { ApiError } from "./ApiError";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const storage = getStorage(app)

export const uploadOnFirebase = async (file: Express.Multer.File) => {
  try {
    console.log(file);
    const storageRef =ref(storage, file.originalname);
  
    const metadata = {
      contentType: file.mimetype,
      size : file.size
    }
  
    console.log('File uploading...');
    
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata)
  
    const downloadURL = await getDownloadURL(snapshot.ref)
  
    console.log('File uploaded successfully', downloadURL);
  
    return downloadURL
  } catch (error) {
    console.log(error);
    throw new ApiError('Error uploading file:' + error,500)
  }
}