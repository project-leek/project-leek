import { ServiceAddons } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { User } from '@project-leek/commons';
import { Application } from '../../declarations';
import createModel from './pets.model';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    users: UsersService & ServiceAddons<User>;
  }
}

class UsersService extends Service<User> {
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
};