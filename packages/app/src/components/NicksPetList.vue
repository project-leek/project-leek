<template>
  <div class="box-content bg-blue-500 m-2 p-6">
    <h2 class="text-2xl font-semibold">Nicks Pets</h2>
    <div v-for="pet in nicksPets" :key="pet._id">
      <NicksPetItem :pet="pet" @delete-pet="deletePet" />
    </div>
    <form class="mt-5" @submit.prevent="createNewPet">
      <h4 class="text-lg">Create New Pet</h4>
      <div class="flex mx-auto justify-center mt-2">
        <input
          v-model="form.petName"
          class="rounded-full p-1"
          type="text"
          placeholder="name of the pet"
        />
        <input
          class="rounded-full w-24 ml-2 bg-green-500 hover:bg-green-600"
          type="submit"
          value="Create"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import NicksPet from '@project-leek/commons';
import NicksPetItem from './NicksPetItem.vue';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'NicksPetList',
  components: {
    NicksPetItem,
  },

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
      const newPet: NicksPet = { name: form.petName };
      await feathers.service('nicksPets').create(newPet);
      form.petName = '';
    };

    const deletePet = async (pet) => {
      await feathers.service('nicksPets').remove(pet._id);
    };

    return { nicksPets, form, createNewPet, deletePet };
  },
});
</script>
