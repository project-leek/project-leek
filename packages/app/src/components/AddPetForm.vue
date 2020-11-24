<template>
  <div>
    HERE IS MY PET FORM:
    <br />
    <input v-model="name" placeholder="name" />
    <input v-model="type" placeholder="type" /><br />
    <button @click="createPet">add Pet</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Rudolfo } from '@project-leek/commons';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'AddPetForm',

  setup() {
    const name = ref('');
    const type = ref('');

    const createPet = async () => {
      const pet: Rudolfo = {
        name: name.value,
        type: type.value,
      };

      await feathers.service('rudolfo').create(pet);

      name.value = '';
      type.value = '';
    };

    return {
      createPet,
      name,
      type,
    };
  },
});
</script>
