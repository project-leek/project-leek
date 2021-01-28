import { AdapterService } from '@feathersjs/adapter-commons';
import auth from '@feathersjs/authentication-client';
import feathers, { Application as FeathersApplication, ServiceAddons } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { NFCReader, NFCTag, Speaker, Track, User } from '@leek/commons';
import io from 'socket.io-client';
import { computed, ref } from 'vue';

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

export const backendUrl = ref<string | null>(localStorage.getItem(LS_BACKEND_URL) || null);

export const isBackendUrlConfigured = computed(() => !!backendUrl.value);

function debug(...str: string[]): void {
  // eslint-disable-next-line no-console
  console.log(...str);
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

export function setBackendUrl(_backendUrl: string | null): void {
  backendUrl.value = _backendUrl;

  if (_backendUrl) {
    localStorage.setItem(LS_BACKEND_URL, _backendUrl);
  } else {
    localStorage.removeItem(LS_BACKEND_URL);
  }
}

export async function saveBackendUrl(_backendUrl: string): Promise<boolean> {
  let url = _backendUrl;

  if (!url.includes(':')) {
    url = `${url}:3030`;
  }

  if (!(await isBackendAvailable(url))) {
    return false;
  }

  setBackendUrl(url);

  return true;
}

const feathersClient = feathers<ServiceTypes>() as Application;
feathersClient.configure(auth());

feathersClient.on('login', () => {
  debug('Backend: authenticated');
});

feathersClient.on('logout', () => {
  debug('Backend: unauthenticated bye bye');
});

feathersClient.hooks({
  error({ error }) {
    // TODO: add pretty error toasting
    debug('feathers-error:', error);
  },
});

export const socket = ref<SocketIOClient.Socket>();

export function loadBackend(): void {
  if (!backendUrl.value) {
    debug('Url not defined');
    return;
  }

  socket.value = io(backendUrl.value, {
    path: '/api/socket',
    transports: ['websocket'],
    autoConnect: true,
    // timeout: 20 * 1000,
  });

  socket.value.on('connect', () => {
    debug('Backend: connected ;-)');
  });

  socket.value.on('disconnect', () => {
    debug('Backend: disconnected');
  });

  feathersClient.configure(socketio(socket.value));

  feathersClient.on('disconnect', () => {
    if (socket.value) {
      socket.value.disconnect();
    }
  });

  socket.value.open();
}

// auto-load if url is already set
if (backendUrl.value) {
  loadBackend();
}

export default feathersClient;
