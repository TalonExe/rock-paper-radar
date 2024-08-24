import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const apiKey = import.meta.env.apiKey;
const authDomain = import.meta.env.authDomain;
const projectId = import.meta.env.projectId;
const storageBucket = import.meta.env.storageBucket;
const messagingSenderId = import.meta.env.messagingSenderId;
const appId = import.meta.env.appId;
const measurementId = import.meta.env.measurementId;

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://rock-paper-radar.appspot.com");

export default storage;