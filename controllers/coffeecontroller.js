var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var Coffee = sequelize.import('../models/coffeemodel');

router.post("/addcoffee", function(req, res) {

  Coffee
    .create({
      name: req.body.coffee.name,
      beanType: req.body.coffee.beanType,
      roast: req.body.coffee.roast,
      amount: req.body.coffee.amount,
      addedBy: req.body.coffee.addedBy
    })
    .then(
      function createSuccess(name) {
        res.json({
          name: name
        });

      },
      function createError(err) {
        res.send(500, err.message);
      }
    );
})

router.put('/update/:id', function(req, res) {
var data = req.params.id;

Coffee
    .update({
      name: req.body.coffee.name,
      beanType: req.body.coffee.beanType,
      roast: req.body.coffee.roast,
      amount: req.body.coffee.amount,
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedCoffee) {
            res.json({
                name: req.body.coffee.name,
                beanType: req.body.coffee.beanType,
                roast: req.body.coffee.roast,
                amount: req.body.coffee.amount,
            });            
        },
        function updateError(err){ 
            res.send(500, err.message);
        }
    )
});
router.get("/singlecoffee/:name", function(req, res) {

  Coffee
  .findOne({
    where: {name: req.params.name}
  })
  .then(
    function findOneSuccess(data){
        res.json(data)
    },
    function findOneError(err) {
        res.send(500, err.meassge)
    }
  )
})
router.get("/allcoffee", function(req, res) {

  Coffee
  .findAll({
    attributes: ['id', 'name', 'beanType', 'roast', 'amount', 'addedBy']
  })
  .then(
    function findAllSuccess(data) {
        console.log("Controller data:", data);
        res.json(data);
    },
    function findAllError(err) {
        res.send(500, err.message);
    }
);
})
router.delete('/delete/:id', function(req, res) {
  var data = req.params.id;
  //var user = req.user.id; 

  Coffee
      .destroy({ 
          where: { id: data}
      }).then(
          function deleteLogSuccess(data){ 
              res.send("you successfully deleted this coffee item");
          },
          function deleteLogError(err){ 
              res.send(500, err.message);
          }
      );
});

module.exports = router;