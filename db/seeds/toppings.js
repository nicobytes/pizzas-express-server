
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('toppings').del()
    .then(function () {
      // Inserts seed entries
      return knex('toppings').insert([
        {
          "id": 1,
          "name": "anchovy"
        },
        {
          "id": 2,
          "name": "bacon"
        },
        {
          "id": 3,
          "name": "basil"
        },
        {
          "id": 4,
          "name": "chili"
        },
        {
          "id": 5,
          "name": "mozzarella"
        },
        {
          "id": 6,
          "name": "mushroom"
        },
        {
          "id": 7,
          "name": "olive"
        },
        {
          "id": 8,
          "name": "onion"
        },
        {
          "id": 9,
          "name": "pepper"
        },
        {
          "id": 10,
          "name": "pepperoni"
        },
        {
          "id": 11,
          "name": "sweetcorn"
        },
        {
          "id": 12,
          "name": "tomato"
        }
      ]);
    });
};
