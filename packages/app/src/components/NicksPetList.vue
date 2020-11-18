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
    //import { NicksPet } from '@project-leek/commons';
    import { defineComponent, onMounted, reactive, ref } from 'vue';
    import feathers from '@/lib/feathers';
    //import {v4 as uuid} from 'uuid';

    export default defineComponent({
        name: 'NicksPetList',

        setup(){
            const nicksPets = ref([]);
            const form = reactive({petName: ""});
            
            onMounted(async() => {
                nicksPets.value = await feathers.service('nicksPets').find();
            });

            const createNewPet = async () => {
                // let id = uuid();
                // let newPet = {_name = form.petName _id = 979 }; //new NicksPet(form.petName);
                // console.log(newPet);
                // const returnedPet = await feathers.service('nicksPets').create(newPet);
                // console.log(returnedPet);
            };

            return {nicksPets, form, createNewPet};
        },
    });
</script>
