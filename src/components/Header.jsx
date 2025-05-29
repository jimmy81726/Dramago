import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";

const Header = ({ openLoginModal, openRegisterModal }) => {
  const { currentUser, isLoading } = useAuth();
  if (isLoading) {
    return null;
  }

  return (
    <header>
      <div className="d-flex">
        <Link to="/" className="fs-4 me-3">
          Header
        </Link>
        <Link to="/list" className="me-3">
          聚會列表
        </Link>
        {currentUser ? (
          <div>
            <p>歡迎 {currentUser?.displayName}</p>
            <button
              onClick={() => {
                console.log("登出按鈕被點擊");
                signOut(auth);
              }}
            >
              登出
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                console.log("登入按鈕被點擊");
                openLoginModal();
              }}
            >
              登入
            </button>
            <button
              onClick={() => {
                console.log("註冊按鈕被點擊");
                openRegisterModal();
              }}
            >
              註冊
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
