<template>
  <div class="w-full p-4 px-6 h-full grid grid-col-2 items-center space-y-6">
    <LabeledInput label="Tag Name" class="w-full col-span-2">
      <Textfield
        v-model="currentTag.name"
        placeholder="z. B. Mario Figur"
        class="rounded-full"
        @update="$emit('update:nfc-tag', currentTag)"
      />
    </LabeledInput>

    <LabeledInput label="Gruppe" class="w-full col-span-2">
      <Dropdown
        v-model="selectedGroup"
        v-model:items="groupListItems"
        :removeable="false"
        placeholder-text="Wähle eine Gruppe"
        :enable-add-item="true"
        @update:model-value="selectGroup()"
      />
    </LabeledInput>
    <p class="my-auto font-heading font-extralight text-md">Test</p>
    <Button class="p-3 px-6 my-auto" :text="'Song ändern'" @click="$emit('open-track-details')" />
    <TagEntry class="ml-2 w-32 pt-2" :img="currentTag.imageUrl" />
    <Button class="p-3 px-6 my-auto" :text="'Bild ändern'" @click="$emit('open-image-details')" />
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons/';
import { defineComponent, PropType, ref } from 'vue';

import feathers from '../../lib/feathers';
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
    const currentTag = ref(props.nfcTag);
    const groupNames = ref<string[]>([]);
    const groupListItems = ref<ListItem[]>([]);
    const selectedGroup = ref<ListItem>();

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

    function selectGroup(): void {
      currentTag.value.group = selectedGroup.value?.value || '';
      ctx.emit('update:nfc-tag', currentTag);
    }

    loadGroupNames().catch(() => {
      throw Error('failed to load group names');
    });

    return {
      currentTag,
      groupListItems,
      selectedGroup,
      selectGroup,
    };
  },
});
</script>
