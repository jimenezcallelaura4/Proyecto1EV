<template>
    <div class="container mt-4">
        <router-link to="/" class="btn btn-secondary mb-3">Back to Home</router-link>
        <h1>{{ country?.name?.common }}</h1>
        <img :src="country?.flags?.png" :alt="country?.name?.common"/>
        <p><strong>Region:</strong> {{ country?.region }}</p>
        <p><strong>Population:</strong> {{ country?.population }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const country = ref(null);

onMounted(async () => {
    const response = await fetch ('https://restcountries.com/v3.1/alpha/${route.params.code}')
    country.value = await response.json();
});
</script>