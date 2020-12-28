<template>
  <div class="m-auto">
    <pre>{{ user }}</pre>
    <p>Suchefeld</p>
    <Textfield v-model="text" class="mb-4" icon="search" placeholder="Titelsuche" />
    <p>Textfield</p>
    <Textfield v-model="text" class="mb-4" label="Title" placeholder="Titelsuche" />
    <div
      class="cursor-pointer bg-green-600 rounded-full text-center p-2 text-white"
      @click="logout"
    >
      Logout
    </div>
    <div>Parent output: {{ text }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { user, logout } from '../compositions/useAuthentication';
import Textfield from '../components/uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'Home',
  components: { Textfield },
  setup() {
    const text = ref('');
    return {
      user,
      logout,
      text,
    };
  },
});
</script>
