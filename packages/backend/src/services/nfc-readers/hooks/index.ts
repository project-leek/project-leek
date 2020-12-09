import playSpotify from './play-spotify';

export default {
  after: {
    update: [playSpotify],
    patch: [playSpotify],
  },
};
