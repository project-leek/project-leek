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

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { RouteLocationRaw, useRouter } from 'vue-router';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
    to: {
      type: [Object, String] as PropType<RouteLocationRaw>,
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

    const doClick = (): void => {
      if (props.disabled) {
        return;
      }

      if (props.to) {
        void router.push(props.to);
        return;
      }

      if (props.revert) {
        router.go(-1);
      }

      ctx.emit('click');
    };

    const getSize = (size): string => {
      if (size === 1) {
        return 'xs';
      }

      if (size === 2) {
        return 'sm';
      }

      if (size === 3) {
        return 'md';
      }

      if (size === 4) {
        return 'lg';
      }

      if (size === 5) {
        return 'xl';
      }

      if (size > 5 && size <= 13) {
        return `${size - 4}xl`;
      }

      throw Error('invalid number for size. Size must be between 1 and 13');
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
