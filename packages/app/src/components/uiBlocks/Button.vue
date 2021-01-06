<template>
  <button
    class="bg-button border-2 hover:bg-primary border-button cursor-pointer text-white shadow-xl rounded-full flex focus:outline-none"
    @click="doClick"
  >
    <span class="flex px-2">
      <span v-if="icon" class="mr-4 my-auto" :class="[icon, `text-${iconsize}`]" />
      <p v-if="text" class="my-auto font-heading font-extralight" :class="[`text-${textsize}`]">
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
  },
  emits: ['click'],
  setup(props, ctx) {
    const router = useRouter();

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
