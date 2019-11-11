// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);
describe('lessons read:', () => {
    test('should return 200 for getting all classes', async (done) => {
        const response = await server.get('/lessons');

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return 200 for getting all classes and data should be an array', async (done) => {
        const response = await server.get('/lessons');
        const { data } = response.body;

        expect(Array.isArray(data)).toBeTruthy();
        done();
    });
});
