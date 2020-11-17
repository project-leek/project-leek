<template>
    <div>
        <h3>gehimbh.de</h3>
        <div v-for="pet in nicksPets" v-bind:key="pet._id">
            <h3>{{pet._name}}</h3>
        </div>
        <form @submit.prevent="createNewPet">
            <input type="text" v-model="form.petName" placeholder="name of the pet"/>
            <input type="submit" value="Senden"/> 
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, reactive, ref } from 'vue';
    import feathers from '@/lib/feathers';

    export default defineComponent({
        name: 'NicksPetList',

        setup(){
            const nicksPets = ref([]);
            const form = reactive({petName: ""});
            
            onMounted(async() => {
                nicksPets.value = await feathers.service('nicksPet').find();
            });

            const createNewPet = () => {
                let newPet = {_name: form.petName};
                feathers.service('nicksPet').create(newPet);
            };

            return {nicksPets, form, createNewPet};
        },
    });
</script>


<style scoped>

</style>