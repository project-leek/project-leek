<template>
  <div class="w-full p-4 px-6 items-center space-y-6">
    <LabeledInput label="Tag Name" class="w-full col-span-2">
      <Textfield
        v-model="currentTag.name"
        :placeholder="'z. B. Mario Figur'"
        class="rounded-full py-3"
        :required="true"
        @update:nfc-tag="$emit('update:nfc-tag', currentTag)"
      />
    </LabeledInput>

    <LabeledInput label="Gruppe" class="w-full col-span-2">
      <Dropdown
        v-model="selectedGroup"
        v-model:items="groupListItems"
        :removeable="false"
        :placeholder-text="'Wähle eine Gruppe'"
        :enable-add-item="true"
        :required="true"
        @update:model-value="selectGroup"
      />
    </LabeledInput>

    <LabeledInput label="Tag Track" class="w-full col-span-2">
      <Textfield
        v-model="selectedTrackName"
        :placeholder="'z. B. Never gonna give you up'"
        class="rounded-full py-3"
        @update:nfc-tag="$emit('update:nfc-tag', currentTag)"
        @click="$emit('open-track-details')"
      />
    </LabeledInput>

    <div class="flex flex-row w-full">
      <TagEntry class="ml-2 w-44 pt-2" :img="currentTag.imageUrl" />
      <Button
        class="p-3 px-6 m-auto bg-gradient-to-b from-primary to-secondary"
        :text="'Bild ändern'"
        @click="$emit('open-image-details')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { NFCTag, Track } from '@leek/commons';
import { defineComponent, onMounted, PropType, ref } from 'vue';

import feathers from '../../compositions/useBackend';
import Button from '../uiBlocks/Button.vue';
import ListItem from '../uiBlocks/Dropdown.ListItem';
import Dropdown from '../uiBlocks/Dropdown.vue';
import LabeledInput from '../uiBlocks/LabeledInput.vue';
import TagEntry from '../uiBlocks/TagEntry.vue';
import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'EditTag',
  components: {
    Textfield,
    Dropdown,
    LabeledInput,
    Button,
    TagEntry,
  },
  props: {
    nfcTag: {
      type: Object as PropType<NFCTag>,
      required: true,
    },
  },
  emits: { 'update:nfc-tag': null, 'open-image-details': null, 'open-track-details': null },
  setup(props, ctx) {
    const currentTag = ref<NFCTag>(props.nfcTag);
    const groupNames = ref<string[]>([]);
    const groupListItems = ref<ListItem[]>([]);
    const selectedGroup = ref<ListItem>();
    const selectedTrack = ref<Track>();
    const selectedTrackName = ref<string>('');

    async function loadTrack(): Promise<void> {
      const params = {};
      const id = currentTag.value.trackUri;
      try {
        selectedTrack.value = await feathers.service('spotify-tracks').get(id, params);
        if (selectedTrack.value) {
          selectedTrackName.value = selectedTrack.value.title;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('ERROR:', error);
      }
    }

    async function loadGroupNames(): Promise<void> {
      const allTags = await feathers.service('nfc-tags').find();
      if (allTags instanceof Array) {
        allTags.map((tag: NFCTag) => {
          if (tag.group && !groupNames.value.includes(tag.group)) {
            groupNames.value.push(tag.group);
          }
        });
      } else {
        allTags.data.map((tag: NFCTag) => {
          if (tag.group && !groupNames.value.includes(tag.group)) {
            groupNames.value.push(tag.group);
          }
        });
      }

      groupNames.value.map((groupName: string) =>
        groupListItems.value.push(new ListItem(groupName, groupName))
      );

      selectedGroup.value = groupListItems.value.find(
        (element) => element.value === currentTag.value.group
      );
    }

    onMounted(async () => {
      await loadGroupNames();
      await loadTrack();
    });

    function selectGroup(): void {
      currentTag.value.group = selectedGroup.value?.value || '';
      ctx.emit('update:nfc-tag', currentTag);
    }

    return {
      currentTag,
      groupListItems,
      selectedGroup,
      selectGroup,
      selectedTrackName,
    };
  },
});
</script>
