import { AdapterService, ServiceOptions } from '@feathersjs/adapter-commons';
import { Id, NullableId, Params, Query, ServiceAddons, ServiceMethods } from '@feathersjs/feathers';
import { SpotifyTrack, User } from '@leek/commons';
import SpotifyWebApi from 'spotify-web-api-node';

import { Application } from '../../../declarations';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'spotify-track': SpotifyTrackService & ServiceAddons<SpotifyTrack>;
  }
}

type SpotifyApiError = Error & {
  statusCode: number;
};

class SpotifyTrackService extends AdapterService<SpotifyTrack> {
  app: Application;

  constructor(app: Application, options: Partial<ServiceOptions> = {}) {
    super(options);
    this.app = app;
  }

  async find(params: Params): Promise<SpotifyTrack[]> {
    console.log('user:', params?.user?._id);
    const user: User = await this.app.service('users').get(params?.user?._id);
    const res = await this.searchForTracks(user, params.query);
    return res;
  }

  async searchForTracks(user: User, searchQuery: Query | undefined): Promise<SpotifyTrack[]> {
    if (searchQuery === undefined) {
      return [];
    }

    const oauthSpotifyConfig = this.app.get('authentication').oauth.spotify;

    const spotifyApi = new SpotifyWebApi({
      accessToken: user.spotifyAccessToken,
      refreshToken: user.spotifyRefreshToken,
      clientId: oauthSpotifyConfig.key,
      clientSecret: oauthSpotifyConfig.secret,
    });

    try {
      const query = searchQuery.name as string;
      const trackResp = await spotifyApi.searchTracks(`track:${query}`);

      if (trackResp.body.tracks) {
        const tracks = trackResp.body.tracks.items;
        return tracks.map((track) => new SpotifyTrack(track.uri, track.name, track.artists, track.album));
      }
    } catch (_error) {
      const error = _error as SpotifyApiError;
      throw error;
    }
    return [];
  }
}

export default (app: Application): void => {
  app.use('spotify-track', new SpotifyTrackService(app));
  const service = app.service('spotify-track');
  service.publish(() => app.channel('authenticated'));
};
