<template>
  <div class="bg-green-200 w-full m-10 p-4 rounded-md">
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
      <jans-single-pet v-for="pet in JansPetList" :key="pet._id" :pet="pet" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { JansPet } from '@project-leek/commons';
import JansSinglePet from '@/components/JansSinglePet.vue';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'JansPetDisplay',

  components: { JansSinglePet },

  setup() {
    const JansPetList = ref<JansPet[]>([]);

    onMounted(async () => {
      JansPetList.value = await feathers.service('JansPets').find();
    });

    feathers.service('JansPets').on('created', (jansNewPet) => {
      JansPetList.value.push(jansNewPet);
    });
    feathers.service('JansPets').on('removed', (jansDeletedPet) => {
      JansPetList.value = JansPetList.value.filter(
        (value) => value._id !== jansDeletedPet._id
      );
    });

    return {
      JansPetList,
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
      await feathers.service('JansPets').create({
        name: this.NewPetName,
        description: this.NewPetDescription,
      });
    },
  },
});
</script>

<style></style>
