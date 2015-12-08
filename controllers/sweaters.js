var express = require('express');
var Sweater = require('../models/sweater');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Sweater.find(function(err, sweaters) {
      if (err) return res.status(500).send(err);
      res.send(sweaters);
    });
  })
  .post(function(req, res) {
    Sweater.create(req.body, function(err, sweater) {
      if (err) return res.status(500).send(err);
      res.send(sweater);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Sweater.findById(req.params.id, function(err, sweater) {
      if (err) return res.status(500).send(err);
      res.send(sweater);
    });
  })
  .put(function(req, res) {
    Sweater.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    Sweater.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;