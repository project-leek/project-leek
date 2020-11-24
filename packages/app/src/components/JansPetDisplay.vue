<template>
  <div class="bg-green-200 w-full m-2 p-2 rounded-md">
    <h2>Jans Pet Display</h2>
    <form
      class="px-2 p-1 my-3 rounded-md border border-green-400"
      @submit.prevent="createJansPet"
    >
      <p>New Pet for Jan :3</p>
      <div class="p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
        <label for="NewJansPetName">Name</label>
        <input
          id="NewJansPetName"
          v-model="NewPetName"
          class="mx-2 rounded-md px-2"
        />
        <label for="NewJansPetDescription">Description</label>
        <input
          id="NewJansPetDescription"
          v-model="NewPetDescription"
          class="mx-2 rounded-md px-2"
        />
      </div>
      <button type="submit" class="bg-white rounded-md px-2 m-2">YEH!</button>
    </form>
    <div class="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
      <jans-single-pet v-for="pet in jansPetList" :key="pet._id" :pet="pet" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { JansPet } from '@project-leek/commons';

import feathers from '../lib/feathers';
import JansSinglePet from './JansSinglePet.vue';

export default defineComponent({
  name: 'JansPetDisplay',

  components: { JansSinglePet },

  setup() {
    const jansPetList = ref<JansPet[]>([]);

    onMounted(async () => {
      jansPetList.value = await feathers.service('jans-pets').find();
    });

    feathers.service('jans-pets').on('created', (jansNewPet) => {
      jansPetList.value.push(jansNewPet);
    });
    feathers.service('jans-pets').on('removed', (jansDeletedPet) => {
      jansPetList.value = jansPetList.value.filter(
        (value) => value._id !== jansDeletedPet._id
      );
    });

    return {
      jansPetList,
    };
  },

  data() {
    return {
      NewPetName: '',
      NewPetDescription: '',
    };
  },

  methods: {
    async createJansPet() {
      await feathers.service('jans-pets').create({
        name: this.NewPetName,
        description: this.NewPetDescription,
      });
    },
  },
});
</script>

<style></style>
