
<template>
  <div class="w-full h-full bg-red-500">
    <div class="w-72 h-96">
      <add-tag-step-info />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AddTagStepInfo from '../components/add-tag/AddTagStepInfo.vue';
export default defineComponent({
  name: 'SandBox',
  components: {
    AddTagStepInfo
  },
  setup() {
    return {
    };
  },
});
</script>
