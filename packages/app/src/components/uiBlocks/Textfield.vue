<template>
  <div class="w-full flex flex-col">
    <!-- label -->
    <span v-if="label" class="font-bold ml-6 text-white">{{ label }}</span>
    <!-- textfield with icon-->
    <div
      class="flex flex-row border-2 bg-white border-yellow-400 px-4 py-1 rounded-full focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-25 shadow-lg"
    >
      <span v-if="icon" class="mr-4 text-xl my-auto" :class="['fas', `fa-${icon}`]" />
      <input
        class="w-full outline-none bg-transparent placeholder-opacity-50 text-xl"
        :placeholder="placeholder"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
});
</script>
