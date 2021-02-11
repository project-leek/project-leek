<template>
  <div
    class="textfield flex flex-row border-2 bg-white border-yellow-400 px-4 py-1 rounded-full focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-25 shadow-lg"
    :class="{ 'ring-red-600 ring-2 ring-inset': required && modelValue === '' }"
  >
    <span v-if="icon" class="icon mr-4 text-xl my-auto" :class="['fas', `fa-${icon}`]" />
    <input
      class="input w-full outline-none bg-transparent placeholder-opacity-50 text-xl"
      :placeholder="placeholder"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Textfield',

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
    required: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_payload: string): boolean => true,
  },
});
</script>
