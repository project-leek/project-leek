<template>
  <div />
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'OAuthCallback',

  setup() {
    const router = useRouter();

    onMounted(() => {
      void router.push({ name: 'home' });
    });
  },
});
</script>
