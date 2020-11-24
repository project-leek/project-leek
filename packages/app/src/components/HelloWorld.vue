<template>
  <div class="hello-world">
    <div class="anton">
      <pre class="p-2">{{ antonsPets }}</pre>
      <button @click="count++" class="bg-pink-500 text-white p-2 mx-2 rounded">count is: {{ count }}</button>
      <button @click="spawnAPet" class="bg-pink-500 text-white mx-2 p-2 rounded">Spawn a pet</button>
    </div>
    <div class="julian content flex justify-center">
      <input-field class="m-2" />
      <output-list class="m-2" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { AntonsPet } from '@project-leek/commons';

import feathers from '../lib/feathers';
import inputField from './InputField.vue';
import outputList from './OutputList.vue';

export default defineComponent({
  name: 'HelloWorld',

  components: {
    inputField,
    outputList,
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
