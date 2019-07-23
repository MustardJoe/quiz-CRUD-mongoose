const { Router } = require('express');
const Jon = require('../models/Jon');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
    } = req.body;

    Jon
      .create({ name, })
      .then(jon => res.send(jon))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Jon
      .find()
      .then(jons => res.send(jons))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Jon
      .findById(req.params.id)
      .then(jon => res.send(jon))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const {
      count
    } = req.body;

    Jon
      .findByIdAndUpdate(req.params.id, { count }, { new: true })
      .then(jon => res.send(jon))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Jon
      .findByIdAndDelete(req.params.id)
      .then(jon => res.send(jon))
      .catch(next);
  });
