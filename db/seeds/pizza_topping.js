
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pizza_topping').del()
    .then(function () {
      // Inserts seed entries
      return knex('pizza_topping').insert([
        {id: 1, pizza: 1, topping: 1},
        {id: 2, pizza: 1, topping: 3},
        {id: 3, pizza: 1, topping: 4},
      ]);
    });
};
