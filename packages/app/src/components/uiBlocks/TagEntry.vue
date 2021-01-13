<template>
  <div class="flex flex-col flex-shrink-0">
    <div class="relative pb-1/1">
      <img class="absolute w-full h-full rounded-xl" :src="image" />
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
import { computed, defineComponent } from 'vue';

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
      required: false,
      default: 'base',
    },
  },
  setup(props) {
    const image = computed(() => props.img);
    return { image };
  },
});
</script>

<style lang="scss" scoped></style>
