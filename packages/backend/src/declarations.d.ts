import { Application as ExpressFeathers } from '@feathersjs/express';
import { ServiceTypes } from '@project-leek/commons';

type PaginationOptions = { default?: number | undefined; max?: number | undefined };

type ApplicationConfiguration = {
  get(key: 'paginate'): PaginationOptions;
  get(key: 'nedb'): string;
  get(key: 'port'): number;
  get(key: 'host'): string;
};

// The application instance type that will be used everywhere else
export type Application = ExpressFeathers<ServiceTypes> & ApplicationConfiguration;
