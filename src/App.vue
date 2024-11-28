<template>
  <div>
    <Navbar /> 
    <router-view /> <
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
