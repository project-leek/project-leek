import { AdapterService, ServiceOptions } from '@feathersjs/adapter-commons';
import { Params, Query, ServiceAddons } from '@feathersjs/feathers';
import { SpotifyTrack, User } from '@leek/commons';
import SpotifyWebApi from 'spotify-web-api-node';

import { Application } from '../../../declarations';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'spotify-tracks': SpotifyTrackService & ServiceAddons<SpotifyTrack>;
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
    const user: User = await this.app.service('users').get(params?.user?._id);
    return await this.searchForTracks(user, params.query);
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
        return tracks.map((track) => {
          return {
            uri: track.uri,
            title: track.name,
            artists: track.artists.map((artist) => artist.name),
            imageUri: track.album.images[0].url,
          } as SpotifyTrack;
        });
      }
    } catch (_error) {
      const error = _error as SpotifyApiError;
      throw error;
    }
    return [];
  }
}

export default (app: Application): void => {
  app.use('spotify-tracks', new SpotifyTrackService(app));
  const service = app.service('spotify-tracks');
  service.publish(() => app.channel('authenticated'));
};
