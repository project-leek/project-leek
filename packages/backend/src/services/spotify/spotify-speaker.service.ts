import { AdapterService, ServiceOptions } from '@feathersjs/adapter-commons';
import { Params, ServiceAddons } from '@feathersjs/feathers';
import { Speaker } from '@leek/commons';

import { Application } from '../../declarations';
import { SpotifyApi } from '../../utils/spotify';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'spotify-speakers': SpotifySpeakerService & ServiceAddons<Speaker>;
  }
}

class SpotifySpeakerService extends AdapterService<Speaker> {
  app: Application;

  constructor(app: Application, options: Partial<ServiceOptions> = {}) {
    super(options);
    this.app = app;
  }

  async find(params: Params): Promise<Speaker[]> {
    const user = await this.app.service('users').get(params?.user?._id);
    const spotifyApi = new SpotifyApi(this.app, user);

    await spotifyApi.refreshToken();

    const resp = await spotifyApi.getApi().getMyDevices();

    if (resp.body) {
      const devices = resp.body.devices;

      return devices.map<Speaker>((d) => ({
        _id: d.id || Math.random().toString(36).substring(7), // TODO find better way to handel null ids?
        name: d.name,
      }));
    }

    return [];
  }
}

export default (app: Application): void => {
  app.use('spotify-speakers', new SpotifySpeakerService(app));
  const service = app.service('spotify-speakers');
  service.publish(() => app.channel('authenticated'));
};
