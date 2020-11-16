<template>
    <div>
        <div v-for="pet in nicksPets" v-bind:key="pet._id">
            <h3>{{pet._name}}</h3>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';
    import { feathers } from '@/lib';

    export default defineComponent({
        name: 'NicksPetList',
        props: ["nicksPets"],

        setup(){
            const nicksPets = ref([]);

            onMounted(async() => {
                nicksPets.value = await feathers.service('nicksPet').find();
            });

        },
    });
</script>


<style scoped>

</style>