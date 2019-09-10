const { Router } = require('express');
// const Jon = require('../models/Jon');  <-- old mongoDB stuff
const client = require('../utils/client');

module.exports = Router()
  .post('/', (req, res, next) => {

    const { name, otherData } = req.body;

    client.query(`
      INSERT INTO jons (name, otherDate)
      VALUES ($1, $2)
      RETURNING
        id, name, otherData,
        created, is_published as "isPublished";
    `,
    [name, otherData]
    )
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(next);
  })



// const {
//   name, otherData,
// } = req.body;

// Jon
//   .create({ name, otherData })
//   .then(jon => res.send(jon))
//   .catch(next);


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
      name, otherData
    } = req.body;

    Jon
      .findByIdAndUpdate(req.params.id, { name, otherData }, { new: true })
      .then(jon => res.send(jon))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Jon
      .findByIdAndDelete(req.params.id)
      .then(jon => res.send(jon))
      .catch(next);
  });
