const createError = require('http-errors');
const mongoose = require('mongoose');

const { Report, Resolved } = require('../Models/Report.model');
const initData = require('../initData.json');

module.exports = {
  getAllReports: async (req, res, next) => {
    try {
      const results = await Report.find({ state: 'OPEN' });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  getResolvedReports: async (req, res, next) => {
    try {
      const resolvedIdsObjects = await Resolved.find({});
      const resolvedIds = resolvedIdsObjects.map(r => r.reportId);
      const results = await Report.find({ '_id': { $in: resolvedIds } });;
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  getBlockedCount: async (req, res, next) => {
    try {
      const resolvedCount = await Resolved.countDocuments({});
      const closedCount = await Report.countDocuments({ state: 'CLOSED' })
      res.send({ count: closedCount - resolvedCount });
    } catch (error) {
      console.log(error.message);
    }
  },

  fillDatabase: async (req, res, next) => {
    try {
      await Report.deleteMany({}); // delete all records
      await Resolved.deleteMany({});
      const data = JSON.parse(JSON.stringify(initData)) // load json
      await Report.insertMany(data.elements); // insert json data to database
      res.send(true)
    } catch (error) {
      console.log(error.message);
      res.send(false)
    }
  },

  resolveReport: async (req, res, next) => {
    const reportId = req.params.reportId;
    try {
      let report = await Report.findById(reportId).exec();
      if (report && report.state === 'OPEN') {
        report.state = 'CLOSED';

        var query = { reportId: reportId },
          update = { expire: new Date() },
          options = { upsert: true, new: true };

        Resolved.findOneAndUpdate(query, update, options, function (err, _) {
          if (err) {
            console.log(err);
            res.send(false);
          }
        });

        Report.findByIdAndUpdate(reportId, report, { upsert: true }, function (err, _) {
          if (err) {
            console.log(err)
            res.send(false);
          }
        })

        res.send({
          "ticketState": "CLOSED"
        });
      } else {
        res.send(false);
      }
    } catch (error) {
      console.log(error.message);
      res.send(false);
    }
  },

  blockReport: async (req, res, next) => {
    const reportId = req.params.reportId;
    try {
      let report = await Report.findById(reportId).exec();
      if (report && report.state === 'OPEN') {
        report.state = 'CLOSED';
        Report.findByIdAndUpdate(reportId, report, { upsert: true }, function (err, _) {
          if (err) {
            console.log(err)
            res.send(false);
          }
        })

        res.send({
          "ticketState": "CLOSED"
        });
      } else {
        res.send(false)
      }
    } catch (error) {
      console.log(error.message);
      res.send(false);
    }
  },
};
