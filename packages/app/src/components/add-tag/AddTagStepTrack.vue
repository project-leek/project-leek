<template>
  <div id="content_wrapper" class="flex flex-col">
    <!-- Search -->
    <Textfield
      v-model="search"
      class="mx-auto mb-8"
      placeholder="Titelsuche"
      icon="fas fa-search"
    />

    <GroupDropDown>
      <GroupDropDownItem groupname="Zuletzt gehört">
        <div class="flex flex-row flex-grow content-start p-2 overflow-x-auto">
          <tag-entry class="m-4 w-32" name="City Song" img="./stadt.jpg" />
          <tag-entry class="m-4 w-32" name="City Song" img="./stadt.jpg" />
          <tag-entry class="m-4 w-32" img="./stadt.jpg" />
          <tag-entry class="m-4 w-32" img="./stadt.jpg" />
        </div>
      </GroupDropDownItem>
    </GroupDropDown>

    <div id="liste">
      <ul>
        <li v-for="track in tracks" :key="track.uri" @click="changeTrack(track)">
          <span :class="{ 'bg-red-400': selectedTrack && selectedTrack.uri === track.uri }">
            {{ track.title }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { NFCTag, SpotifyTrack } from '@leek/commons';
import { defineComponent, PropType, ref, watch } from 'vue';

import feathers from '../../lib/feathers';
import GroupDropDown from '../uiBlocks/GroupDropDown.vue';
import GroupDropDownItem from '../uiBlocks/GroupDropDownItem.vue';
import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'AddTagStepTrack',
  components: {
    Textfield,
    GroupDropDown,
    GroupDropDownItem,
  },
  props: {
    nfcTag: {
      type: Object as PropType<NFCTag>,
      required: true,
    },
  },
  emits: ['update:nfc-tag'],
  setup(props, ctx) {
    const search = ref<string>('');
    const tracks = ref<SpotifyTrack[]>([]);
    const tag = ref<NFCTag>(props.nfcTag);
    const selectedTrack = ref<SpotifyTrack>();

    watch(search, async (search) => {
      if (search.length >= 3) {
        const params = {
          query: {
            name: search,
          },
        };
        tracks.value = (await feathers.service('spotify-tracks').find(params)) as SpotifyTrack[];
      }
    });

    const changeTrack = (track: SpotifyTrack): void => {
      selectedTrack.value = track;
      tag.value.spotifyTrackUri = track.uri;
      tag.value.imageUrl = track.imageUri;
      ctx.emit('update:nfc-tag', tag);
    };

    return {
      search,
      tracks,
      changeTrack,
      selectedTrack,
    };
  },
});
</script>

<style></style>
