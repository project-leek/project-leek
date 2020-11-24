<template>
  <div
    class="rounded-md bg-white p-1 px-2 h-full flex flex-col justify-content-start"
  >
    <div class="flex-none">
      <strong>Name: </strong>
      {{ pet.name }}
    </div>
    <div class="flex-none">
      <strong>Description: </strong>
      {{ pet.description }}
    </div>
    <div class="flex-auto"></div>
    <div class="flex self-end">
      <button
        class="bg-white border border-gray-300 rounded-md px-2 my-1"
        @click="deleteThisPet"
      >
        Remove
      </button>
    </div>
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
