import { ServiceAddons } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { TagGroup } from '@project-leek/commons';
import { Application } from '../../declarations';
import createModel from './tag-groups.model';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'tag-groups': TagGroupService & ServiceAddons<TagGroup>;
  }
}

class TagGroupService extends Service<TagGroup> {
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
  app.use('tag-groups', new TagGroupService(options, app));
  app.service('tag-groups').publish(() => app.channel('anonymous'));
};
