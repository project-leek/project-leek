<template>
  <div class="p-2 w-64 flex bg-blue-600 rounded-xl m-2 mx-auto">
    <div class="mx-auto">
      {{ pet.name }}
    </div>
    <div>
      <button
        class="bg-red-500 rounded-full w-6 h-6 hover:bg-red-600 items-end"
        @click="delPet"
      >
        X
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NicksPetItem',
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  emits: ['delete-pet'],

  setup(props, ctx) {
    function delPet() {
      ctx.emit('delete-pet', props.pet);
    }

    return {
      delPet,
    };
  },
});
</script>
