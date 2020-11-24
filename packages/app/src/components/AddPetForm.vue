<template>
  <div>
    PET FORM:
    <br />
    <input v-model="name" placeholder="name">
    <p>name is: {{name}}</p>
    <input v-model="type" placeholder="type">
    <p>name is: {{type}}</p>
    <button @click="createPet">add Pet</button>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import feathers from '../lib/feathers';
import { Rudolfo } from '@project-leek/commons';

export default defineComponent({
  name: 'AddPetForm',

  setup() {
    const name = ref("");
    const type = ref("");

    const createPet = async () => {
      const pet: Rudolfo = {
        name: name,
        type: type,
      };

      await feathers.service('rudolfo').create(pet);
      name.value = "";
      type.value = "";
    };

    return {
      createPet,
      name,
      type,
    };
  },
});
</script>