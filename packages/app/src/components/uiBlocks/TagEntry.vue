<template>
  <div class="w-20 bg-red-400">
    <img class=" w-full h-20  object-scale-down" :src="image" />
    <div id="TagName" class="text-2xl text-white font-semibold">{{ name }}</div>
  </div>
</template>

<script>
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
  },
  setup(props) {
    const image = `./${props.img}`;
    return { image };
  },
});
</script>

<style lang="scss" scoped></style>
