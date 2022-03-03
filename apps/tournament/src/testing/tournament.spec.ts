import { TournamentToAdd } from '../app/api-model';
import { INestApplication } from '@nestjs/common';
import { generateRandomName, startApp } from './test.utils';
import * as request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

describe('/tournament endpoint', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await startApp();
  });

  describe('[POST] when creating a tournament', () => {
    it('should return the correct id', async () => {
      const exampleTournament = {
        name: generateRandomName(),
      } as TournamentToAdd;
      const { body } = await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(exampleTournament)
        .expect(201);

      expect(body.id).not.toBeUndefined();
    });

    it('should have stored the tournament', async () => {
      const exampleTournament = {
        name: generateRandomName(),
      } as TournamentToAdd;
      const { body } = await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(exampleTournament)
        .expect(201);

      const get = await request(app.getHttpServer())
        .get(`/api/tournaments/${body.id}`)
        .expect(200);

      expect(get.body.name).toEqual(exampleTournament.name);
    });

    it('should return error when empty name', async () => {
      const exampleTournament = {
        name: '',
      } as TournamentToAdd;
      await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(exampleTournament)
        .expect(400);
    });

    it('should return error when duplicate name', async () => {
      const exampleTournament = {
        name: generateRandomName(),
      } as TournamentToAdd;

      await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(exampleTournament)
        .expect(201);

      await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(exampleTournament)
        .expect(400);
    });

    it("should return error when tournament doesn't exist", async () => {
      await request(app.getHttpServer())
        .get(`/api/tournaments/${uuidv4()}`)
        .expect(404);
    });

    it('should return tournament name when tournament exist', async () => {
      const exampleTournament = {
        name: generateRandomName(),
      } as TournamentToAdd;

      const { body } = await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(exampleTournament)
        .expect(201);

      const { get } = await request(app.getHttpServer())
        .get(`/api/tournaments/${body.id}`)
        .expect(200);

      expect(get.name).toBeDefined();
    });
  });
});
