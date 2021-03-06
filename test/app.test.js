require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Jon = require('../lib/models/Jon');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can POST to create new Jon', () => {
    return request(app)
      .post('/api/v1/jons')
      .send({ name: 'New Jon' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'New Jon',
          __v: 0,
        });
      });
  });

  it('can GET all the Jons', async() => {
    const jon1 = await Jon.create({ name: 'Jon Alpha' });
    const jon2 = await Jon.create({ name: 'Jon Bravo' });

    return request(app)
      .get('/api/v1/jons')
      .then(res => {
        const jonJSON = JSON.parse(JSON.stringify(jon1));
        const jon2JSON = JSON.parse(JSON.stringify(jon2));
        expect(res.body).toEqual([jonJSON, jon2JSON]);
      });
  });

  it('get a single Jon by id', async() => {
    const jon1 = await Jon.create({ name: 'Jon Alpha' });

    return request(app)
      .get(`/api/v1/jons/${jon1._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Jon Alpha',
          __v: 0
        });
      });
  });

  it('can PATCH to update a jon', async() => {
    const jon1 = await Jon.create({ name: 'Jon Alpha' });

    return request(app)
      .patch(`/api/v1/jons/${jon1._id}`)
      .send({ name: 'Jon Charlie' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Jon Charlie',
          __v: 0,
        });
      });
  });

  it('uses DELETE to delete a Jon', async() => {
    const jon1 = await Jon.create({ name: 'Jon Alpha' });

    return request(app)
      .delete(`/api/v1/jons/${jon1._id}`)
      .then(res => {
        expect(res.body.name).toEqual('Jon Alpha');
      });
  });
});

