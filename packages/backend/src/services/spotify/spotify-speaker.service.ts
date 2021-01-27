import { AdapterService, ServiceOptions } from '@feathersjs/adapter-commons';
import { Params, ServiceAddons } from '@feathersjs/feathers';
import { SpotifySpeaker } from '@leek/commons';

import { Application } from '../../declarations';
import { SpotifyApi } from '../../utils/spotify';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'spotify-speakers': SpotifySpeakerService & ServiceAddons<SpotifySpeaker>;
  }
}

class SpotifySpeakerService extends AdapterService<SpotifySpeaker> {
  app: Application;

  constructor(app: Application, options: Partial<ServiceOptions> = {}) {
    super(options);
    this.app = app;
  }

  async find(params: Params): Promise<SpotifySpeaker[]> {
    const user = await this.app.service('users').get(params?.user?._id);
    const spotifyApi = new SpotifyApi(this.app, user);

    await spotifyApi.refreshToken();

    const resp = await spotifyApi.getApi().getMyDevices();

    if (resp.body) {
      const devices = resp.body.devices;
      return devices.map((d) => {
        return {
          _id: d.id,
          name: d.name,
        } as SpotifySpeaker;
      });
    }

    return [];
  }
}

export default (app: Application): void => {
  app.use('spotify-speakers', new SpotifySpeakerService(app));
  const service = app.service('spotify-speakers');
  service.publish(() => app.channel('authenticated'));
};
