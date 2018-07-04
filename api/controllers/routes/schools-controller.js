'use strict';

const router = require('express').Router();
const route = require('../../constants/api-routes');
const Service = require('../../models/services/school-service');
const schoolService = new Service();

router.post('/schools', function (req, res, next) {
    schoolService.saveSchool(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});

router.get('/schools', function (req, res, next) {
    //console.log('list schools. Route:');
    //console.log(schoolService);

    // schoolService.find() //{ _createdBy: req.user._id })
    schoolService.getAll()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            //TODO middleware to handle errors
            next(err);
        })
});

router.get('/schools/:id', function (req, res, next) {
    schoolService.getSchool(req.params.id)
        .then((data) => {
            res.json({
                success: data
            });
        })
        .catch((err) => {
            //TODO middleware to handle errors
            next(err);
        })
});

module.exports = router;
