import { Application as ExpressFeathers } from '@feathersjs/express';

// A mapping of service names to types. Will be extended in service files.
export interface ServiceTypes {}

type PaginationOptions = { default?: number | undefined; max?: number | undefined };

type ApplicationConfiguration = {
  get(key: 'paginate'): PaginationOptions;
};

// The application instance type that will be used everywhere else
export type Application = ExpressFeathers<ServiceTypes> & ApplicationConfiguration;
