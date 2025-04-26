import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvyJLnXfmRiqEiGQp5WcTxsTO574m5vl8",
  authDomain: "dramago-8efe6.firebaseapp.com",
  projectId: "dramago-8efe6",
  storageBucket: "dramago-8efe6.firebasestorage.app",
  messagingSenderId: "815069521724",
  appId: "1:815069521724:web:2f08951d0f53ecdaa2e039",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app); //  Storage 上傳圖片用
export const db = getFirestore(app); //  Firestore 用來存網址與描述
