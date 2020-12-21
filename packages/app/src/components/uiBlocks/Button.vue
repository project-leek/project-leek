<template>
  <button
    class="bg-black cursor-pointer rounded-md text-center p-2 text-white shadow-lg"
    @click="doClick"
  >
    <span>{{ text }}</span>
  </button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    to: {
      type: [Object, String],
      default: null,
    },
    back: {
      type: Boolean,
      default: false,
    },
    withLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props) {
    const router = useRouter();

    const doClick = async () => {
      if (props.disabled) {
        return;
      }

      if (props.to) {
        router.push(props.to);
        return;
      }

      if (props.back) {
        router.go(-1);
      }
    };

    return {
      doClick,
    };
  },
});
</script>
