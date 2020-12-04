<template>
  <div class="app flex">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';

const client = feathers();
const socket = io('http://localhost:3000');

client.configure(socketio(socket));
client.configure(auth({}));

export default defineComponent({
  name: 'App',
  setup() {
    const login = async () => {
      try {
        return await client.reAuthenticate();
      } catch (error) {
        console.log('authenticate needed');
        return null;
      }
    };

    onBeforeMount(() => {
      console.log('jedes mal befor ich die seite aufbaue');
      login();
    });
    return login;
  },
});
</script>

<style lang="css">
.app {
  height: 100vh;
}
</style>
