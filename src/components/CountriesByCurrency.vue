<template>
    <div class="currency-search">
        <h2>Buscar paises por moneda</h2>
        <form @submit.prevent="fetchCountriesByCurrency">
            <div class="mb-3">
                <label for="currency" class="form-label">Selecciona una moneda</label>
                <input type="text"
                        id="currency"
                        v-model="currency"
                        class="form-control"
                        placeholder="Ej: euro, usd..."/>
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

        <p v-else-if="searched && !countries.length" class="mt-4">No se encontraron países con la moneda seleccionada</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import CountryCard from "./CountryCard.vue";

const currency = ref("");
const countries = ref([]);
const searched = ref(false);


const fetchCountriesByCurrency = async () => {
    searched.value = true;
    countries.value = [];

    try {
        const response = await fetch(`https://restcountries.com/v3.1/currency/${currency.value}`);
        if (!response.ok) throw new Error("Error al buscar países");
        countries.value = await response.json();
    } catch (error) {
        console.error("Error al buscar países:", error);
    }
};
</script>

<style scoped>
@import "../assets/styles.scss";
</style>