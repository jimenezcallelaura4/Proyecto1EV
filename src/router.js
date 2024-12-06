import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/Home.vue';
import CountryDetails from './pages/CountryDetails.vue';
import LanguagePage from "./pages/LanguagePage.vue";
import CountriesByCurrencyPage from "./pages/CountriesByCurrencyPage.vue";
import CountriesByCapitalPage from "./pages/CountriesByCapitalPage.vue";
import CountriesBySubregionPage from "./pages/CountriesBySubregionPage.vue";

const routes = [
    { 
        path: '/', 
        name: 'Home', 
        component: Home
    },
    { 
        path: '/country/:code', 
        name: 'CountryDetails', 
        component: CountryDetails
    },
    {
        path: '/search-language',
        name: 'LanguagePage',
        component: LanguagePage
    },
    {
        path: '/search-currency',
        name: 'CountriesByCurrency',
        component: CountriesByCurrencyPage
    },
    {
        path: '/search-capital',
        name: 'CountriesByCapital',
        component: CountriesByCapitalPage
    },
    {
        path: '/search-subregion',
        name: 'CountriesBySubregion',
        component: CountriesBySubregionPage
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;