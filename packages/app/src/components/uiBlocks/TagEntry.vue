<template>
  <div class="flex flex-col">
    <img class="pb" :src="image" />
    <div id="TagName" class="h-2/6 text-white font-semibold" :class="[`text-${textSizeText}`]">
      {{ name }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

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
      type: Number,
      required: false,
      default: 5,
    },
  },
  setup(props) {
    const image = `./${props.img}`;

    const getSize = (size) => {
      let strSize = '';
      if (size === 1) {
        strSize = 'xs';
      } else if (size === 2) {
        strSize = 'sm';
      } else if (size === 3) {
        strSize = 'base';
      } else if (size === 4) {
        strSize = 'lg';
      } else if (size === 5) {
        strSize = 'xl';
      } else if (size > 5 && size <= 13) {
        strSize = `${size - 4}xl`;
      } else {
        throw Error('invalid number for size. Size must be between 1 and 13');
      }
      return strSize;
    };
    const textSizeText = ref(getSize(props.textSize));

    return { image, textSizeText };
  },
});
</script>

<style lang="scss" scoped></style>
