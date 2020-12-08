<template>
  <div class="flex m-auto">
    <router-link
      :to="{ name: 'oauth-start', params: { oauthProvider: 'spotify' } }"
      class="cursor-pointer bg-green-600 rounded-full text-center p-2 text-white"
      >Login with Spotify</router-link
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
});
</script>
