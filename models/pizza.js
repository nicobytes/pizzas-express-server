const { Model } = require('objection');
const path = require('path');

class Pizza extends Model {
  
  static get tableName () {
    return 'pizzas'
  }

  static get relationMappings () {
    return {
      toppings: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, '/topping'),
        join: {
          from: 'pizzas.id',
          through: {
            from: 'pizza_topping.pizza',
            to: 'pizza_topping.topping'
          },
          to: 'toppings.id'
        }
      }
    }
    
  }
};

module.exports = Pizza;