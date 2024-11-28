
<template>
    <div class="container mt-4">
        <h1>Countries</h1>
        
        <!-- fILTRO REGION-->
        <RegionFilter @filter-region="updateSelectedRegion" />


        <!-- Buscador local-->
        <div class="mb-4">
            <input
            type="text"
            v-model="searchQuery"
            class="form-control"
            placeholder="Search a country"
            />
        </div>

        <!-- Listta paises-->
        <div class="row">
            <CountryCard v-for="country in filteredCountried" 
            :key="country.cca3" 
            :country="country"/> 
        </div>
        <button v-if="!allCountriesLoaded" 
        class="btn btn-primary mt-3" 
        @click="loadMore">Cargar Más</button>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import CountryCard from '../components/CountryCard.vue';
import RegionFilter from '../components/RegionFilter.vue';

// Variables reactivas
const countries = ref ([]);
const page = ref(1);
const perPage = 20;
const searchQuery = ref('');
const selectedRegion = ref ('');

//Obtener paises
const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json ();
        countries.value = data;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
};

//actualizar region que se elige en el filtro
const updateSelectedRegion = (region) => {
    console.log('Region received in Home:', region);
    selectedRegion.value = region;
};

//paginacion
const paginatedCountires = computed(() =>
    countries.value.slice(0, page.value * perPage)
);

//filto paises nombre + region
const filteredCountried = computed(() => {
    let filtered = paginatedCountires.value;

    if (searchQuery.value) {
        filtered = filtered.filter(country =>
            country.name.common.toLowerCase().includes(searchQuery.value.toLowerCase()) 
        );
    }
    if (selectedRegion.value) {
        filtered = filtered.filter(country =>
            country.region.toLowerCase() === selectedRegion.value.toLowerCase()
        );
    }
    return filtered; //pag
});

// mas paises
const loadMore = () => {
    page.value++;
}

//verifica que ya se cargaron los paises
const allCountriesLoaded = computed(() =>   
    countries.value.length <= page.value * perPage
);

onMounted(fetchCountries);
</script>