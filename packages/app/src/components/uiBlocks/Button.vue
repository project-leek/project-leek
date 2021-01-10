<template>
  <button
    class="bg-button border-2 hover:bg-primary border-button cursor-pointer text-white shadow-xl rounded-full flex focus:outline-none"
    @click="doClick"
  >
    <span class="text flex h-full w-full">
      <span
        v-if="icon"
        class="my-auto"
        :class="[
          { 'm-auto': rounded },
          icon,
          { 'mx-auto': !rounded && !text },
          { 'ml-2': text },
          `text-${iconsize}`,
        ]"
      />
      <p
        v-if="text"
        class="my-auto font-heading font-extralight"
        :class="[{ 'ml-4': icon }, { 'mx-auto': !rounded && !icon }, `text-${textsize}`]"
      >
        {{ text }}
      </p>
    </span>
  </button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
    to: {
      type: [Object, String],
      default: null,
    },
    revert: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    textSize: {
      type: Number,
      required: false,
      default: 3,
    },
    iconSize: {
      type: Number,
      required: false,
      default: 3,
    },
    round: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, ctx) {
    const router = useRouter();
    const rounded = ref(props.round);

    const doClick = async () => {
      if (props.disabled) {
        return;
      }

      if (props.to) {
        router.push(props.to);
        return;
      }

      if (props.revert) {
        router.go(-1);
      }
      ctx.emit('click');
    };

    const getSize = (size) => {
      let strSize = '';
      if (size === 1) {
        strSize = 'xs';
      } else if (size === 2) {
        strSize = 'sm';
      } else if (size === 3) {
        strSize = 'md';
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

    const textsize = ref(getSize(props.textSize));
    const iconsize = ref(getSize(props.iconSize));
    return {
      doClick,
      textsize,
      iconsize,
      rounded,
    };
  },
});
</script>
