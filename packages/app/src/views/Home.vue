<template>
  <div class="m-auto">
    <pre>{{ user }}</pre>
    <p>Suchefeld</p>
    <Textfield class="mb-4" v-model="text" icon="search" placeholder="Titelsuche"></Textfield>
    <p>Textfield</p>
    <Textfield class="mb-4" v-model="text" label="Title" placeholder="Titelsuche"></Textfield>
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
