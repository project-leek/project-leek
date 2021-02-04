import { User } from '@leek/commons';
import SpotifyWebApi from 'spotify-web-api-node';

import { Application } from '../declarations';

type SpotifyApiError = Error & {
  statusCode: number;
};

export class SpotifyApi {
  spotifyApi: SpotifyWebApi;
  app: Application;
  user: User;

  constructor(app: Application, user: User) {
    const oauthSpotifyConfig = app.get('authentication').oauth.spotify;

    this.spotifyApi = new SpotifyWebApi({
      accessToken: user.spotifyAccessToken,
      refreshToken: user.spotifyRefreshToken,
      clientId: oauthSpotifyConfig.key,
      clientSecret: oauthSpotifyConfig.secret,
    });

    this.app = app;
    this.user = user;
  }

  /**
   * Check if the users access token is still valid or refresh it if needed.
   * @returns {boolean} Has the token been updated?
   */
  async refreshToken(): Promise<boolean> {
    try {
      await this.spotifyApi.getMe();
      return false;
    } catch (_error) {
      const error = _error as SpotifyApiError;

      if (error.statusCode !== 401) {
        throw error;
      }

      // update accesstoken
      const response = await this.spotifyApi.refreshAccessToken();
      const accessToken = response.body.access_token;
      this.spotifyApi.setAccessToken(accessToken);

      await this.app.service('users').patch(this.user._id, {
        spotifyAccessToken: accessToken,
      });
      return true;
    }
  }

  getApi(): SpotifyWebApi {
    return this.spotifyApi;
  }
}
