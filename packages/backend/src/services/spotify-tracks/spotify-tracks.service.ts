import { AdapterService, ServiceOptions } from '@feathersjs/adapter-commons';
import { Params, ServiceAddons } from '@feathersjs/feathers';
import { SpotifyTrack } from '@leek/commons';

import { Application } from '../../declarations';
import { SpotifyApi } from '../../utils/spotify';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'spotify-tracks': SpotifyTrackService & ServiceAddons<SpotifyTrack>;
  }
}

class SpotifyTrackService extends AdapterService<SpotifyTrack> {
  app: Application;

  constructor(app: Application, options: Partial<ServiceOptions> = {}) {
    super(options);
    this.app = app;
  }

  async find(params: Params): Promise<SpotifyTrack[]> {
    const user = await this.app.service('users').get(params?.user?._id);
    const searchQuery = params.query;
    const spotifyApi = new SpotifyApi(this.app, user);

    if (searchQuery === undefined) {
      return [];
    }

    await spotifyApi.refreshToken();

    const query = searchQuery.name as string;
    const trackResp = await spotifyApi.getApi().searchTracks(`track:${query}`);

    if (trackResp.body.tracks) {
      const tracks = trackResp.body.tracks.items;
      return tracks.map((track) => {
        return {
          uri: track.uri,
          title: track.name,
          artists: track.artists.map((artist) => artist.name),
          imageUri: track.album.images[0].url,
        } as SpotifyTrack;
      });
    }

    return [];
  }
}

export default (app: Application): void => {
  app.use('spotify-tracks', new SpotifyTrackService(app));
  const service = app.service('spotify-tracks');
  service.publish(() => app.channel('authenticated'));
};
