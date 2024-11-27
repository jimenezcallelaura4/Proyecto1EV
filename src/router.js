import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/Home.vue';
import CountryDetails from './pages/CountryDetails.vue';


const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/country/:code', name: 'CountryDetails', component:  CountryDetails},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;