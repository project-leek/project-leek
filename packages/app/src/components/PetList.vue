<template>
  <div>
    HERE IS A PETLIST <br />
    <div v-for="rudolfo in rudolfos">
      {{ rudolfo.name }}
      {{ rudolfo.type }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Rudolfo } from '@project-leek/commons';
import { Paginated } from '@feathersjs/feathers';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'PetList',

  setup() {
    const rudolfos = ref<Rudolfo[]>([]);
    onMounted(async () => {
      const response = (await feathers.service('rudolfo').find()) as Paginated<
        Pet
      >;
      rudolfos.value = response.data;
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