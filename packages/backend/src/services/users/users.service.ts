import { NedbServiceOptions } from 'feathers-nedb';
import { AbstractUsersService } from '@project-leek/commons';
import { Application } from '../../declarations';
import createModel from './users.model';
import hooks from './users.hooks';

class UsersService extends AbstractUsersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
}

export default (app: Application): void => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('users', new UsersService(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
};
