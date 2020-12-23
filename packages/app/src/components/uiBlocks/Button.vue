<template>
  <button
    class="bg-button border-2 border-button cursor-pointer text-center p-2 text-white shadow-lg rounded-full"
    @click="doClick"
  >
    <span class="flex">
      <img v-if="imagePath" class="w-8 h-8 mr-2 br" :src="imagePath" />
      <p class="my-auto font-heading text-xl font-extralight">{{ text }}</p>
    </span>
  </button>
</template>

<script>
import { defineComponent } from 'vue';
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
    revert: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    imagePath: {
      type: String,
      default: null,
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

      if (props.revert) {
        router.go(-1);
      }
    };

    return {
      doClick,
    };
  },
});
</script>
