<template>
  <div class="flex flex-col">
    <div class="relative pb-1/1">
      <img
        class="absolute w-auto h-full rounded-xl object-cover border-2 border-transparent"
        :src="img"
        :class="{ [`shadow-2xl border-white`]: selected }"
      />
    </div>
    <div
      v-if="name"
      id="TagName"
      class="h-2/6 text-white font-semibold"
      :class="[`text-${textSize}`]"
    >
      {{ name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    img: {
      type: String,
      required: true,
      default: '',
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    textSize: {
      type: String,
      default: 'base',
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>
