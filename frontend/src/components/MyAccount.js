import React, { useState, useEffect, useContext } from "react";
import { Table, button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext.js";
import CreateItemModal from "./CreateItemModal";

function MyAccount({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [userItems, setUserItems] = useState([]);
  const { itemList, userList, setUserList, currentUser, setCurrentUser } = useContext(AppContext);
  const [showCreateItemModal, setShowCreateItemModal] = useState(false);

  const handleUserDelete = () => {
    fetch(`http://localhost:3001/users/${currentUser.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedUserList = userList.filter((user) => user.id !== currentUser.id);
          setUserList(updatedUserList);
          window.alert('User deleted successfully.');
          setIsLoggedIn(false);
          navigate("/");
        } else {
          throw new Error('Failed to delete user');
        }
      })
      .catch((error) => {
        console.error('Delete error:', error);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3001/user-items/${currentUser.id}`)
      .then((response) => response.json())
      .then((data) => setUserItems(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [currentUser.id]);

  useEffect(() => {
    fetch(`http://localhost:3001/user-items/${currentUser.id}`)
      .then((response) => response.json())
      .then((data) => setUserItems(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [itemList]);

  return (
    <>
      <button onClick={handleUserDelete}>Delete User</button>
      <button onClick={() => setShowCreateItemModal(true)}>Create Item</button>
      {userItems.length > 0 && userList.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>User ID</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userItems.map((item) => (
              <tr key={item.id}>
                <td>{item.item_name}</td>
                <td>{item.quantity}</td>
                <td>{item.user_id}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => navigate(`/user-item-details/${item.id}`)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>You do not have any items.</p>
      )}
      <CreateItemModal
        showModal={showCreateItemModal}
        onCloseModal={() => setShowCreateItemModal(false)}
      />
    </>
  );
}

export default MyAccount;
