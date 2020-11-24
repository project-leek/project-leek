import { Application } from '../declarations';
import users from './users/users.service';
import rudolfo from './rudolfo/rudolfo.service';
import nfcReaders from './nfc-readers/nfc-reader.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default (app: Application): void => {
  app.configure(rudolfo);
  app.configure(users);
  app.configure(nfcReaders);
};
