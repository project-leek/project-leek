import { Application } from '../declarations';
import antonsPets from './antons-pets/antons-pets.service';
import users from './users/users.service';
import jansPets from './jans-pets/jans-pets.services';
import pets from './pets/pets.service';
import nfcReaders from './nfc-readers/nfc-reader.service';

export default (app: Application): void => {
  app.configure(users);
  app.configure(jansPets);
  app.configure(antonsPets);
  app.configure(pets);
  app.configure(nfcReaders);
};
