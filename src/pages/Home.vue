
<template>
    <div class="container my-4">

        <div class="row filter-section">
            <div class="col-md-6">
                <label for="regionFilter" class="form-label"> Filtrar por Región</label>
                <select id="regionFilter"
                        class="form-select"
                        v-model="regionFilter"
                        @change="filterCoutries">
                        <option value="">Todas las regiones</option>
                        <option v-for="region in regions"
                                :key="region"
                                :value="region">
                                {{ region }}
                        </option>
                </select>
            </div>
            <div class="row country-list">
                <div class="col-md-6">
                    <label for="countrySearch" class="form-label">Buscar país</label>
                    <input id="countrySearch"
                    type="text"
                    class="form-control"
                    placeholder="Escribe un país"
                    v-model="searchQuery"
                    @input="filterCountries"/>
                </div>
            </div>
        </div>

        <!-- list paises-->
        <div class="row mt-4">
            <CountryCard
                v-for="(country, index) in paginatedCountries"
                :key="country.name.common"
                :country="country"/>
        </div>

        <!--paginacion-->
        <div class="text-center mt-4">
            <button 
                class="btn btn-primary"
                v-if="paginatedCountries.length < filteredCountries.length"
                @click="CargarMas"
                >Carga Más 
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CountryCard from "@/components/CountryCard.vue"

//variables reactivas
const countries = ref ([]);
const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"];
const regionFilter = ref ("");
const searchQuery = ref ("");
const itemsPerPage = ref(6);

//filtro y busq
const filteredCountries = computed(() =>
    countries.value.filter((country) => {
        const matchesRegion = 
        !regionFilter.value || country.region === regionFilter.value;
        const matchesSearch =
        !searchQuery.value || country.name.common.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesRegion && matchesSearch;
    })
);

//paginacion
const paginatedCountries = computed (() =>
    filteredCountries.value.slice(0, itemsPerPage.value)
);

//cargar mas
const CargarMas = () => {
    itemsPerPage.value += 6 ; //se suman de 10 en 10 
}

//datos api
const fetchCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    countries.value = await response.json();
};

fetchCountries();

// Función de filtro (opcional si prefieres no usar computed directamente)
const filterCountries = () => {};

</script>

<style scoped>
@import "../assets/styles.scss"
</style>