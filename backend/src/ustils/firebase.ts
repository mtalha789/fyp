// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { ApiError } from "./ApiError";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import fs from 'fs'

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
    const storageRef =ref(storage, file.originalname + '-' + Date.now() + '-' + file.size + '-' + file.mimetype);
  
    const metadata = {
      contentType: file.mimetype,
      size : file.size
    }
  
    console.log('File uploading...');
    
    const snapshot = await uploadBytesResumable(storageRef,  fs.readFileSync(file.path), metadata)
  
    const downloadURL = await getDownloadURL(snapshot.ref)
  
    console.log('File uploaded successfully', downloadURL);
    fs.unlinkSync(file.path)
  
    return downloadURL
  } catch (error) {
    console.log(error);
    fs.unlinkSync(file.path)
    throw new ApiError('Error uploading file:' + error,500)
  }
}

export const deletedOnFirebase = async (url : string) => {
  try {
    console.log('deleting file...');
    
    const storageRef = ref(storage, url);
    await deleteObject(storageRef)
    console.log('File deleted successfully', url);
    
  } catch (error) {
    throw new ApiError('Error deleting file:' + error,500)
  }
}