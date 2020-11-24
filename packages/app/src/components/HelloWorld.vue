<template>
  <div>
    <AddPetForm />
    <br/>
    <br/>
    <PetList/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PetList from './PetList.vue';
import AddPetForm from './AddPetForm.vue';

export default defineComponent({
  name: 'HelloWorld',
  components: { PetList, AddPetForm },
});
</script>
