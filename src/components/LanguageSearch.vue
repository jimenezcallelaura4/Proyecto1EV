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
            <div class="row">
                <CountryCard v-for="country in countries"
                                :key="country.name.common"
                                :country="country"/>
            </div>
        </div>

        <p v-else-if="searched && !countries.length" class="mt-4">No se encontraron países para el idioma seleccionado</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import CountryCard from "@/components/CountryCard.vue";

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
