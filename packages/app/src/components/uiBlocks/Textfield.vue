<template>
  <div class="max-w-max flex flex-col">
    <!-- label -->
    <p v-if="label" class="font-bold pl-4">{{ label }}</p>
    <!-- textfield with icon-->
    <div
      class="flex flex-row border-2 bg-white border-yellow-400 px-4 py-1 rounded-full focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-25 shadow-lg"
    >
      <span v-if="icon" class="mr-4 text-xl my-auto" :class="['fas', `fa-${icon}`]" />
      <input
        class="focus: outline-none bg-transparent placeholder-opacity-50 text-2xl"
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
