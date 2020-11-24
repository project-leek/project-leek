import { ServiceAddons } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Pet } from '@project-leek/commons';
import { Application } from '../../declarations';
import createModel from './pets.model';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    pets: PetService & ServiceAddons<Pet>;
  }
}

class PetService extends Service<Pet> {
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
  app.use('pets', new PetService(options, app));
  app.service('pets').publish(() => app.channel('anonymous'));
};
