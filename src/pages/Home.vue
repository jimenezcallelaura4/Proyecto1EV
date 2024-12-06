<template>
    <div class="container my-4">
    

        <!-- Región -->
        <div class="row filter-section">
            <div class="col-md-6">
                <label for="region-select" class="form-label">Filtrar por Región</label>
                <select id="region-select"
                        class="form-select"
                        v-model="selectedRegion"
                        @change="fetchCountriesByRegion">
                    <option value="">Todas las regiones</option>
                    <option v-for="region in regions" :key="region" :value="region">
                        {{ region }}
                    </option>
                </select>
            </div>

            <!-- Buscar país -->
            <div class="col-md-6">
                <label for="countrySearch" class="form-label">Buscar país</label>
                <input id="countrySearch"
                        type="text"
                        class="form-control"
                        placeholder="Escribe un país"
                        v-model="searchQuery" />
            </div>

            <!-- Explorador -->
            <div class="col-md-6 text-center">
                <h5>Explorador de Países</h5>
                <div class="button-group">
                    <router-link to="/search-language" class="btn btn-primary mt-4">Buscar por Idioma</router-link>
                    <router-link to="/search-currency" class="btn btn-success mt-4">Buscar por Moneda</router-link>
                    <router-link to="/search-capital" class="btn btn-success mt-4">Buscar por Capital</router-link>
                    <router-link to="/search-subregion" class="btn btn-success mt-4">Buscar por Subregión</router-link>
                </div>
            </div>
            
        </div>

        <!-- Lista de países con Slide-->
        <div class="row mt-4">
            <CountryCard
                v-for="(country, index) in paginatedCountries"
                :key="country.name.common"
                :country="country" />
        </div>

        <!-- Paginación -->
        <div class="text-center mt-4">
            <button 
                class="btn btn-primary"
                v-if="paginatedCountries.length < filteredCountries.length"
                @click="CargarMas"
            >
                Cargar Más
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CountryCard from "@/components/CountryCard.vue";

const countries = ref([]);
const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"];
const selectedRegion = ref("");
const searchQuery = ref("");
const itemsPerPage = ref(6);

//datos api
const fetchCountries = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Error al cargar los países");

        countries.value = await response.json();
        console.log("Países cargados:", countries.value.length);
    } catch (error) {
        console.error("Error al cargar los países:", error);
    }
};

//region
const fetchCountriesByRegion = async () => {
    try {
        if (!selectedRegion.value) {
            fetchCountries();
            return;
        }

        const response = await fetch(`https://restcountries.com/v3.1/region/${selectedRegion.value}`);
        if (!response.ok) throw new Error("Error al cargar los países");

        countries.value = await response.json();
    } catch (error) {
        console.error("Error al obtener países por región:", error);
    }
};

//busq
const filteredCountries = computed(() => {
    return countries.value.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

//paginacion
const paginatedCountries = computed(() => {
    return filteredCountries.value.slice(0, itemsPerPage.value);
});
//cargar mas
const CargarMas = () => {
    itemsPerPage.value += 6;
};

fetchCountries();
</script>

<style scoped>
@import "../assets/styles.scss";
</style>
