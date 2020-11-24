<template>
  <div>
    HERE IS MY PETLIST <br />
    <div v-for="rudolfo in rudolfos" :key="rudolfo._id">
      {{ rudolfo.name }}
      {{ rudolfo.type }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Rudolfo } from '@project-leek/commons';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'PetList',

  setup() {
    const rudolfos = ref<Rudolfo[]>([]);

    onMounted(async () => {
      rudolfos.value = await feathers.service('rudolfo').find();
    });

    feathers.service('rudolfo').on('created', (newPet) => {
      rudolfos.value.push(newPet);
    });

    return {
      rudolfos,
    };
  },
});
</script>