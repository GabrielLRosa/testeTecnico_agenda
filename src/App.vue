<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  <div class="app__container">
    <Header />
    <RegisterList />
    <EmptyList />
    <Modal />
    <section class="content-c">
      
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import HelloWorld from './components/HelloWorld.vue';
import Header from './components/Header.vue';
import EmptyList from './components/EmptyList.vue';
import Modal from './components/Modal.vue'
import RegisterList from './components/RegisterList.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    EmptyList,
    Modal,
    RegisterList
  }
});
</script>

<style>
#app {
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f8f9fd;

  padding: relative;
}

.app__container {
  max-width: 1500px;
  width: 100%;

  height: 100%;
}
</style>
