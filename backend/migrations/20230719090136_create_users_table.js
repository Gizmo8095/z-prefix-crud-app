exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.smallint('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('username');
      table.string('password');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  