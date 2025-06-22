const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Holiday = require('../models/Holiday');

// Create app without DB connection
const app = require('../app');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Holiday.deleteMany({});
});

describe('Holiday Model Unit Tests', () => {
  it('should require country, name, and date', async () => {
    const holiday = new Holiday({});
    const error = holiday.validateSync();
    expect(error.errors.country).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.date).toBeDefined();
  });
});

describe('Holiday API Integration Tests', () => {
  it('POST /api/holidays creates a holiday', async () => {
    const res = await request(app)
      .post('/api/holidays')
      .send({ country: "India", name: "Test Day", date: "2025-12-25" });
    expect(res.statusCode).toBe(201);
    expect(res.body.country).toBe("India");
  });

  it('GET /api/holidays returns all holidays', async () => {
    await Holiday.create({ country: "India", name: "Test Day", date: "2025-12-25" });
    const res = await request(app).get('/api/holidays');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('GET /api/holidays/:country returns filtered holidays', async () => {
    await Holiday.create({ country: "USA", name: "Independence Day", date: "2025-07-04" });
    const res = await request(app).get('/api/holidays/usa');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].country).toBe("USA");
  });

  it('PUT /api/holidays/:id updates a holiday', async () => {
    const holiday = await Holiday.create({ country: "France", name: "Bastille Day", date: "2025-07-14" });
    const res = await request(app)
      .put(`/api/holidays/${holiday._id}`)
      .send({ name: "Updated Name" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Name");
  });

  it('DELETE /api/holidays/:id deletes a holiday', async () => {
    const holiday = await Holiday.create({ country: "Japan", name: "Golden Week", date: "2025-05-03" });
    const res = await request(app).delete(`/api/holidays/${holiday._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Holiday deleted");
  });
});
