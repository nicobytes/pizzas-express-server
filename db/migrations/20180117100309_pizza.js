exports.up = function(knex, Promise) {
  Promise.all([
    knex.schema.createTable('pizzas', (table) => {
      table.increments('id').primary().unsigned()
      table.string('name')
    })
  ])
};

exports.down = function(knex, Promise) {
  Promise.all([
    knex.schema.dropTable('pizzas')
  ])
};