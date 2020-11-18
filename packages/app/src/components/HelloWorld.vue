<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
    <button @click="spawnAPet">Spawn a pet</button>
    <pre>
      {{ antonsPets }}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { User, AntonsPet } from '@project-leek/commons';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'HelloWorld',

  props: {
    msg: {
      type: String,
      default: 'Hexe',
    },
  },

  setup() {
    const count = ref(0);
    const antonsPets = ref<AntonsPet[]>([]);

    onMounted(async () => {
      const response = await feathers.service('antons-pets').find();
      antonsPets.value = response.data;
    });

    const spawnAPet = async () => {
      const newAntonsPet: AntonsPet = {
        name: `Antons geile Maus geboren am ${Date.now()}`,
      };
      await feathers.service('antons-pets').create(newAntonsPet);
    };

    feathers.service('antons-pets').on('created', (antonsNewPet) => {
      console.log('schmeckt', antonsNewPet, antonsPets.value);
      antonsPets.value.push(antonsNewPet);
    });

    return {
      count,
      spawnAPet,
      antonsPets,
    };
  },
});
</script>
