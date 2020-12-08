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
      // TODO: make path configuarable
      // eslint-disable-next-line no-restricted-globals
      location.href = `http://localhost:3030/oauth/${props.oauthProvider}`;
    });
  },
});
</script>
