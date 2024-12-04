<!-- tarjeta de cada pais  -->

<template>
    <div class="col-md-4 mb-3">
        <div class="card">
            <img :src="country.flags.png" class="card-img-top" :alt="country.name.common" />
            <div class="card-body">
                <h5 class="card-title">{{ country.name.common }}</h5>
                <p class="card-text">Region: {{ country.region }}</p>
                <router-link :to="`/country/${country.cca3}`" class="btn btn-primary">Ver Detalles</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    country: {
        type: Object,
        required: true,
    },
});
</script>