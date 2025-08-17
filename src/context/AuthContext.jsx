import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

// 把context包成自定義的hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); //從auth取得的user
  const [userData, setUserData] = useState(null); //從firestore取得的user資料
  const [isLoading, setIsLoading] = useState(true); //用到與登入者有關的資料都要確認載入完畢

  useEffect(() => {
    //每次重新渲染時，都會檢查使用者是否登入
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error("抓取使用者資料時發生錯誤:", error);
          setUserData(null);
        }
      } else {
        // 未登入
        setUserData(null);
      }
      // 確保 userData 載入完成後才設置 isLoading 為 false
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userData,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
