var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var Vendor = sequelize.import('../models/vendormodel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post("/addvendor", function(req, res) {

    Vendor
      .create({
        name: req.body.vendor.name,
        coffee: req.body.vendor.coffee,
        price: req.body.vendor.price,
        email: req.body.vendor.email,
        vendorCreator: req.body.vendor.vendorCreator
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
  router.get("/allvendors", function(req, res) {

    Vendor
    .findAll({
      attributes: ['id', 'name', 'coffee', 'price', 'email', 'vendorCreator']
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

module.exports = router;