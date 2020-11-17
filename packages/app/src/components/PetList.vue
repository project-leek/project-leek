<template>
  <div> HERE IS A PETLIST <br/>
  <div v-for="pet in petlist">
    {{pet.name}}
  </div>

  </div>
</template>

<script>
export default {
    name: "PetList",
    props:["petList"],
};
</script>