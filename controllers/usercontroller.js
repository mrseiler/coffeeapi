var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var User = sequelize.import('../models/usermodel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/signup', function(req, res) {

    User.create({
        firstName: req.body.user.first_name,
        lastName: req.body.user.last_name,
        email: req.body.user.email,
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 10)

    }).then(
        function createSuccess(user){
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                    user: user,
                    message: 'created',
                    sessionToken: token
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
        if(res.status(500)) {
            send({error: "Please fill out the information correctly"});
        }
    );
});
router.post('/login', function(req, res) {
    User.findOne( { where: { username: req.body.user.username } } )
        .then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function(err, matches){
                    
                    if (matches) {
                        
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
                        res.json({  
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token,
                        });
                    }else { 
                        res.status(502).send({ error: "Wrong combination of username and password." });
                        console.log(error);
                    }
                });
            } else {
                res.status(500).send({ error: "There is no user by that name." });
                console.log(error);
            }
        },
        function(err) {
            res.status(501).send({ error: "Didn't even make it to the compare method." });
            console.log(error);
        }
    );
});

module.exports = router;