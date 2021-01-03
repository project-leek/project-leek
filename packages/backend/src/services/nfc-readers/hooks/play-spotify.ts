import { NFCReader, User } from '@project-leek/commons';
import SpotifyWebApi from 'spotify-web-api-node';

import { Application, HookContext } from '../../../declarations';

type SpotifyApiError = Error & {
  statusCode: number;
};

async function playSpotify(app: Application, user: User, spotifyUri: string) {
  const oauthSpotifyConfig = app.get('authentication').oauth.spotify;

  const spotifyApi = new SpotifyWebApi({
    accessToken: user.spotifyAccessToken,
    refreshToken: user.spotifyRefreshToken,
    clientId: oauthSpotifyConfig.key,
    clientSecret: oauthSpotifyConfig.secret,
  });

  try {
    await spotifyApi.play({
      uris: [spotifyUri],
    });
  } catch (_error) {
    const error = _error as SpotifyApiError;

    if (error.statusCode !== 401) {
      throw error;
    }

    // update accesstoken
    const response = await spotifyApi.refreshAccessToken();
    const accessToken = response.body.access_token;
    spotifyApi.setAccessToken(accessToken);

    await app.service('users').patch(user._id, {
      spotifyAccessToken: accessToken,
    });

    // try again
    await spotifyApi.play({
      uris: [spotifyUri],
    });
  }
}

export default async (context: HookContext<NFCReader>): Promise<HookContext> => {
  // skip if no tag has been attached or changed
  if (!context.data?.attachedTag || !context.id) {
    return context;
  }

  const nfcTag = await context.app.service('nfc-tags').get(context.data.attachedTag);

  // skip if not a spotify uri
  if (!/^spotify:/.test(nfcTag.spotifyTrackUri)) {
    return context;
  }

  const nfcReader = await context.service.get(context.id);
  const user = await context.app.service('users').get(nfcReader.owner);

  await playSpotify(context.app, user, nfcTag.spotifyTrackUri);

  return context;
};
