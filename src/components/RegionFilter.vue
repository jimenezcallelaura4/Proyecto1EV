<template>
    <div class="mb-4">
        <select v-model="selectedRegion" @change="filterByRegion" class="form-control">
            <option value="">Select Region</option>
            <option value="Africa">Africa</option>
            <option value="Amercias">Amercias</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
    </div>
</template>

<script setup> 
import { ref } from 'vue';

const selectedRegion = ref('');

const emit = defineEmits(['filter-region']);


const filterByRegion = () => {
    emit('filter-region', selectedRegion.value);
};
</script>