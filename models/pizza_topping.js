const { Model } = require('objection');
const path = require('path');

class Pizza_Topping extends Model {
  
  static get tableName () {
    return 'pizza_topping'
  }
};

module.exports = Pizza_Topping;