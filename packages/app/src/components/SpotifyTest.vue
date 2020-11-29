<template>
  <div
    class="mx-auto w-max self-center text-gay-50 text-2xl bg-green-100 rounded-3xl"
  >
    <router-link to="/oauth/spotify" class="mx-4 my-2"
      >Test Api-Call</router-link
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ApiTest',
});
</script>

<style></style>
