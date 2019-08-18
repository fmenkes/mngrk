import request from 'supertest';
import server from '../index';

afterEach(() => {
  server.close();
});

describe('routes:', () => {
  describe('index', () => {
    it('should respond as expected', async () => {
      const response = await request(server).get('/');
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body.data).toEqual('Hello World');
    });
  });
  describe('ping', () => {
    it('should respond as expected', async () => {
      const response = await request(server).get('/ping');
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body.data).toEqual('Pong');
    });
  });
});
