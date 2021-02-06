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

const LS_BOX_ID = 'box_id';

// detect if we are the app version deployed to github
export const isSetupApp = computed(() => /github\.io$/.test(location.hostname));

function debug(...str: string[]): void {
  // eslint-disable-next-line no-console
  console.log(...str);
}

export function resolveBox(boxId: string): string {
  let url = boxId;

  // has port attached
  if (!/:\d{2,5}$/.exec(url)) {
    url = `${url}:80`;
  }

  // add protocol if not supplied
  if (!/^https?:\/\//.exec(url)) {
    url = `http://${url}`;
  }

  return url;
}

export async function loadBox(boxId?: string): Promise<void> {
  if (!boxId) {
    const lsBoxId = localStorage.getItem(LS_BOX_ID);

    if (lsBoxId) {
      window.location.href = resolveBox(lsBoxId);
    }

    return;
  }

  // save box id if new one provided
  localStorage.setItem(LS_BOX_ID, boxId);

  return new Promise((resolve) => {
    // imitate some slow loading (why? because we can!)
    setTimeout(() => {
      window.location.href = resolveBox(boxId);
      resolve();
    }, 1000 * 1.5);
  });
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

export function loadBackend(backendUrl: string): void {
  socket.value = io(backendUrl, {
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
loadBackend('');

export default feathersClient;
