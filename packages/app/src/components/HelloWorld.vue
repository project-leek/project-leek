<template>
  <div>
    <NicksPetList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NicksPetList from './NicksPetList.vue';

export default defineComponent({
  name: 'HelloWorld',
  components: {
    NicksPetList,
  },
});
</script>
