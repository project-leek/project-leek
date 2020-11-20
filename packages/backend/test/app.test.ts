import { Server } from 'http';
import url from 'url';
import axios, { AxiosError } from 'axios';
import { FeathersError } from '@feathersjs/errors';

import app from '../src/app';
import webserver from '../src/webserver';

const port = app.get('port') || 8998;
const getUrl = (pathname?: string): string =>
  url.format({
    hostname: app.get('host') || 'localhost',
    protocol: 'http',
    port,
    pathname: pathname && `/api/v1/${pathname}`,
  });

describe('Feathers application tests (with jest)', () => {
  let server: Server;

  beforeAll((done) => {
    server = webserver.listen(port);
    server.once('listening', () => {
      done();
    });
    app.setup(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('starts and shows the index page', async () => {
    expect.assertions(1);

    const { data } = await axios.get<string>(getUrl());

    expect(data.indexOf('<html lang="en">')).not.toBe(-1);
  });

  describe('404', () => {
    it('shows a 404 HTML page', async () => {
      expect.assertions(2);

      try {
        await axios.get(getUrl('path/to/nowhere'), {
          headers: {
            Accept: 'text/html',
          },
        });
      } catch (error) {
        const { response } = error as AxiosError;

        expect(response?.status).toBe(404);
        expect((response?.data as string).indexOf('<html>')).not.toBe(-1);
      }
    });

    it('shows a 404 JSON error without stack trace', async () => {
      expect.assertions(4);

      try {
        await axios.get(getUrl('path/to/nowhere'));
      } catch (error) {
        const { response } = error as AxiosError;

        if (response) {
          expect(response.status).toBe(404);
          const data = response.data as FeathersError;
          expect(data.code).toBe(404);
          expect(data.message).toBe('Page not found');
          expect(data.name).toBe('NotFound');
        }
      }
    });
  });
});
