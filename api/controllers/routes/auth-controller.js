'use strict';

var router = require('express').Router();
var AuthenticationService = require('../../application-services/authentication-service');
var authenticationService = new AuthenticationService();
var dictTotal = require('../../constants/dictTotal')
var dict = dictTotal['pt-br']

//TODO treat errors with some middleware
router.post('/register', function(req, res, next) {
    let newUser = { role: 'admin' };
    Object.assign(newUser, req.body);

	authenticationService.registerUser(newUser)
    .then((data) => {
      //TODO review the information that needs to be returned
        res.json(data);
      })
    .catch((err) => {
          console.log(err);
          next();
      });
});

router.post('/authenticate', function(req, res, next) {
    authenticationService.authenticate(req.body)
    .then((data) => {
        res.json({
          success: true,
          token: data.token,
          user: data.user
        });
    })
    .catch((err) => {
        //console.log('router.post.authenticate', err);
        
        res.status(403).send({ error: dict[autentication][errorUserNotFound] }) // dict[autentication][errorUserNotFound]
    })
});

module.exports = router;
