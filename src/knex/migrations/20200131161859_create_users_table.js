exports.up = function (knex) {
  return knex.schema
    .createTable('test_table', function (table) {
      table.increments('user_id');
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("test_table");
};
