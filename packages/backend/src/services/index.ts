import { Application } from '../declarations';
import antonsPets from './antons-pets/antons-pets.service';
import users from './users/users.service';
import nfcReaders from './nfc-readers/nfc-reader.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default (app: Application): void => {
  app.configure(users);
  app.configure(antonsPets);
  app.configure(nfcReaders);
};
