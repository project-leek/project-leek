<template>
  <button
    class="flex relative items-center outline-none focus:outline-none rounded-full border-yellow-400 border-2"
    :class="containerClasses"
    :disabled="disabled"
    :type="type"
    @click="doClick"
  >
    <slot>
      <span v-if="icon && text" class="absolute text-white" :class="iconClasses" />
      <span
        v-if="icon && !text"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
        :class="iconClasses"
      />
      <div v-if="!text && icon" :class="`icon-size-${size}`" />
      <span v-if="text || (!text && !icon)" class="text-white mx-auto" :class="textClasses">{{
        text || 'Absenden'
      }}</span>
    </slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { RouteLocationRaw, useRouter } from 'vue-router';

const sizes = {
  xs: {
    padding: '',
    iconSize: 'text-lg',
    textSize: 'text-lg',
  },
  md: {
    padding: 'p-2',
    iconSize: 'text-2xl',
    textSize: 'text-2xl',
  },
  lg: {
    padding: 'p-3',
    iconSize: 'text-4xl',
    textSize: 'text-3xl',
  },
};

export default defineComponent({
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
    to: {
      type: [Object, String] as PropType<RouteLocationRaw>,
      required: false,
      default: null,
    },
    back: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String as PropType<'submit' | 'reset' | null>,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    iconRight: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: String as PropType<keyof typeof sizes>,
      required: false,
      default: 'md',
    },
  },

  emits: {
    click: (): boolean => true,
  },

  setup(props, ctx) {
    const router = useRouter();

    const doClick = (): void => {
      if (props.disabled) {
        return;
      }

      if (props.to) {
        void router.push(props.to);
        return;
      }

      if (props.back) {
        router.go(-1);
      }

      ctx.emit('click');
    };

    const iconClasses = computed(() => [
      props.icon,
      sizes[props.size].iconSize,
      `${props.iconRight ? 'right' : 'left'}-6`,
    ]);
    const textClasses = computed(() => [sizes[props.size].textSize]);
    const containerClasses = computed(() => {
      const classes = [];
      classes.push('bg-gradient-to-b from-primary to-secondary');
      classes.push('shadow-2xl');
      classes.push('ring-2 ring-yellow-300 ring-opacity-30');

      if (props.text) {
        classes.push(sizes[props.size].padding);
      }

      if (props.disabled) {
        classes.push('opacity-50');
        classes.push('cursor-not-allowed');
      } else {
        classes.push('hover:opacity-70');
      }

      return classes;
    });

    return {
      containerClasses,
      iconClasses,
      textClasses,
      doClick,
    };
  },
});
</script>

<style scoped>
.icon-size-xs {
  /* text-lg */
  width: calc(1.75rem);
  height: calc(1.75rem);
}

.icon-size-md {
  /* p-2 + text-2xl */
  width: calc(2 * 0.5rem + 2rem);
  height: calc(2 * 0.5rem + 2rem);
}

.icon-size-lg {
  /* p-3 + text-4xl */
  width: calc(2 * 0.75rem + 2.5rem);
  height: calc(2 * 0.75rem + 2.5rem);
}
</style>
