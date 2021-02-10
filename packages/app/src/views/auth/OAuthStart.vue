<template>
  <div />
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue';

import { backendUrl } from '../../compositions/useBackend';

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
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      location.href = `${backendUrl.value}/oauth/${props.oauthProvider}`;
    });
  },
});
</script>
