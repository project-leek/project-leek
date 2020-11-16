<template>
    <div>
        <div v-for="pet in nicksPets" v-bind:key="pet._id">
            <h3>{{pet._name}}</h3>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'NicksPetList',
        props: ["nicksPets"]
    });
</script>


<style scoped>

</style>