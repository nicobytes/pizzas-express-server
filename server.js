// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors')

require('./db/setup');


const Pizza = require('./models/pizza');
const Topping = require('./models/topping');
const Pizza_Topping = require('./models/pizza_topping');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/pizzas')
  .get(async function (req, res) {
    const pizza = await Pizza
    .query()
    .eager('toppings');
    if (pizza === undefined){
      res.send(404);
    }
    res.send(pizza);
  })
  .post(async function (req, res) {
    const name = req.body.name;
    const toppings = req.body.toppings || [];
    // create pizza
    const pizza = await Pizza
    .query()
    .insert({name});
    // create toppings
    toppings.forEach(async (topping) => {
      await Pizza_Topping
      .query()
      .insert({
        pizza: pizza.id,
        topping: topping.id
      });
    });
    // get pizza
    const fetch = await Pizza.query().findById(pizza.id).eager('toppings');
    res.send(fetch);
  });

router.route('/pizzas/:id')
  .get(async function (req, res) {
    const id = req.params.id;
    const pizza = await Pizza
    .query()
    .findById(id)
    .eager('toppings');
    if (pizza === undefined){
      res.send(404);
    }
    res.send(pizza);
  })
  .put(async function (req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const toppings = req.body.toppings || [];
    // update name
    const pizza = await Pizza
    .query()
    .patchAndFetchById(id,{name})
    .eager('toppings');
    // delete toppings by pizza
    const deletes = await Pizza_Topping
    .query()
    .delete()
    .where('pizza', '=', pizza.id);
    // create news toppings
    toppings.forEach(async (topping) => {
      await Pizza_Topping
      .query()
      .insert({
        pizza: pizza.id,
        topping: topping.id
      });
    });
    // fetch
    const fetch = await Pizza.query().findById(pizza.id).eager('toppings');
    res.send(fetch);
  })
  .delete(async function (req, res) {
    const id = req.params.id;
    // get pizza
    const pizza = await Pizza
    .query()
    .findById(id)
    .eager('toppings');
    // delete toppings
    const result = await Pizza_Topping
    .query()
    .delete()
    .where('pizza', '=', pizza.id);
    // delete pizza
    const fetch = await Pizza
    .query()
    .deleteById(pizza.id);
    res.sendStatus(200);
  });

router.route('/toppings')
  .get(async function (req, res) {
    res.send(await Topping.query());
  });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);