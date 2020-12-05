<template>
  <div class="m-auto">
    <pre>{{ user }}</pre>
    <div @click="logout" class="bg-green-100">Logout</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { user, logout } from '../compositions/authentication';

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
