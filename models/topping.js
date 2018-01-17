const { Model } = require('objection');
const path = require('path');

class Topping extends Model {
  
  static get tableName () {
    return 'toppings'
  }
};

module.exports = Topping;