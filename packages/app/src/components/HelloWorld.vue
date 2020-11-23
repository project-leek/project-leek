<template>
  <div>
    <button @click="buttonClick">count is: {{ count }}</button>
    <PetList :petlist="rudolfoList" />

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import feathers from '@/lib/feathers';
import { Rudolfo, User } from '@project-leek/commons';
import PetList from './PetList.vue';

export default defineComponent({
  name: 'HelloWorld',
  components: { PetList },

  setup() {
    const count = ref(0);
    const users = ref<User[]>([]);

    onMounted(async () => {
      // users.value = await feathers.service('users').find();
    });

    const rudolfoList = ref<Rudolfo[]>([]);

    function buttonClick() {
      count.value += 1;
      rudolfoList.value = [];
      for (let index = 0; index < count.value; index += 1) {
        const pet: Rudolfo = {
          name: "rudolfo",
          type: "behindert",
        };
        rudolfoList.value.push(pet);
      }
    }

    return {
      count,
      users,
      buttonClick,
      rudolfoList,
    };
  },
});
</script>
