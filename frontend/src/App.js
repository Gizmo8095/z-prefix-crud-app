import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import Inventory from "./components/Inventory";
import ItemDetails from "./components/ItemDetails";
import LoginPage from "./components/LoginPage";
import MyAccount from "./components/MyAccount";
import AppContext from "./AppContext.js";
import UserItemDetails from "./components/UserItemDetails";

function Header({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleLoginbuttonClick = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/"); 
  };

  return (
    <header>
      {isLoggedIn && location.pathname !== "/" && (
        <Link to="/">
          <button>Home</button>
        </Link>
      )}

      {isLoggedIn ? (
        location.pathname !== "/myaccount" ? (
          <Link to="/myaccount">
            <button>My Account</button>
          </Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )
      ) : (
        <button onClick={handleLoginbuttonClick}>Login</button>
      )}

      {showLoginModal && (
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
          <LoginPage setIsLoggedIn={setIsLoggedIn} closeModal={() => setShowLoginModal(false)} />
        </div>
      )}
    </header>
  );
}


function App() {
  const [itemList, setItemList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const provided = {
    itemList,
    setItemList,
    userList,
    setUserList,
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser,
  };

  return (
    <AppContext.Provider value={provided}>
      <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="item/:id" element={<ItemDetails />} />
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/myaccount"
            element={<MyAccount setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route 
            path="/user-item-details/:id"
            element={<UserItemDetails />}
          />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
