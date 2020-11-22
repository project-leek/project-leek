<template>
  <div class="w-full h-full object-cover card bg-white shadow-2xl max-w-2xl">
    <entry v-for="pet in pets" :key="pet.name" :pet="pet"></entry>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import entry from './Entry.vue';

export default defineComponent({
  name: 'OutputList',
  components: {
    entry,
  },
  data: () => ({
    pets: [
      {
        name: 'Doggo',
        breed: 'Bloodhound',
        // important! year and month are zero indexed!
        dateOfBirth: new Date(2002, 11, 24),
      },
      {
        name: 'Hasso',
        breed: 'Mops',
        dateOfBirth: new Date(2012, 3, 9),
      },
      {
        name: 'Good Boy',
        breed: 'Border Collee',
        dateOfBirth: new Date(25, 7, 2020),
      },
    ],
  }),
});
</script>
