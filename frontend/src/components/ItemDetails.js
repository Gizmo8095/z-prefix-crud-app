import { useEffect, useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../AppContext.js';

export default function ItemDetails() {
  const { itemList, setItemList, userList, setUserList } = useContext(AppContext);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (itemList && itemList.length > 0) {
      const selectedItem = itemList.find((item) => item.id === Number(id));
      setItem(selectedItem);
    }
  }, [id, itemList]);

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
              <td>{item.item_name}</td>
              <td>{item.quantity}</td>
              <td>{item.user_id}</td>
              <td>{userList[item.user_id - 1].username}</td>
              <td>{item.description}</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }

  return null;
}
