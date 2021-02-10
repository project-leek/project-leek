<template>
  <div />
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'OAuthStart',

  props: {
    oauthProvider: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    onBeforeMount(() => {
      // eslint-disable-next-line no-restricted-globals
      location.href = `/oauth/${props.oauthProvider}`;
    });
  },
});
</script>
