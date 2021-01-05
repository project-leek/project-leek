<template>
  <dropdown
    v-model="selectedGroupName"
    :selectable-item-values="allGroupNames"
    class="w-full"
    @update:modelValue="onUpdate()"
  />
</template>

<script lang="ts">
import { TagGroup } from '@leek/commons';
import { defineComponent, onMounted, ref } from 'vue';
import feathers from '../../lib/feathers';
import Dropdown from '../uiBlocks/Dropdown.vue';

export default defineComponent({
  name: 'TagGroupSelector',
  components: { Dropdown },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    let allGroups: TagGroup[];
    const allGroupNames = ref<string[]>();

    const selectedGroup = ref<TagGroup>();
    const selectedGroupName = ref<string>();

    onMounted(async () => {
      allGroups = (await feathers.service('tag-groups').find()).data;
      allGroupNames.value = allGroups.map((group: TagGroup) => group.name);

      selectedGroup.value = allGroups.find((element) => element._id === props.modelValue);
      selectedGroupName.value = selectedGroup.value?.name;
    });

    function onUpdate() {
      selectedGroup.value = allGroups.find((element) => element.name === selectedGroupName.value);
      this.$emit('update:modelValue', selectedGroup.value?._id);
    }

    return {
      onUpdate,
      allGroupNames,
      selectedGroupName,
    };
  },
});
</script>
