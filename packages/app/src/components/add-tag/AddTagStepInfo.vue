<template>
  <div class="w-full p-4 h-full flex flex-col items-center">
    <LabeledInput label="Tag Name" class="w-full">
      <Textfield v-model="tagName" placeholder="z. B. Mario Figur" class="rounded-full" />
    </LabeledInput>

    <LabeledInput label="Gruppe" class="w-full mt-8">
      <Dropdown
        v-model="selectedGroup"
        v-model:items="groupListItems"
        :removeable="false"
        placeholder-text="Wähle eine Gruppe"
        enable-add-item
      />
    </LabeledInput>
  </div>
</template>

<script lang="ts">
import { Paginated } from '@feathersjs/feathers';
import { NFCTag } from '@leek/commons/';
import { uniq } from 'lodash';
import { computed, defineComponent, PropType, ref } from 'vue';

import feathers from '../../compositions/useBackend';
import ListItem from '../uiBlocks/Dropdown.ListItem';
import Dropdown from '../uiBlocks/Dropdown.vue';
import LabeledInput from '../uiBlocks/LabeledInput.vue';
import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'AddTagStepInfo',
  components: {
    Textfield,
    Dropdown,
    LabeledInput,
  },
  props: {
    nfcTag: {
      type: Object as PropType<NFCTag>,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:nfc-tag': (_payload: NFCTag): boolean => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:is-valid': (_payload: boolean): boolean => true,
  },
  setup(props, ctx) {
    const currentTag = ref(props.nfcTag);
    const groupNames = ref<string[]>([]);
    const groupListItems = ref<ListItem[]>([]);

    const selectedGroup = computed({
      get: () => (currentTag.value.group ? new ListItem(currentTag.value.group) : null),
      //Update only if itemValue is set (not at deselecting e.g.)
      set: (item: ListItem | null) => item && updateTag('group', item.value),
    });

    const tagName = computed({
      get: () => currentTag.value.name,
      set: (name: string) => updateTag('name', name),
    });

    async function loadGroupNames(): Promise<void> {
      const allTags = (await feathers.service('nfc-tags').find()) as Paginated<NFCTag>;
      groupNames.value = uniq(allTags.data.map((tag: NFCTag) => tag.group));
      groupListItems.value = groupNames.value.map((groupName: string) => new ListItem(groupName));
    }

    function updateTag(key: keyof Omit<NFCTag, '_id'>, value: string): void {
      const copy = currentTag.value;
      copy[key] = value;

      const isValid = !!(currentTag.value.group && currentTag.value.name);
      ctx.emit('update:nfc-tag', currentTag.value);
      ctx.emit('update:is-valid', isValid);
    }

    loadGroupNames().catch(() => {
      throw Error('failed to load group names');
    });

    return {
      tagName,
      groupListItems,
      selectedGroup,
    };
  },
});
</script>
