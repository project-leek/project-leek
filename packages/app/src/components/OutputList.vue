<template>
  <div
    class="w-full h-full object-cover card bg-white shadow-2xl max-w-2xl overflow-auto p-2"
  >
    <entry v-for="pet in pets" :key="pet.name" :pet="pet" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Pet } from '@project-leek/commons';
import { Paginated } from '@feathersjs/feathers';
import feathers from '../lib/feathers';
import entry from './Entry.vue';

export default defineComponent({
  name: 'OutputList',
  components: {
    entry,
  },
  setup() {
    const pets = ref<Pet[]>([]);

    onMounted(async () => {
      const response = (await feathers.service('pets').find()) as Paginated<
        Pet
      >;
      pets.value = response.data;
    });

    feathers.service('pets').on('created', (newPet) => {
      pets.value.push(newPet);
    });

    return {
      pets,
    };
  },
});
</script>
