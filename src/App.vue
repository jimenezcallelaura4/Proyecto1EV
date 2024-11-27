<template>
  <div>
    <Navbar /> 
    <main class="container">
      <router-view /> <
    </main>
    <Footer /> 
  </div>
</template>

<script setup>
import Navbar from './layouts/Navbar.vue';
import Footer from './layouts/Footer.vue';
</script>

<style>

main {
  padding: 20px;
}
</style>
