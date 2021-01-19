import { Paginated } from '@feathersjs/feathers';
import { NFCReader, NFCTag, User } from '@leek/commons';

import { Application, HookContext } from '../../../declarations';
import { SpotifyApi } from '../../../utils/spotify';

async function playSpotify(app: Application, user: User, spotifyUri: string): Promise<void> {
  const spotifyApi = new SpotifyApi(app, user);

  await spotifyApi.refreshToken();
  await spotifyApi.getApi().play({
    uris: [spotifyUri],
  });
}

export default async (context: HookContext<NFCReader>): Promise<HookContext> => {
  // skip if no tag has been attached or changed
  if (!context.data || !context.data?.attachedTagData || !context.id) {
    return context;
  }

  const query = { nfcData: context.data.attachedTagData };
  const nfcTagSearchResult = (await context.app.service('nfc-tags').find({ query })) as Paginated<NFCTag>;

  if (nfcTagSearchResult.total !== 1) {
    return context;
  }

  const nfcTag = nfcTagSearchResult.data[0];

  if (!/^spotify:/.test(nfcTag.spotifyTrackUri)) {
    return context;
  }

  try {
    const nfcReader = await context.service.get(context.id);

    const user = await context.app.service('users').get(nfcReader.owner);

    await playSpotify(context.app, user, nfcTag.spotifyTrackUri);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Can't play music on Spotify`, error);
  }

  return context;
};