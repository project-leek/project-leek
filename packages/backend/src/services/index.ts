import { Application } from '../declarations';
import authentication from './authentication/authentication.service';
import nfcReaders from './nfc-readers/nfc-readers.service';
import nfcTags from './nfc-tags/nfc-tags.service';
import spotifySpeakers from './spotify/spotify-speaker.service';
import spotifyTracks from './spotify/spotify-tracks.service';
import users from './users/users.service';

export default (app: Application): void => {
  app.configure(authentication);
  app.configure(users);
  app.configure(nfcReaders);
  app.configure(nfcTags);
  app.configure(spotifyTracks);
  app.configure(spotifySpeakers);
};
