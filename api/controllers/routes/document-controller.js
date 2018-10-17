'use strict';

const router = require('express').Router();
const DocumentService = require('../../models/services/document-service');
const documentService = new DocumentService();

router.post('/document', function(req, res, next) {
    let newDocument = {
        _createdBy: req.user._id,
        _studentId: req.body.studentId,
        title: req.body.title || '',
        text: req.body.text || '',
        date: req.body.date || '',
        type: 'document'
    };

    documentService.save(newDocument)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            next(err);
    });
});

router.get('/document', function(req, res, next) {
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
router.get('/document/:id', function(req, res, next) {
    documentService.findById(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        })
});

router.delete('/document/:id', function(req, res, next) {
    res.end();
});

router.put('/document', function(req, res, next) {
    res.end();
});

module.exports = router;
