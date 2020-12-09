<template>
  <div class="m-auto">
    <pre>{{ user }}</pre>
    <div
      class="cursor-pointer bg-green-600 rounded-full text-center p-2 text-white"
      @click="logout"
    >
      Logout
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { user, logout } from '../compositions/useAuthentication';

export default defineComponent({
  name: 'Home',

  setup() {
    return {
      user,
      logout,
    };
  },
});
</script>
