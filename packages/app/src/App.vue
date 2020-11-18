<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld />
    <NicksPetList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HelloWorld from './components/HelloWorld.vue';
import NicksPetList from './components/NicksPetList.vue';

export default defineComponent({
  name: 'App',

  components: {
    HelloWorld,
    NicksPetList,
  },

  nicksPets() {},
});
</script>
