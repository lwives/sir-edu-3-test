'use strict';

const router = require('express').Router();
const DocumentService = require('../../models/services/document-service');
const documentService = new DocumentService();

router.post('/adaptation', function(req, res, next) {
    let newAdaptation = {
        _createdBy: req.user._id,
        _studentId: req.body.studentId,
        date: req.body.date || '',
        grade: req.body.grade || '',
        class: req.body.class || '',
        period: req.body.period || '',
        matters: req.body.matters || '',
        teacher: req.body.teacher || '',
        adappitationHistoric: req.body.adappitationHistoric || '',
        adaptationNeed: req.body.adaptationNeed || '',
        programGolas: req.body.programGolas || '',
        suggetionGols: req.body.suggetionGols || '',
        programConceptual: req.body.programConceptual || '',
        suggetionConceptual: req.body.suggetionConceptual || '',
        programContents: req.body.programContents || '',
        suggestionContents: req.body.suggestionContents || '',
        programEvaluation: req.body.programEvaluation || '',
        suggestionEvaluation: req.body.suggestionEvaluation || '',
        type: 'adaptation'
    };
console.log('req', req.body);

    documentService.save(newAdaptation)
        .then((data) => {
            console.log('data', data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            next(err);
    });
});

router.get('/adaptation', function(req, res, next) {
    documentService.find({ _createdBy: req.user._id, _studentId: req.query.studentId })
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
    documentService.findById(req.params.id)
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
