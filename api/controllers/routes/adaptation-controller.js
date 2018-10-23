'use strict';

const router = require('express').Router();
const AdaptationService = require('../../models/services/adaptation-service');
const adaptationService = new AdaptationService();

router.post('/adaptation', function(req, res, next) {
    let newAdaptation = {
        _createdBy: req.user._id,
        _studentId: req.body.studentId,
        title: req.body.title || '',
        text: req.body.text || '',
        date: req.body.date || '',
        type: 'adaptation'
    };

    adaptationService.save(newAdaptation)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            next(err);
    });
});

router.get('/adaptation', function(req, res, next) {
    adaptationService.find({ _createdBy: req.user._id, _studentId: req.query.studentId })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            //TODO middleware to handle errors
            console.log(err);
            next(err);
        })
});

//TODO check if user has control over the student
router.get('/adaptation/:id', function(req, res, next) {
    adaptationService.findById(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        })
});

router.delete('/adaptation/:id', function(req, res, next) {
    res.end();
});

router.put('/adaptation', function(req, res, next) {
    res.end();
});

module.exports = router;
