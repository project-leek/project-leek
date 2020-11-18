<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
    <p>
      Edit <code>components/HelloWorld.vue</code> to test hot module
      replacement.
    </p>
    <pre>
      {{ users }}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import feathers from '@/lib/feathers';
import { User } from '@project-leek/commons';

export default defineComponent({
  name: 'HelloWorld',

  props: {
    msg: {
      type: String,
      default: 'Hexe',
    },
  },

  setup() {
    const count = ref(0);
    const users = ref<User[]>([]);

    onMounted(async () => {
      // users.value = await feathers.service('users').find();
    });

    return {
      count,
      users,
    };
  },
});
</script>
