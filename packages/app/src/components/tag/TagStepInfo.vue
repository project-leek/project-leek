<template>
  <div class="w-full p-4 h-full flex flex-col items-center">
    <LabeledInput label="Tag Name" class="w-full">
      <Textfield v-model="tagName" placeholder="z. B. Mario Figur" class="rounded-full" />
    </LabeledInput>

    <LabeledInput label="Gruppe" class="w-full mt-8">
      <Dropdown
        v-model="selectedGroup"
        v-model:items="tagGroupListItems"
        :removeable="false"
        placeholder-text="Wähle eine Gruppe"
        enable-add-item
      />
    </LabeledInput>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons/';
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';

import { loadTagGroups, tagGroupListItems } from '../../compositions/useNfcTag';
import ListItem from '../uiBlocks/Dropdown.ListItem';
import Dropdown from '../uiBlocks/Dropdown.vue';
import LabeledInput from '../uiBlocks/LabeledInput.vue';
import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'TagStepInfo',

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

    const selectedGroup = computed({
      get: () => (currentTag.value.group ? new ListItem(currentTag.value.group) : null),
      //Update only if itemValue is set (not at deselecting e.g.)
      set: (item: ListItem | null) => item && updateTag('group', item.value),
    });

    const tagName = computed({
      get: () => currentTag.value.name,
      set: (name: string) => updateTag('name', name),
    });

    function updateTag(key: keyof Omit<NFCTag, '_id'>, value: string): void {
      const copy = currentTag.value;
      copy[key] = value;

      const isValid = !!(currentTag.value.group && currentTag.value.name);
      ctx.emit('update:nfc-tag', currentTag.value);
      ctx.emit('update:is-valid', isValid);
    }

    onMounted(async () => {
      await loadTagGroups();
    });

    return {
      tagName,
      tagGroupListItems,
      selectedGroup,
    };
  },
});
</script>
