import { Application } from '../declarations';
import users from './users/users.service';
import JansPets from './JansPets/JansPets.services';
import nfcReaders from './nfc-readers/nfc-reader.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default (app: Application): void => {
  app.configure(users);
  app.configure(JansPets);
  app.configure(nfcReaders);
};
