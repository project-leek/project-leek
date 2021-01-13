import { HooksObject, ServiceAddons } from '@feathersjs/feathers';
import { NFCReader } from '@leek/commons';
import { NedbServiceOptions, Service } from 'feathers-nedb';

import { Application } from '../../declarations';
import hooks from './hooks';
import createModel from './nfc-readers.model';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'nfc-readers': NFCReaderService & ServiceAddons<NFCReader>;
  }
}

class NFCReaderService extends Service<NFCReader> {
  constructor(options: Partial<NedbServiceOptions>) {
    super(options);
  }
}

export default (app: Application): void => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('nfc-readers', new NFCReaderService(options));

  const service = app.service('nfc-readers');
  service.publish(() => app.channel('authenticated'));

  // TODO remove workaround
  service.hooks((hooks as unknown) as Partial<HooksObject>);
};
