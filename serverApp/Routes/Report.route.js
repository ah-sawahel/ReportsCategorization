const express = require('express');
const router = express.Router();

const ReportController = require('../Controllers/Report.Controller');

//Get a list of all reports
router.get('/', ReportController.getAllReports);

//Get a list of all resolved reports
router.get('/resolved', ReportController.getResolvedReports);

//Get blocked reports count
router.get('/blockedReportsCount', ReportController.getBlockedCount);

//Init database from json file
router.put('/', ReportController.fillDatabase);

//Resolve a report
router.put('/:reportId', ReportController.resolveReport);

//Block a report
router.delete('/:reportId', ReportController.blockReport);

module.exports = router;
