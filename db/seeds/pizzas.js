
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pizzas').del()
    .then(function () {
      // Inserts seed entries
      return knex('pizzas').insert([
        {id: 1, name: 'test 1'},
        {id: 2, name: 'test 2'},
      ]);
    });
};
