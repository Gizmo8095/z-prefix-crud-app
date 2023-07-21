import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext.js";
import CreateUserModal from "./CreateUserModal"; 

function LoginPage({ setIsLoggedIn, closeModal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const { userList, setUserList, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = userList.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      closeModal();
      navigate("/myaccount");
    } else {
      setLoginError(true);
      setUsername("");
      setPassword("");
    }
  };

  const handleCreateUser = (newUser) => {
    const isUsernameTaken = userList.some((user) => user.username === newUser.username);

    if (isUsernameTaken) {
      setLoginError(true);
    } else {
      const newId = getUniqueUserId();
      newUser.id = newId;

      setUserList((prevUserList) => [...prevUserList, newUser]);

      setCurrentUser(newUser);
      setIsLoggedIn(true);

      setShowCreateUserModal(false);
      navigate("/myaccount");
    }
  };

  const getUniqueUserId = () => {
    let newId = 1;
    while (userList.some((user) => user.id === newId)) {
      newId++;
    }
    return newId;
  };

  return (
    <>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "5px" }}>
        <h2>Login</h2>
        {loginError && <p style={{ color: "red" }}>Username or Password is incorrect</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={closeModal}>Cancel</button>
        <div>
          <button onClick={() => setShowCreateUserModal(true)}>Create User</button>
        </div>
      </div>

      {showCreateUserModal && (
        <CreateUserModal
          onClose={() => setShowCreateUserModal(false)}
          onUserCreate={handleCreateUser}
          userList={userList}
        />
      )}
    </>
  );
}

export default LoginPage;
