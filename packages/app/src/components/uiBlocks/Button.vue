<template>
  <button
    class="bg-button border-2 border-button cursor-pointer text-white shadow-xl rounded-full flex focus:outline-none"
    @click="doClick"
  >
    <span class="flex px-2">
      <span v-if="icon" class="mr-4 my-auto" :class="[icon, `text-${iconsize}`]" />
      <p class="my-auto font-heading font-extralight" :class="[`text-${textsize}`]">
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
      required: true,
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
  },

  emits: ['click'],

  setup(props) {
    const router = useRouter();

    const doClick = () => {
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
    };

    const getSize = (size: number) => {
      if (size === 1) {
        return 'xl';
      }

      if (size > 1 && size <= 9) {
        return `${size}xl`;
      }

      throw Error('invalid number for size. Size must be between 1 and 9');
    };

    const textsize = ref(getSize(props.textSize));
    const iconsize = ref(getSize(props.iconSize));

    return {
      doClick,
      textsize,
      iconsize,
    };
  },
});
</script>
