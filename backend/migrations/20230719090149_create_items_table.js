exports.up = function(knex) {
    return knex.schema.createTable('items', function(table) {
      table.smallint('id').primary();
      table.smallint('user_id');
      table.string('item_name');
      table.string('description');
      table.smallint('quantity');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('items');
  };
  