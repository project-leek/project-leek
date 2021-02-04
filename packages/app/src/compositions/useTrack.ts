import { Paginated } from '@feathersjs/feathers';
import { NFCTag, Track } from '@leek/commons/';

import feathers from './useBackend';

export async function getTrackOfTag(nfcTag: NFCTag): Promise<Track> {
  return await feathers.service('spotify-tracks').get(nfcTag.trackUri);
}

export async function getTrackByNfcData(nfcData: string): Promise<NFCTag | null> {
  const nfcTagResult = (await feathers
    .service('nfc-tags')
    .find({ query: { nfcData } })) as Paginated<NFCTag>;

  if (nfcTagResult.total === 0) {
    return null;
  }

  return nfcTagResult.data[1];
}

export async function searchTracksByName(query: string): Promise<Track[]> {
  const params = {
    query: {
      name: query,
    },
  };

  return (await feathers.service('spotify-tracks').find(params)) as Track[];
}
