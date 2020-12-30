<template>
  <div class="m-auto">
    <pre>{{ user }}</pre>
    <p>Suchefeld</p>
    <Textfield v-model="text" class="mb-4" icon="search" placeholder="Titelsuche" />
    <p>Textfield</p>
    <Textfield v-model="text" class="mb-4" label="Title" placeholder="Titelsuche" />
    <dropdown
      v-model="dropDownTestText"
      :selectable-item-values="dropDownTestData"
      :placeholder-text="'Nothing to see here'"
      :add-item-option="true"
      :add-item-text="'add item (redirects to login because we don\'t have any detail page yet. but the button works :D)'"
      :add-item-redirect-to="'/login'"
    />
    <dropdown :selectable-item-values="dropDownTestData" />
    Dropdown Output {{ dropDownTestText }}
    <div
      class="cursor-pointer bg-green-600 rounded-full text-center p-2 text-white"
      @click="logout"
    >
      Logout
    </div>
    <div>Parent output: {{ text }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { user, logout } from '../compositions/useAuthentication';
import Textfield from '../components/uiBlocks/Textfield.vue';
import Dropdown from '../components/uiBlocks/Dropdown.vue';

export default defineComponent({
  name: 'Home',
  components: { Textfield, Dropdown },
  setup() {
    const text = ref('');
    const dropDownTestText = ref('foo');
    return {
      user,
      logout,
      text,
      dropDownTestText,
      dropDownTestData: ['a', 'b', 'c', 'd'],
    };
  },
});
</script>
