import { Application } from '../declarations';
import users from './users/users.service';
import nicksPet from './nicksPet/nicksPet.service';

export default (app: Application): void => {
  app.configure(users);
  app.configure(nicksPet);
};
