import { Application } from '../declarations';
import users from './users/users.service';
import nfcReaders from './nfc-readers/nfc-readers.service';
import nfcTags from './nfc-tags/nfc-tags.service';

import antonsPets from './antons-pets/antons-pets.service';
import rudolfo from './rudolfo/rudolfo.service';
import nicksPet from './nicksPet/nicksPet.service';
import jansPets from './jans-pets/jans-pets.services';
import pets from './pets/pets.service';

export default (app: Application): void => {
  app.configure(users);
  app.configure(nfcReaders);
  app.configure(nfcTags);

  app.configure(rudolfo);
  app.configure(jansPets);
  app.configure(antonsPets);
  app.configure(pets);
  app.configure(nicksPet);
};
