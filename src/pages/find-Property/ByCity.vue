<script setup>
    import {
        removeScript,
        useGoogleMapAPI,
    } from '@/composables/google-maps-api';
    import Input from '@/components/Common/Input/Input.vue';
    import SearchIcon from '@/components/Icon/Search.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Layout from './components/searchLayout.vue';
    import { useStore } from 'vuex';
    import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
    import LoadingBtn from '@/components/Icon/LoadingButton.vue';

    const title = computed(() => [
        {
            label: 'Recherche',
            url: '/recherche-bien',
        },
        { label: "A partir d'une ville" },
    ]);
    const input = ref({
        id: 'city',
        label: 'Rechercher',
    });
    const data = reactive({
        result: '',
    });

    const $store = useStore();

    onMounted(() => {
        let auto;
        const input_id = document.getElementById(input.value.id);
        const options = {
            fields: ['address_components', 'geometry', 'formatted_address'],
        };
        if (window.google) {
            auto = new window.google.maps.places.Autocomplete(
                input_id,
                options
            );
            auto.addListener('place_changed', (e) => {
                const res = auto.getPlace();
                data.result = res;
                const parsed_address = parseAddressComponent(
                    data.result.address_components
                );
                logics(parsed_address);
                console.log('[DBG] result : ', parsed_address);
            });
        } else {
            const result = useGoogleMapAPI();
            result.then((google) => {
                auto = new google.maps.places.Autocomplete(input_id, options);
                auto.addListener('place_changed', (e) => {
                    const res = auto.getPlace();
                    data.result = res;
                    const parsed_address = parseAddressComponent(
                        data.result.address_components
                    );
                    logics(parsed_address);
                    console.log('[DBG] result : ', parsed_address);
                });
            });
        }
    });

    const logics = (payload) => {
        const res = $store.dispatch(
            'FindPropertyModule/findPropertiesByCity',
            payload
        );
        console.log(res);
    };

    const parseAddressComponent = (adressComponent) => {
        const result = {
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
                result.postalCode = elt.long_name;
            }
        });

        return result;
    };
</script>

<template>
    <Layout :breadcrumbListsData="title">
        <!-- <template #header>
        <div class="container-title">
            <BreadCrumb :items="title" />
        </div>
        <hr class="my-3">
        </template>  -->
        <template #search>
            <input :id="input.id" :placeholder="input.label" />
        </template>
    </Layout>
</template>
<style lang="scss" scoped></style>
