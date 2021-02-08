import { Speaker } from '@leek/commons';
import { ref } from 'vue';

import feathers from './useBackend';

const speakerService = feathers.service('spotify-speakers');
let areSpeakersLoaded = false;
export const speakers = ref<Speaker[]>();

export async function loadSpeakers(): Promise<void> {
  speakers.value = (await speakerService.find()) as Speaker[];

  if (areSpeakersLoaded) {
    return;
  }

  areSpeakersLoaded = true;

  speakerService.on('removed', (speaker: Speaker): void => {
    speakers.value = (speakers.value || []).filter((_speaker) => _speaker._id !== speaker._id);
  });

  speakerService.on('created', (speaker: Speaker): void => {
    speakers.value = [...(speakers.value || []), speaker];
  });
}

feathers.on('login', () => {
  void loadSpeakers();
});