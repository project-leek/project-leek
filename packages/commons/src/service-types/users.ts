import { ServiceAddons } from '@feathersjs/feathers';
import { Service } from 'feathers-nedb';

import User from '../user.class';

export abstract class AbstractUsersService extends Service<User> {}

// Add this service to the service type index
declare module './index' {
  interface ServiceTypes {
    users: AbstractUsersService & ServiceAddons<User>;
  }
}
