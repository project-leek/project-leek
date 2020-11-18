<template>
  <div>
    <button @click="buttonClick">count is: {{ count }}</button>
    <PetList v-bind:petList="rudolfoList"/>
    <h1>{{ msg }}</h1>
    <pre>
      {{ users }}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import feathers from '@/lib/feathers';
import PetList from './PetList.vue';
import { Rudolfo } from '../../../backend/node_modules/@project-leek/commons/dist';
let rudolfoList: Array<Rudolfo> = [];

function buttonClick() {
  count++;
  rudolfoList = [];
  for (let index = 0; index < count; index++) {
    rudolfoList.push(new Rudolfo());
  }
}

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
    return {
      count,
      users,
    };
  },
});
</script>