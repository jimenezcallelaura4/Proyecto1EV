<template>
    <div class="country-details">
        <div class="card">
            <img :src="country?.flags?.png" class="card-img-top" :alt="country?.name?.common">
            <div class="card-body">
            <h5 class="card-title">{{ country?.name?.common }}</h5>
            <p><strong>Region:</strong> {{ country?.region }}</p>
            <p><strong>Population:</strong> {{ country?.population }}</p>
            <router-link to="/" class="btn btn-primary">Atrás</router-link>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const country = ref(null);

onMounted(async () => {
    const countryCode = route.params.code; // Obtén el código del parámetro de la URL

    if (!countryCode) {
        console.error('No se recibió un código de país válido');
        return;
    }

    try {
        // Llama a la API con el código de país
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        
        // Verifica si la respuesta es correcta
        if (!response.ok) {
            throw new Error(`Error al cargar el país: ${response.statusText}`);
        }

        // Parsear la respuesta
        const data = await response.json();
        
        // Valida que los datos sean correctos
        if (Array.isArray(data) && data.length > 0) {
            country.value = data[0];
        } else {
            console.error('No se encontraron datos para este código:', countryCode);
        }
    } catch (error) {
        console.error('Error al cargar el país:', error);
    }
});
</script>


<style scoped>
@import "../assets/styles.scss"
</style>
