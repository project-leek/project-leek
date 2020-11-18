<template>
  <div>
    <button @click="buttonClick">count is: {{ count }}</button>
    <PetList :pet-list="rudolfoList" />
    <h1>{{ msg }}</h1>
    <pre>
      {{ users }}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import feathers from '@/lib/feathers';
import { Rudolfo } from '@project-leek/commons';
import PetList from './PetList.vue';

export default defineComponent({
  name: 'HelloWorld',
  components: { PetList },
  props: {
    msg: {
      type: String,
      default: 'Rudolfo',
    },
  },
  setup() {
    const count = ref(0);
    const users = ref([]);

    onMounted(async () => {
      users.value = await feathers.service('users').find();
    });

    let rudolfoList: Array<Rudolfo> = [];

    function buttonClick() {
      count.value += 1;
      rudolfoList = [];
      for (let index = 0; index < count.value; index += 1) {
        rudolfoList.push(new Rudolfo());
      }
    }

    return {
      count,
      users,
      buttonClick,
    };
  },
});
</script>
