<template>
  <div>
    <h3>gehimbh.de</h3>
    <div v-for="pet in nicksPets" :key="pet.id">
      {{ pet.name }}
      <button @click="deletePet(pet)">X</button>
    </div>
    <form @submit.prevent="createNewPet">
      <input v-model="form.petName" type="text" placeholder="name of the pet" />
      <input type="submit" value="Senden" />
    </form>
  </div>
</template>

<script lang="ts">
import { NicksPet } from '@project-leek/commons';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'NicksPetList',

  setup() {
    const nicksPets = ref([]);
    const form = reactive({ petName: '' });

    onMounted(async () => {
      nicksPets.value = await feathers.service('nicksPets').find();
    });

    feathers.service('nicksPets').on('created', (createdPet) => {
      nicksPets.value.push(createdPet);
    });

    feathers.service('nicksPets').on('removed', (deletedPet) => {
      nicksPets.value = nicksPets.value.filter((p) => p._id !== deletedPet._id);
    });

    const createNewPet = async () => {
      const newPet = { name: form.petName};
      await feathers.service('nicksPets').create(newPet);
      form.petName = '';
    };

    const deletePet = async (pet) => {
      await feathers.service('nicksPets').remove(pet._id);
    };

    console.log('ende: ', nicksPets.value);
    return { nicksPets, form, createNewPet, deletePet };
  },
});
</script>
