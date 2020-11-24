<template>
  <div>
    HERE IS A PETLIST <br />
    <div v-for="rudolfo in rudolfos">
      {{ rudolfo.name }}
      {{ rudolfo.type }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import feathers from '@/lib/feathers';
import { Rudolfo } from '@project-leek/commons';

export default defineComponent{
    name: "PetList",

  setup() {

    const rudolfos = ref<Rudolfo[]>([]);
    onMounted(async () => {
      rudolfos.value = await feathers.service('rudolfo').find();
    });


    return {
      count,
      users,
      buttonClick,
      rudolfos,
    };
  },
};
</script>