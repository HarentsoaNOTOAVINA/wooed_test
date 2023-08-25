<script setup>
    import {
        removeScript,
        useGoogleMapAPI,
    } from '@/composables/google-maps-api';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import SearchIcon from '@/components/Icon/Search.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import Layout from './components/searchLayout.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { useStore } from 'vuex';
    import {
        ref,
        reactive,
        computed,
        onMounted,
        onBeforeMount,
        onUnmounted,
    } from 'vue';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const title = computed(() => [
        {
            label: 'Recherche',
            url: '/recherche-bien',
        },
        { label: "A partir d'une agence" },
    ]);

    const input = ref({
        id: 'agency',
        label: 'Rechercher',
        mode: 'tags',
        options: [],
    });
    const loading = ref < Boolean > true;
    const data = reactive({
        result: '',
    });

    const $store = useStore();

    const optionsList = computed(() => {
        const _ = [];
        const res = $store.getters['FindPropertyModule/getSocietiesList'];
        res.forEach((item) => {
            _.push({ label: item.name, value: item.id });
        });
        console.log('selct options', _);
        return _;
    });

    onBeforeMount(() => {
        $store.dispatch('FindPropertyModule/getSociety');
    });

    onMounted(() => {
        let auto;
        const input_id = document.getElementById(input.value.id);
        const options = {
            fields: ['address_components', 'geometry', 'formatted_address'],
        };

        if (optionsList.length > 0) {
            loading.value = false;
        }
    });
    onUnmounted(() => {
        removeScript();
    });
    const logics = (payload) => {
        console.log('p', payload);
        const res = $store.dispatch(
            'FindPropertyModule/findPropertiesByCity',
            payload
        );
        console.log(res);
    };
    const parseAddressComponent = (adressComponent) => {
        const result = {
            per_agency: true,
            postalCode: null,
            country: null,
            municipalityName: null,
            streetNumber: null,
            streetName: null,
        };

        adressComponent.forEach((elt) => {
            if (elt.types.includes('country')) {
                result.country = elt.long_name;
            } else if (elt.types.includes('street_number')) {
                result.streetNumber = elt.long_name;
            } else if (elt.types.includes('route')) {
                result.streetName = elt.long_name;
            } else if (elt.types.includes('locality')) {
                result.municipalityName = elt.long_name;
            } else if (elt.types.includes('postal_code')) {
                result.postalCde = elt.long_name;
            }
        });

        return result;
    };
</script>

<template>
    <Loader v-if="loading" />
    <Layout :breadcrumbListsData="title">
        <!-- <template #header>
        <div class="container-title">
            <BreadCrumb :items="title" />
        </div>
        <hr class="my-3">
        </template>  -->
        <template #search>
            <Select
                :options="optionsList"
                name="society"
                :placeholder="input.label"
                :mode="input.mode"
                @change-select="logics"
            />
        </template>
    </Layout>
</template>
<style lang="scss" scoped></style>
