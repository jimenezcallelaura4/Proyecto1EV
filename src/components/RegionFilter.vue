<template>
    <div class="mb-3">
        <label for="region-select" class="form-label">Filtrar por Región</label>
        <select
            id="region-select"
            class="form-select"
            @change="emitRegion"
            v-model="selectedRegion"
            >
            <option value="">Todas las Regiones</option>
            <option v-for="region in regions" 
                    :key="region" 
                    :value="region">{{ region }}</option>
        </select>
    </div>
</template>

<script setup> 
import { ref } from 'vue';

const regions = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
const selectedRegion = ref(''); // region seleccionada

const emit = defineEmits(['filter-region'])
const emitRegion = () => {
    console.log('Selected region:', selectedRegion.value);
    emit('filter-region', selectedRegion.value);
};

</script>