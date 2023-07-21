import { useEffect, useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../AppContext.js';

export default function UserItemDetails() {
  const { itemList, setItemList, userList, setUserList } = useContext(AppContext);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [editItem, setEditItem] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    if (itemList && itemList.length > 0) {
      const selectedItem = itemList.find((item) => item.id === Number(id));
      setItem(selectedItem);
      setEditItem(selectedItem);
    }
  }, [id, itemList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3001/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editItem),
    })
      .then((response) => {
        if (response.ok) {
          const updatedItemList = itemList.map((item) =>
            item.id === Number(id) ? { ...item, ...editItem } : item
          );
          setItemList(updatedItemList);
                    window.alert('Item updated successfully.');
                    navigate("/myaccount"); 
        } else {
          throw new Error('Failed to update item');
        }
      })
      .catch((error) => {
        console.error('Update error:', error);
      });
  };
  
  

  const handleDelete = () => {
    fetch(`http://localhost:3001/items/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedItemList = itemList.filter((item) => item.id !== Number(id));
          setItemList(updatedItemList);
          window.alert('Item deleted successfully.');
          navigate("/myaccount"); 
        } else {
          throw new Error('Failed to delete item');
        }
      })
      .catch((error) => {
        console.error('Delete error:', error);
      });
  };
   

  if (item && userList) {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>User ID</th>
              <th>Username</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="item_name"
                  value={editItem.item_name}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="quantity"
                  value={editItem.quantity}
                  onChange={handleInputChange}
                />
              </td>
              <td>{item.user_id}</td>
              <td>{userList[item.user_id - 1].username}</td>
              <td>
                <input
                  type="text"
                  name="description"
                  value={editItem.description}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <button onClick={handleUpdate}>Update Item</button>
        <button onClick={handleDelete}>Delete Item</button>
      </>
    );
  }

  return null;
}
