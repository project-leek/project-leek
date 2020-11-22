<template>
    <div class="w-5/6 mx-auto my-8 rounded-lg h-40 bg-gray-200">
        <div class="py-2 w-full h-full">
            <div class="px-4 flex-wrap">
                <!-- Icons -->
                <div class="w-full flex justify-end">
                    <div class="h-6 w-6 mx-1 hover:bg-red-400 rounded-2xl">
                        <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                    <div class="h-6 w-6 mx-1 hover:bg-green-400 rounded-2xl">
                        <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </div>
                </div>
                <div class=" justify-self-end text-sm text-pink-600 mb-2">
                Entertainment
                </div>
                <div class="mb-2">
                    <a href="#" class="font-semibold leading-tight text-2xl text-gray-900">
                    Bootstrap Card's Title using Tailwind
                    </a>
                </div>
                <div class='flex text-gray-900 text-sm '>
                    <div class="pr-3">May 6, 2020</div>
                    <div>Posted by Admin</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'entry',
  data() {
    return {

    };
  },
});
</script>

<style scoped>
</style>

