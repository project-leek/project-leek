<template>
  <div class="bg-100 w-full h-full object-cover card shadow-2xl flex">
    <div class="container mx-auto mt-8">
      <form @submit.prevent="">
        <div class="mx-auto flex flex-wrap max-width-form text-gray-800">
          <!-- Header	-->
          <div class="flex-100">
            <h1 class="font-bold text-3xl flex-100 mb-8">Gimme a new Pet</h1>
          </div>
          <!--form-->
          <div class="flex flex-100 mt-8">
            <form class="flex-100">
              <!--inputs-->
              <div class="flex flex-100">
                <div class="flex-grow mr-2">
                  <label class="block mb-1 font-bold uppercase" for=""
                    >Name</label
                  >
                  <input
                    class="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                    type="text"
                  />
                </div>
                <div class="flex-grow ml-2">
                  <label class="block mb-1 font-bold uppercase" for=""
                    >Breed</label
                  >
                  <input
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
                    class="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                    type="date"
                  />
                </div>
              </div>

              <div class="flex flex-100 mt-4">
                <button
                  class="bg-pink-dribbble flex-50 text-white relative py-4 rounded"
                >
                  <div>Save</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Pet } from '@project-leek/commons';
import feathers from '@/lib/feathers';

export default defineComponent({
  name: 'InputField',
  setup() {
    const form = reactive({
      name: '',
      breed: '',
      dateOfBirth: new Date(),
    });
    const createPet = async () => {
      const petti = new Pet(...form);
      await feathers.service
    };
  },
});
</script>

<style lang="scss" scoped>
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
