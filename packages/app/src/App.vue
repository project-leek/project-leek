<template>
  <div class="bg-white content pt-20 px-20 pb-20 grid grid-cols-2 gap-10" >
    <inputField></inputField>
    <outputList></outputList>
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
@import "../compiledStyle.css";

.content{
  height: 100vh;
}
</style>
