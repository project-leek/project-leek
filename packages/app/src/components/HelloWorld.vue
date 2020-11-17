<template>
  <div>
    Hello Rudolfo
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import feathers from '@/lib/feathers';

export default ({ 
  name: 'HelloWorld',
  setup() {
    const count = ref(0);
    const users = ref([]);

    onMounted(async () => {
      users.value = await feathers.service('users').find();
    });
  },
});
</script>
