import { ServiceAddons } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { NFCTag } from '@project-leek/commons';
import { Application } from '../../declarations';
import createModel from './nfc-tags.model';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'nfc-tags': NFCTagService & ServiceAddons<NFCTag>;
  }
}

class NFCTagService extends Service<NFCTag> {
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
  app.use('nfc-tags', new NFCTagService(options, app));
  app.service('nfc-tags').publish(() => app.channel('anonymous'));
};