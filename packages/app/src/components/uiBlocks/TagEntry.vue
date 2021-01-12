<template>
  <div class="flex flex-col flex-shrink-0">
    <div class="relative pb-1/1">
      <img class="absolute w-full h-full rounded-xl" :src="image" />
    </div>
    <div id="TagName" class="h-2/6 text-white font-semibold" :class="[`text-${textSize}`]">
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
      required: true,
    },
    textSize: {
      type: String,
      required: false,
      default: 'base',
    },
  },
  setup(props) {
    const image = `./${props.img}`;
    return { image };
  },
});
</script>

<style lang="scss" scoped></style>
