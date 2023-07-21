import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext.js";
import LoginPage from "./LoginPage";

function LoginModal({ setIsLoggedIn }) {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ background: "#fff", padding: "20px", borderRadius: "5px" }}>
            <LoginPage setIsLoggedIn={setIsLoggedIn} closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}

export default LoginModal;
