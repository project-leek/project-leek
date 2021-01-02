<template>
  <div id="wraper">
    <button
      class="bg-button border-2 border-button cursor-pointer text-center px-3 py-1 text-white shadow-xl rounded-full flex items-center"
      @click="doClick"
    >
      <span class="flex px-2">
        <span v-if="icon" class="mr-4 text-xl my-auto" :class="['fas', `fa-${icon}`]" />
        <img v-if="imagePath" class="w-10 h-10 mr-2 br" :src="imagePath" />
        <p :class="['my-auto', 'font-heading', 'font-extralight', `text-${textsize}`]">
          {{ text }}
        </p>
      </span>
    </button>
  </div>
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
    icon: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: Number,
      required: false,
      default: 3,
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

    const textsize = ref('');
    const one = 1;
    console.log(props.size);
    if (props.size === one) {
      console.log('Eins');
      textsize.value = 'xl';
    } else if (props.size > 1) {
      const tmpSize = props.size > 9 ? 9 : props.size;
      textsize.value = `${tmpSize}xl`;
    }

    return {
      doClick,
      textsize,
    };
  },
});
</script>
