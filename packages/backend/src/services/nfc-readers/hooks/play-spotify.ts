import { NFCReader, User } from '@project-leek/commons';
import SpotifyWebApi from 'spotify-web-api-node';

import { HookContext, Application } from '../../../declarations';

type SpotifyApiError = Error & {
  statusCode: number;
};

async function playSpotify(app: Application, user: User, spotifyUri: string) {
  const spotifyApi = new SpotifyWebApi({
    accessToken: user.spotifyAccessToken,
    refreshToken: user.spotifyRefreshToken,
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

export default async (ctx: HookContext<NFCReader>) => {
  // skip if no tag has been attached or changed
  if (!ctx.data?.attachedTag || !ctx.id) {
    return ctx;
  }

  const nfcTag = await ctx.app.service('nfc-tags').get(ctx.data.attachedTag);

  // skip if not a spotify uri
  if (!/^spotify:/.test(nfcTag.audioUrl)) {
    return ctx;
  }

  const nfcReader = await ctx.service.get(ctx.id);
  const user = await ctx.app.service('users').get(nfcReader.owner);

  await playSpotify(ctx.app, user, nfcTag.audioUrl);

  return ctx;
};
