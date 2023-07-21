import { useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext.js';

export default function Inventory() {
  const { itemList, setItemList, userList, setUserList } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then((response) => response.json())
      .then((data) => {
        setItemList(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });

    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [setItemList, setUserList]);

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  if (itemList.length > 0 && userList.length > 0) {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>User ID</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={index} onClick={() => handleItemClick(item.id)}>
                <td>{item.item_name}</td>
                <td>{item.quantity}</td>
                <td>{item.user_id}</td>
                <td>{item.description.length > 100 ? `${item.description.slice(0, 97)}...` : item.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }

  return (<p>There are no items in the inventory.</p>);
}
