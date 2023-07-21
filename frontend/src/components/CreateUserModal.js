import React, { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext.js";

function CreateUserModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const { userList, setUserList } = useContext(AppContext);

  const handleCreateUser = () => {
    const isUsernameTaken = userList.some((user) => user.username === username);
  
    if (isUsernameTaken) {
      setUsernameError(true);
    } else {
      const maxId = Math.max(...userList.map((user) => user.id));
      console.log(userList)
  
      const nextAvailableId = Number(maxId) + 1;
  
      const newUser = {
        id: nextAvailableId,
        first_name: firstName,
        last_name: lastName,
        username,
        password,
      };
      console.log(newUser)
  
      fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserList((prevUserList) => [...prevUserList, data]);
          onClose();
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    }
  };
  
  

  return (
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
        <h2>Create User</h2>
        {usernameError && <p style={{ color: "red" }}>This username is already taken</p>}
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
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button onClick={handleCreateUser}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default CreateUserModal;
