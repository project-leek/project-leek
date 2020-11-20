import { Application } from '../declarations';
import users from './users/users.service';
import nicksPet from './nicksPet/nicksPet.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default (app: Application): void => {
  app.configure(users);
  app.configure(nicksPet);
};
