<template>
  <div
    class="bg-gradient-to-b from-primary to-secondary w-full py-5 h-full flex flex-col items-center"
  >
    <div class="w-11/12">
      <span class="text-base text-white text-left p-5">Tag Name</span>
      <textfield
        v-model="currentTag.name"
        placeholder="e.g. mario figurine"
        class="bg-white rounded-full w-full"
        @update="$emit('update:nfc-tag', currentTag)"
      />
    </div>
    <div class="w-11/12">
      <span class="text-base text-white text-left p-5">Group</span>
      <Dropdown
        v-model="selectedGroup"
        v-model:items="groupNames"
        :removeable="false"
        placeholder-text="Select a group"
        :enable-add-item="true"
        @update:model-value="selectGroup()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons/';
import { defineComponent, PropType, ref } from 'vue';

import feathers from '../../lib/feathers';
import ListItem from '../uiBlocks/Dropdown.ListItem';
import Dropdown from '../uiBlocks/Dropdown.vue';
import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'AddTagStepInfo',
  components: {
    Textfield,
    Dropdown,
  },
  props: {
    nfcTag: {
      type: Object as PropType<NFCTag>,
      required: true,
    },
  },
  emits: { 'update:nfc-tag': null },
  setup(props, ctx) {
    const currentTag = ref(props.nfcTag);
    const groupNames = ref<ListItem[]>([]);
    const selectedGroup = ref<ListItem>();

    async function loadGroupNames(): Promise<void> {
      const allTags = await feathers.service('nfc-tags').find();
      if (allTags instanceof Array) {
        allTags.map((tag: NFCTag) => {
          if (tag.group) {
            groupNames.value.push(new ListItem(tag.group, tag.group));
          }
        });
      } else {
        allTags.data.map((tag: NFCTag) => {
          if (tag.group) {
            groupNames.value.push(new ListItem(tag.group, tag.group));
          }
        });
      }
      selectedGroup.value = groupNames.value.find(
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
      groupNames,
      selectedGroup,
      selectGroup,
    };
  },
});
</script>
