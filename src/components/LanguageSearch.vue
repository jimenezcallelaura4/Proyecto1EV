<template>
    <div class="language-search">
        <h2>Buscar Países por Idioma</h2>
        <form @submit.prevent="fetchCountriesByLanguage">
            <div class="mb-3">
                <label for="language" class="form-label">Selecciona un idioma</label>
                <input type="text"
                        id="language"
                        v-model="language"
                        class="form-control"
                        placeholder="Ej: spanish, english..."/>
            </div>
            <button type="submit" class="btn btn-primary">Buscar</button>
        </form>

        <div v-if="countries.length" class="mt-4">
            <h3>Resultados:</h3>
            <Splide
            :options="{
                type: 'loop',
                perPage: 3,
                gap: '20px',
                breakpoints: {
                    1024: { perPage: 3, gap: '1rem' },
                    768: { perPage: 2, gap: '0.75rem' },
                    576: { perPage: 1, gap: '0.5rem' },
                }
            }"  
        >
        <SplideSlide v-for="(country, index) in countries" :key="index">
            <div class="card">
                <img :src="country.flags.svg" alt="Bandera" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">{{ country.name.common }}</h5>
                    <p class="card-text">Región: {{ country.region }}</p>
                    <router-link :to="`/country/${country.cca3}`" class="btn btn-primary">Ver Detalles</router-link>
                </div>
            </div>
        </SplideSlide>
    </Splide>
    </div>
    <p v-else-if="searched && !countries.length" class="mt-4">No se encontraron países para el idioma seleccionado</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/splide.min.css';


const language = ref("");
const countries = ref([]);
const searched = ref(false);

const fetchCountriesByLanguage = async () => {
    searched.value = true;
    countries.value = [];

    try {
        const response = await fetch(`https://restcountries.com/v3.1/lang/${language.value}`);
        if (!response.ok) throw new Error("Error al buscar países");
        countries.value = await response.json();
    } catch (error) {
    console.error("Error al buscar países:", error);
    }
}
</script>

<style scoped>
@import "../assets/styles.scss";
</style>
