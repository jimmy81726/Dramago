import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";

import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";

const FrontLayout = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const openRegisterModal = () => setShowRegisterModal(true);
  const closeRegisterModal = () => setShowRegisterModal(false);

  return (
    <>
      <Header
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
      />
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
