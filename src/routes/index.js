var express = require('express');
var router = express.Router();

// root route
router.get('/', function(req, res) {
  res.send('Hello from ' + req.path);
});

// test route
router.get('/api/users', function(req, res) {
  res.json({
    results: [
      {
        name: 'bono'
      },
      {
        name: 'jono'
      },
      {
        name: 'pono'
      },
      {
        name: 'mono'
      }
    ]
  });
});

// chef's meals route
router
  .route('/api/chefs/meals')
  .all(function(req, res, next) {
    next();
  })
  .get(function(req, res, next) {
    res.json({
      results: [
        {
          id: 12345,
          id_Chef: 12345,
          name: 'Ramen',
          description: 'Served with pork and veggies',
          delivery_datetime: '2017-05-31 18:00:00',
          pickup_info: 'Park in driveway',
          price: 6,
          servings: 10,
          images: 'https://greatist.com/sites/default/files/SlowCooker-Pork-Ramen_0.jpg',
          address: '123 main st',
          city: 'Springfield',
          state: 'CA',
          zipcode: 99999,
          rating: 5,
          review_count: 10,
          num_ordered: 2,
          total_ordered: 30,
          time_created: '2017-05-15 10:10:00',
          time_updated: '2017-05-15 10:10:00'
        }
      ]
    });
    next();
  })
  .post(function(req, res) {
    res.json(req.body);
  });
module.exports = router;
