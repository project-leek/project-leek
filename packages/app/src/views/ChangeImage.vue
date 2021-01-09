<template>
  <div id="wrapper"
class="mx-auto max-w-lg h-full w-full flex flex-col">
    <header class="h-1/5 flex items-end justify-center text-4xl text-gray-800">
      <div>{{ mTagName }}</div>
      <div>Registrierte Tag-ID #{{ mTagID }}</div>
    </header>
    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-yellow-300 flex items-center justify-center text-4xl text-gray-800"
    >
      <div>
        <div>
          <div>Bild von Spotify</div>
          <div @click="useSpotify">INSERT SPOTIFY IMAGE</div>
        </div>

        <div>
          <div>Mit eigenem Bild ersetzen</div>
          <div @click="useExplorer">+</div>
        </div>
      </div>
    </main>
    <footer class="flex-grow flex items-center justify-center text-4xl text-gray-800" />
    <Button icon="fas fa-caret-left"
round />
    <Button round
:text="Speichern" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Button from '../components/uiBlocks/Button.vue';
import Textfield from '../components/uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Button,
    Textfield,
  },
  props: {
    tagName: {
      type: String,
      required: false, //change to true
      default: 'Geschichten aus der Geschichte',
    },
    tagID: {
      type: Number,
      required: false, //change to true
      default: 243762,
    },
  },
  setup(props) {
    const mTagName = ref(props.tagName);
    const mTagID = ref(props.tagID);

    const useExplorer = () => {
      return; //todo implement opening explorer
    };

    const useSpotify = () => {
      return; //todo implement showing green border around spotify image
    };

    return { mTagName, mTagID, useSpotify, useExplorer };
  },
});
</script>
