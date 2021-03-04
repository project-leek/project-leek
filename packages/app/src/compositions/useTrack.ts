import { NFCTag, Track } from '@leek/commons/';

import feathers from './useBackend';

export async function getTrackOfTag(nfcTag: NFCTag): Promise<Track> {
  return await feathers.service('spotify-tracks').get(nfcTag.trackUri);
}

export async function searchTracksByName(query: string): Promise<Track[]> {
  const params = {
    query: {
      name: query,
    },
  };

  return (await feathers.service('spotify-tracks').find(params)) as Track[];
}
