<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
    <p>
      Edit <code>components/HelloWorld.vue</code> to test hot module
      replacement.
    </p>
    <jans-pet-display/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JansPetDisplay from './JansPetDisplay.vue';

export default defineComponent({
  name: 'HelloWorld',

  components: { JansPetDisplay },

  props: {
    msg: {
      type: String,
      default: 'Hexe',
    },
  },

  data() {
    return {
      count: 0,
    };
  },
});
</script>
