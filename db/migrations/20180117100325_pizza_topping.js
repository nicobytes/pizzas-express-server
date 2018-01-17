exports.up = function(knex, Promise) {
  Promise.all([
    knex.schema.createTable('pizza_topping', (table) => {
      table.increments('id').primary().unsigned()
      table.integer('pizza').unsigned()
      table.integer('topping').unsigned()
    })
  ])
};

exports.down = function(knex, Promise) {
  Promise.all([
    knex.schema.dropTable('pizza_topping')
  ])
};