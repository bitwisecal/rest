// test the api with jest

// Path: tests/integration/worker.test.ts

import request from 'supertest';
import { describe, beforeEach, test, expect, jest } from '@jest/globals';
import httpStatus from 'http-status';
import httpMocks from 'node-mocks-http';

import app from '../../src/app';

describe('GET /v1/workers/:workerId/shifts', () => {
  // test return 200 OK for all the current input params
  test('should return 200 OK for all the current input params', async () => {
    const response = await request(app).get('/v1/workers/1/shifts');
    expect(response.status).toBe(httpStatus.OK);
  });

  // test  return 404 NOT_FOUND if workerId doesnot exists
  test('should return 404 NOT_FOUND if workerId doesnot exists', async () => {
    const response = await request(app).get('/v1/workers/0/shifts');
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  describe('should return 400 for all the invalid query params', () => {
    // test return 400 for invalid limit
    test('should return 400 for invalid limit', async () => {
      const response = await request(app).get('/v1/workers/1/shifts').query({ limit: -1 });
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    // test return 400 for invalid page number
    test('should return 400 for invalid page number', async () => {
      const response = await request(app).get('/v1/workers/1/shifts').query({ page: -1 });
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });

  describe('should return 200 OK for all the valid query params', () => {
    // test to sanitize query params
    test('should sanitize query params', async () => {
      const response = await request(app)
        .get('/v1/workers/1/shifts')
        .query({ limit: '<script>6</script>', page: '7' });
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});

// Path: tests/integration/worker.test.ts
