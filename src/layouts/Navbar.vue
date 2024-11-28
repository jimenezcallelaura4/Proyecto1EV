<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Country App</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
            </ul>
        <!-- Buscador -->
        <form class="d-flex me-3" role="search" @submit.prevent="handleSearch">
            <input
                class="form-control me-2"
                type="text"
                placeholder="Search country"
                aria-label="Search"
                v-model="searchTerm"
            />
            <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <!-- Selector de región -->
            <RegionFilter @region-change="updateRegion" />
            </div>
        </div>
    </nav>
</template>


<script setup>
import RegionFilter from '@/components/RegionFilter.vue';
import { ref } from "vue";

const searchTerm = ref ("");
const handleSearch = () => {
    console.log("Searching fot: ", searchTerm.value);
;}

const updateRegion = (region) => {
    console.log("Selected region:", region);
};
</script>

<style scoped>
.navbar {
margin-bottom: 20px;
}
</style>
