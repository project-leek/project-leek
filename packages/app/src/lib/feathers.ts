import { AdapterService } from '@feathersjs/adapter-commons';
import auth from '@feathersjs/authentication-client';
import feathers, { Application as FeathersApplication, ServiceAddons } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { NFCReader, NFCTag, SpotifySpeaker, SpotifyTrack, User } from '@leek/commons';
import io from 'socket.io-client';

type Service<T> = AdapterService<T> & ServiceAddons<T>;

// Add this service to the service type index
interface ServiceTypes {
  users: Service<User>;
  'nfc-readers': Service<NFCReader>;
  'nfc-tags': Service<NFCTag>;
  'spotify-tracks': Service<SpotifyTrack>;
  'spotify-speakers': Service<SpotifySpeaker>;
}

interface AuthenticationResult {
  user: User;
}

export const socket = io({
  path: '/api/socket',
  transports: ['websocket'],
  autoConnect: true,
  // timeout: 20 * 1000,
});

type Application = FeathersApplication<ServiceTypes> & {
  get(key: 'authentication'): Promise<AuthenticationResult | null>;
};

const feathersClient = feathers<ServiceTypes>() as Application;
feathersClient.configure(socketio(socket));
feathersClient.configure(auth());

function debug(...str: string[]): void {
  // eslint-disable-next-line no-console
  console.log(...str);
}

socket.on('connect', () => {
  debug('Backend: connected ;-)');
});

socket.on('disconnect', () => {
  debug('Backend: disconnected');
});

feathersClient.on('login', () => {
  debug('Backend: authenticated');
});

feathersClient.on('logout', () => {
  debug('Backend: unauthenticated bye bye');
});

feathersClient.on('disconnect', () => {
  socket.disconnect();
});

feathersClient.hooks({
  error({ error }) {
    // TODO: add pretty error toasting
    // eslint-disable-next-line no-console
    console.error('feathers-error:', error);
  },
});

export default feathersClient;
