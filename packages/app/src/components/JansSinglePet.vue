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
import { JansPet } from '@project-leek/commons';

export default defineComponent({
  name: 'JansPet',

  props: {
    // eslint-disable-next-line vue/require-default-prop
    pet: JansPet,
  },

  methods: {
    deleteThisPet() {
      feathers.service('JansPets').remove(this.pet._id);
    },
  },
});
</script>
