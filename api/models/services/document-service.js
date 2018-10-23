'use strict';

let mongoose = require('mongoose');
let BaseService = require('../base-service');

class DocumentService extends BaseService {
    constructor() {
        super('document');
    }
}

module.exports = DocumentService;
