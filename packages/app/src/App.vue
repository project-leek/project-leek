<template>
  <div class="content">
    <div class="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import OutputList from './components/OutputList.vue';
import InputField from './components/InputField.vue';

export default defineComponent({
  name: 'App',
  components: {
    OutputList,
    InputField,
  },
});
</script>

<style lang="scss">
@import "../compiledStyle.css";

.content{
  display: grid;
  background-color: green;
  height: 100vh;
  min-width: 100wh;
}
</style>
