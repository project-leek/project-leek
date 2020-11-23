<template>
  <div>
    <p>
      <strong>Name: </strong>
      {{ pet.name }}
      <strong>Description: </strong>
      {{ pet.description }}
      <button @click="deleteThisPet">Remove</button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import feathers from '@/lib/feathers';

export default defineComponent({
  name: 'JansSinglePet',

  props: {
    pet: { type: Object, required: true },
  },

  methods: {
    deleteThisPet() {
      feathers.service('JansPets').remove(this.pet._id);
    },
  },
});
</script>
