<template>
  <div
    class="bg-gradient-to-b from-primary to-secondary w-full py-5 h-full flex flex-col items-center"
  >
    <div class="w-11/12">
      <span class="text-base text-white text-left p-5">Tag Name</span>
      <textfield
        v-model="currentTag.name"
        placeholder="e.g. mario figurine"
        class="bg-white rounded-full"
        @update="$emit('update:modelValue', currentTag)"
      />
    </div>
    <div class="w-11/12">
      <span class="text-base text-white text-left p-5">Group</span>
      <Dropdown v-model="selectedGroup" :items="groupNames" />
    </div>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons/';
import { defineComponent, PropType, ref } from 'vue';

import feathers from '../../lib/feathers';
import ListItem from '../uiBlocks/Dropdown.ListItem';
import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'AddTagStepInfo',
  components: {
    Textfield,
  },
  props: {
    modelValue: {
      type: Object as PropType<NFCTag>,
      required: true,
    },
  },
  emits: { 'update:modelValue': null },
  setup(props) {
    const currentTag = ref(props.modelValue);
    const groupNames = ref<ListItem[]>([]);
    const selectedGroup = ref<ListItem>();

    async function loadGroupNames(): Promise<void> {
      const allTags = await feathers.service('nfc-tags').find();
      if (allTags instanceof Array) {
        allTags.map((tag: NFCTag) => {
          groupNames.value.push(new ListItem(tag.group, tag.group));
        });
      } else {
        allTags.data.map((tag: NFCTag) => {
          groupNames.value.push(new ListItem(tag.group, tag.group));
        });
      }
      selectedGroup.value = groupNames.value.find(
        (element) => element.value === currentTag.value.group
      );
    }

    loadGroupNames().catch(() => {
      throw Error('failed to load group names');
    });

    return {
      currentTag,
      groupNames,
      selectedGroup,
    };
  },
});
</script>
