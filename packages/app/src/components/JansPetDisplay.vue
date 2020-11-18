<template>
  <div>
    <h2>Jans Pet Display</h2>
    <form @submit.prevent="createJansPet">
      New Pet for Jan :3
      <label for="NewJansPetName">Name</label>
      <input id="NewJansPetName" v-model="NewPetName" />
      <label for="NewJansPetDescription">Description</label>
      <input id="NewJansPetDescription" v-model="NewPetDescription" />
      <button type="submit">YEH!</button>
    </form>

    <jans-single-pet v-for="pet in JansPetList" :key="pet.id" :pet="pet" />
    {{ JansPetList }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import JansSinglePet from '@/components/JansSinglePet.vue';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'JansPetDisplay',

  components: { JansSinglePet },

  setup() {
    const JansPetList = ref([]);

    onMounted(async () => {
      JansPetList.value = await feathers.service('JansPets').find();
    });

    feathers.service('JansPet').on('created', (jansNewPet) => {
      JansPetList.value.push(jansNewPet);
    });
    feathers.service('JansPet').on('deleted', (jansDeletedPet) => {
      JansPetList.value.pop(jansDeletedPet);
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
