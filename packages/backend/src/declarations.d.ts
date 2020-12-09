import { Application as ExpressFeathers } from '@feathersjs/express';
import { HookContext as FeathersHookContext } from '@feathersjs/feathers';

type PaginationOptions = { default?: number; max?: number };

export interface ServiceTypes {}

// The application instance type that will be used everywhere else
export interface Application extends ExpressFeathers<ServiceTypes> {
  get(key: 'host'): string;
  get(key: 'port'): number;
  get(key: 'public'): string;
  get(key: 'paginate'): PaginationOptions;
  get(key: 'nedb'): string;
}

export interface HookContext<T = any> extends FeathersHookContext<T> {
  app: Application;
}
