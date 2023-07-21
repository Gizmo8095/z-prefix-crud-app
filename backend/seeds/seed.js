exports.seed = function(knex) {
    const dropUsersTable = () => {
      return knex.schema.dropTableIfExists('users');
    };
  
    const dropItemsTable = () => {
      return knex.schema.dropTableIfExists('items');
    };
  
    const createUsersTable = () => {
      return knex.schema.createTable('users', (table) => {
        table.smallint('id').primary();
        table.string('first_name');
        table.string('last_name');
        table.string('username');
        table.string('password');
      });
    };
  
    const createItemsTable = () => {
      return knex.schema.createTable('items', (table) => {
        table.smallint('id').primary();
        table.smallint('user_id');
        table.string('item_name');
        table.string('description');
        table.smallint('quantity');
      });
    };
  
    const checkUsersTable = () => {
      return knex.schema.hasTable('users');
    };
  
    const checkItemsTable = () => {
      return knex.schema.hasTable('items');
    };
  
    const seed = async () => {
      await dropItemsTable();
      await dropUsersTable();
  
      await createUsersTable();
      await knex('users').insert([
        { id: 1, first_name: 'John', last_name: 'Doe', username: 'johndoe', password: 'password1' },
        { id: 2, first_name: 'Jane', last_name: 'Smith', username: 'janesmith', password: 'password2' }
      ]);
      console.log('Users table created and seeded.');
  
      await createItemsTable();
      await knex('items').insert([
        { id: 1, user_id: 1, item_name: 'Item 1', description: 'this is an item description that I am writing out so that it is very long purely for the sake that it is very long. I am not intending on this data being any amount of useful, I just want to test if the description truncation works as intended.', quantity: 5 },
        { id: 2, user_id: 1, item_name: 'Item 2', description: 'Description 2', quantity: 10 },
        { id: 3, user_id: 2, item_name: 'Item 3', description: 'Description 3', quantity: 3 }
      ]);
      console.log('Items table created and seeded.');
    };
  
    return seed();
  };
  