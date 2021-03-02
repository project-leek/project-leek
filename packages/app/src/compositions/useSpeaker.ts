import { Speaker } from '@leek/commons';
import { ref } from 'vue';

import feathers from './useBackend';

let areSpeakersLoaded = false;
export const speakers = ref<Speaker[]>();

export async function loadSpeakers(): Promise<void> {
  speakers.value = (await feathers.service('spotify-speakers').find()) as Speaker[];

  if (areSpeakersLoaded) {
    return;
  }

  areSpeakersLoaded = true;

  feathers.service('spotify-speakers').on('removed', (speaker: Speaker): void => {
    speakers.value = (speakers.value || []).filter((_speaker) => _speaker._id !== speaker._id);
  });

  feathers.service('spotify-speakers').on('created', (speaker: Speaker): void => {
    speakers.value = [...(speakers.value || []), speaker];
  });
}

feathers.on('login', () => {
  void loadSpeakers();
});

feathers.on('logout', () => {
  speakers.value = undefined;
});
