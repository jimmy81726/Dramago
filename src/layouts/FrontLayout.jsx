import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import MobileMenu from "../components/MobileMenu";

const FrontLayout = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const openRegisterModal = () => setShowRegisterModal(true);
  const closeRegisterModal = () => setShowRegisterModal(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //狀態一路往下傳到hambergurMenu才觸發
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const headerRef = useRef(null);
  //打開手機板menu背景不滑動
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  //當路由變化時關閉手機板menu
  const location = useLocation();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  //在畫面繪製前監測header高度設定變數
  useLayoutEffect(() => {
    if (!headerRef.current) {
      return;
    }
    // 設定CSS變數 --header-h 為header的高度(因為響應式設計，header高度會變化)
    const apply = () => {
      const h = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    // 監聽的dom只要變化就執行()
    const ro = new ResizeObserver(apply);
    ro.observe(headerRef.current);
    // 補初始值先執行一次
    apply();
    // 清理函數，當組件卸載時斷開觀察器
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <Header
        ref={headerRef}
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} />
      <Outlet />
      <Footer />
      <LoginModal
        onClose={closeLoginModal}
        show={showLoginModal}
        openRegisterModal={openRegisterModal}
      />
      <RegisterModal
        onClose={closeRegisterModal}
        show={showRegisterModal}
        openLoginModal={openLoginModal}
      />
    </>
  );
};

export default FrontLayout;
