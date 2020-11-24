<template>
  <div class="bg-white lg:p-20 md:p-10 flex flex-wrap justify-center">
    <inputField class=""></inputField>
    <outputList class=""></outputList>
    <jans-pet-display class="wi" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import outputList from './components/OutputList.vue';
import inputField from './components/InputField.vue';
import jansPetDisplay from './components/JansPetDisplay.vue';

export default defineComponent({
  name: 'App',
  components: {
    outputList,
    inputField,
    jansPetDisplay,
  },
});
</script>

<style lang="css">
.content {
  height: 100vh;
}
</style>
