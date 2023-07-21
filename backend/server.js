require('dotenv').config();
const cors = require('cors');

const express = require('express');
const app = express();
const knex = require('knex');
const PORT = 3001;

app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'PostGreSQL', 
    database: process.env.DB_NAME || 'db',
    port: process.env.DB_PORT || 5432,
  },
});

app.use(express.json());


app.get('/users', (req, res) => {
  db.select('*')
    .from('users')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving data from the database' });
    });
});

// Get a user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where('id', id)
    .then((data) => {
      if (data.length > 0) {
        res.json(data[0]);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving data from the database' });
    });
});

// Create a new user
app.post('/users', (req, res) => {
    console.log(req)
  const { id, first_name, last_name, username, password } = req.body;
  db.insert({ id, first_name, last_name, username, password })
    .into('users')
    .returning('*')
    .then((data) => {
      res.json(data[0]);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error inserting data into the database' });
    });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, username, password } = req.body;
  db('users')
    .where('id', id)
    .update({ first_name, last_name, username, password })
    .returning('*')
    .then((data) => {
      if (data.length > 0) {
        res.json(data[0]);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error updating data in the database' });
    });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db('users')
    .where('id', id)
    .del()
    .then((count) => {
      if (count > 0) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error deleting data from the database' });
    });
});

// Get all items
app.get('/items', (req, res) => {
  db.select('*')
    .from('items')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving data from the database' });
    });
});

// Get an item by ID
app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  db.select('*')
    .from('items')
    .where('id', id)
    .then((data) => {
      if (data.length > 0) {
        res.json(data[0]);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving data from the database' });
    });
});

// Create a new item
app.post('/items', (req, res) => {
  const { id, user_id, item_name, description, quantity } = req.body;
  db.insert({ id, user_id, item_name, description, quantity })
    .into('items')
    .returning('*')
    .then((data) => {
      res.json(data[0]);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error inserting data into the database' });
    });
});

// Update an item
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, item_name, description, quantity } = req.body;
  db('items')
    .where('id', id)
    .update({ user_id, item_name, description, quantity })
    .returning('*')
    .then((data) => {
      if (data.length > 0) {
        res.json(data[0]);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error updating data in the database' });
    });
});

// Delete an item
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  db('items')
    .where('id', id)
    .del()
    .then((count) => {
      if (count > 0) {
        res.json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error deleting data from the database' });
    });
});

// Get all items for a user
app.get('/user-items/:user_id', (req, res) => {
    const { user_id } = req.params;
    db.select('*')
      .from('items')
      .where('user_id', user_id)
      .then((data) => {
        if (data.length > 0) {
          res.json(data);
        } else {
          res.status(404).json({ error: 'Items not found for the user' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error retrieving data from the database' });
      });
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
