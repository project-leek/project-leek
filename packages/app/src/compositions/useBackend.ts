import { AdapterService } from '@feathersjs/adapter-commons';
import auth from '@feathersjs/authentication-client';
import feathers, { Application as FeathersApplication, ServiceAddons } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { NFCReader, NFCTag, Speaker, Track, User } from '@leek/commons';
import io from 'socket.io-client';
import { computed, ref } from 'vue';

import { debug } from './useDebug';

type Service<T> = AdapterService<T> & ServiceAddons<T>;

// Add this service to the service type index
interface ServiceTypes {
  users: Service<User>;
  'nfc-readers': Service<NFCReader>;
  'nfc-tags': Service<NFCTag>;
  'spotify-tracks': Service<Track>;
  'spotify-speakers': Service<Speaker>;
}

interface AuthenticationResult {
  user: User;
}

type Application = FeathersApplication<ServiceTypes> & {
  get(key: 'authentication'): Promise<AuthenticationResult | null>;
};

const LS_BACKEND_URL = 'backend_url';

const socket = ref<SocketIOClient.Socket>();
const feathersClient = feathers<ServiceTypes>() as Application;

feathersClient.on('login', () => {
  debug('Backend: authenticated');
});

feathersClient.on('logout', () => {
  debug('Backend: unauthenticated bye bye');
});

feathersClient.on('connect', () => {
  isBackendConnected.value = true;
  debug('Backend: connected ;-)');
});

feathersClient.on('disconnect', () => {
  isBackendConnected.value = false;
  debug('Backend: disconnected');

  // disconnect logs the user out as well
  feathersClient.emit('logout');
});

feathersClient.hooks({
  error({ error }) {
    // TODO: add pretty error toasting
    debug('feathers-error:', error);
  },
});

export const backendUrl = ref<string | null>(localStorage.getItem(LS_BACKEND_URL) || null);

export const isBackendUrlConfigured = computed(() => !!backendUrl.value);

export const isBackendConnected = ref(false);

export function setBackendUrl(_backendUrl?: string | null): void {
  backendUrl.value = _backendUrl || null;

  if (!_backendUrl) {
    localStorage.removeItem(LS_BACKEND_URL);
    return;
  }

  localStorage.setItem(LS_BACKEND_URL, _backendUrl);
}

export async function isBackendAvailable(url: string): Promise<boolean> {
  const socket = io(url, {
    path: '/api/socket',
    transports: ['websocket'],
    reconnection: false,
    autoConnect: false,
    timeout: 1 * 1000, // short connection timeout to fail fast
  });

  return new Promise((resolve) => {
    socket.on('connect', () => {
      socket.close();
      resolve(true);
    });

    socket.on('connect_error', () => {
      socket.close();
      resolve(false);
    });

    socket.connect();
  });
}

export async function resolveBackendUrl(url: string): Promise<string | null> {
  const DEFAULT_BACKEND = 'http://localhost:3000';
  const DEFAULT_BACKEND_PORT = '3030';

  if (!url) {
    if (await isBackendAvailable(DEFAULT_BACKEND)) {
      return DEFAULT_BACKEND;
    }

    return null;
  }

  // try url as is
  if (await isBackendAvailable(url)) {
    return url;
  }

  // try with standard port
  if (!/:\d{2,5}$/.exec(url) && (await isBackendAvailable(`${url}:${DEFAULT_BACKEND_PORT}`))) {
    return `${url}:${DEFAULT_BACKEND_PORT}`;
  }

  // try with protocol
  if (!/^https?:\/\//.exec(url) && (await isBackendAvailable(`https://${url}`))) {
    return `https://${url}`;
  }

  return null;
}

export function closeBackendConnection(): void {
  if (socket.value) {
    socket.value.disconnect();
    delete socket.value;
    // delete feathersClient.io;
    delete (feathersClient as Application & { defaultService?: unknown }).defaultService;
  }
}

export function loadBackend(_backendUrl: string): void {
  // unload old socket if one exists
  closeBackendConnection();

  socket.value = io(_backendUrl, {
    path: '/api/socket',
    transports: ['websocket'],
    autoConnect: true,
    // timeout: 20 * 1000,
  });

  socket.value.on('connect', () => {
    feathersClient.emit('connect');
  });

  socket.value.on('disconnect', () => {
    feathersClient.emit('disconnect');
  });

  feathersClient.configure(socketio(socket.value));
  feathersClient.configure(auth());

  socket.value.open();
}

export function waitForConnection(): Promise<void> {
  if (socket.value?.connected) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    socket.value?.on('connect', () => {
      resolve();
    });
  });
}

// auto-load if url is already set
if (backendUrl.value) {
  loadBackend(backendUrl.value);
}

export default feathersClient;
