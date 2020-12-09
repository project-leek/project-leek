import { ServiceAddons } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { NFCReader } from '@project-leek/commons';
import { Application } from '../../declarations';
import createModel from './nfc-readers.model';
import hooks from './hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'nfc-readers': NFCReaderService & ServiceAddons<NFCReader>;
  }
}

class NFCReaderService extends Service<NFCReader> {
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
  app.use('nfc-readers', new NFCReaderService(options, app));

  const service = app.service('nfc-readers');
  service.publish(() => app.channel('anonymous'));
  service.hooks(hooks);
};
