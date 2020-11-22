<template>
  <div class="bg-white content py-20 px-20 flex justify-center">
    <inputField class="mx-20"></inputField>
    <outputList class="mx-20"></outputList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import outputList from './components/OutputList.vue';
import inputField from './components/InputField.vue';

export default defineComponent({
  name: 'App',
  components: {
    outputList,
    inputField,
  },
});
</script>

<style lang="css">
@import '../compiledStyle.css';

.content {
  height: 100vh;
}
</style>
