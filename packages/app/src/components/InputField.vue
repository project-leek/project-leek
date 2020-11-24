<template>
  <div class="bg-100 w-full h-full object-cover card shadow-2xl flex max-w-2xl p-2">
    <div class="container mx-auto mt-8">
      <div class="mx-auto flex flex-wrap max-width-form text-gray-800">
        <!-- Header	-->
        <div class="flex-100">
          <h1 class="font-bold text-3xl flex-100 mb-8">Gimme a new Pet</h1>
        </div>
        <!--form-->
        <div class="flex flex-100 mt-8">
          <form class="flex-100" @submit.prevent="createPet">
            <!--inputs-->
            <div class="flex flex-100">
              <div class="flex-grow mr-2">
                <label class="block mb-1 font-bold uppercase" for=""
                  >Name</label
                >
                <input
                  v-model="form.name"
                  class="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                  type="text"
                />
              </div>
              <div class="flex-grow ml-2">
                <label class="block mb-1 font-bold uppercase" for=""
                  >Breed</label
                >
                <input
                  v-model="form.breed"
                  class="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                  type="text"
                />
              </div>
            </div>
            <div class="flex flex-100 mt-4">
              <div class="flex-grow mr-2">
                <label class="block mb-1 font-bold uppercase" for=""
                  >Date of Birth</label
                >
                <input
                  v-model="form.dateOfBirth"
                  class="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                  type="date"
                />
              </div>
            </div>

            <div class="flex flex-100 mt-4">
              <input
                type="submit"
                value="Save"
                class="bg-pink-500 flex-50 text-white mx-auto py-4 rounded"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';
import { Pet } from '@project-leek/commons';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'InputField',
  setup() {
    const form = reactive({
      name: '',
      breed: '',
      dateOfBirth: new Date(),
    });

    const pets = ref<Pet[]>([]);

    onMounted(async () => {
      const response = await feathers.service('pets').find();
      pets.value = response.data;
    });

    const createPet = async () => {
      // Warum geht der Konstruktor nicht?
      // const petti = new Pet(form.name, form.breed, form.dateOfBirth);
      const petti: Pet = {
        name: form.name,
        breed: form.breed,
        dateOfBirth: form.dateOfBirth,
      };

      await feathers.service('pets').create(petti);
      form.name = '';
      form.breed = '';
      form.dateOfBirth = '';
    };

    return {
      createPet,
      form,
    };
  },
});
</script>

<style scoped>
input::placeholder {
  color: #718096;
  font-weight: 300;
}

.flex-100 {
  flex: 0 1 100%;
}

.flex-50 {
  flex: 0 1 50%;
}

.max-width-form {
  max-width: 450px;
}

.checkbox {
  transform: scale(1.2);
}

.bg-blue-google {
  background-color: #4285f4;
}

.bg-pink-dribbble {
  background-color: #ea4c89;
}

.button-icon {
  position: absolute;
  left: 23px;
}
</style>
