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
        const docSnap = await getDoc(doc(db, "users", user.uid));
        setUserData(docSnap.exists() ? docSnap.data() : null);
      } else {
        setUserData(null);
      }
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
