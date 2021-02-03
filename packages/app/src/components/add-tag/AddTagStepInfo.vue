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
        :enable-add-item="true"
        @update:model-value="selectGroup()"
      />
    </LabeledInput>
  </div>
</template>

<script lang="ts">
import { NFCTag, TagResult } from '@leek/commons/';
import { debounce } from 'lodash';
import { defineComponent, PropType, ref, watch } from 'vue';

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
    'update:nfc-tag': (_payload: TagResult): boolean => true,
  },
  setup(props, ctx) {
    const currentTag = ref(props.nfcTag);
    const groupNames = ref<string[]>([]);
    const groupListItems = ref<ListItem[]>([]);
    const selectedGroup = ref<ListItem>();
    const tagName = ref<string>('');

    if (currentTag.value && currentTag.value.name) {
      tagName.value = currentTag.value.name;
      updateTag();
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

    const setName = debounce(() => {
      currentTag.value.name = tagName.value;
      updateTag();
    }, 1000 * 0.5);

    watch(tagName, () => {
      setName();
    });

    function selectGroup(): void {
      currentTag.value.group = selectedGroup.value?.value || '';
      updateTag();
    }

    function updateTag(): void {
      if (currentTag.value != null) {
        const res = {
          tag: currentTag.value,
          valid: !!(currentTag.value.group && currentTag.value.name),
        };
        ctx.emit('update:nfc-tag', res);
      }
    }

    loadGroupNames().catch(() => {
      throw Error('failed to load group names');
    });

    return {
      tagName,
      groupListItems,
      selectedGroup,
      selectGroup,
    };
  },
});
</script>
