<template>
    <loader v-if="loading" />

    <router-view
        v-else
        @change-address="handleAddressChange"
        @update-payload="updatePayload"
        @trigger-search="handleSearchProperty"
        @handle-show-map="handleShowMap"
        @search="handleMarkInterestSeach"
        @show-advanced-search="handleShowAdvancedSearch"
        @handleGoToDetail="handleGoToDetail"
    />
</template>

<script setup lang="ts">
    import useAutoComplete, {
        ExtractAdressComponents,
    } from '@/composables/useAutoComplete';
    import useGeocode from '../composable/useGeocode';

    import {
        defineComponent,
        onBeforeMount,
        ref,
        watch,
        onUnmounted,
        onMounted,
        shallowRef,
    } from 'vue';

    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { notification } from 'ant-design-vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { treeNodeProps } from 'ant-design-vue/lib/vc-tree/props';

    const router = useRouter();
    const store = useStore();
    const loading = ref<boolean>(true);
    const showAdvancedSearch = ref<boolean>(false);
    const currentFormatedAddress = ref<string>('');
    const showMap = ref<boolean>(false);
    let payload: { [key: string]: any } = {};

    const requestOrigin = ref<string>();

    onBeforeMount(async () => {
        // store.commit('ProductsListModule/RESET_DATA');
        await store.dispatch('ProductsListModule/setData');
    });

    onMounted(() => {
        setTimeout(() => {
            loading.value = false;
        }, 2000);
        console.log('DBG load  wrapper');
    });

    function handleAddressChange($event: any) {
        currentFormatedAddress.value = $event.formatted_address;
        payload = {
            ...payload,
            formatedAddress: currentFormatedAddress.value,
            ...ExtractAdressComponents($event.address_components),
        };
    }

    function handleShowMap(origin: string) {
        if (!!payload) {
            store.dispatch('FindPropertyModule/findProperties', payload);
        }
        showMap.value = true;
        router.push({
            path: 'trouver-un-bien-sur-carte',
            query: {
                requestOrigin: origin,
            },
        });

        // requestOrigin.value = origin;
    }
    function callback(success: boolean) {
        if (success) {
            notification.success({ message: 'Votre alerte a bien été créer' });
        } else {
            notification.error({
                message: "Oups! votre alerte n'a pas été créer. réessayez svp.",
            });
        }
    }
    //========Handlers===========
    function handleGoToDetail(id: number) {
        router.replace(`/detail/${id}`);
        // router.push('/');
    }
    function handleSearchProperty() {
        // payload = {
        //     ...payload,
        //     ...{ operationType: 'sale' },
        // };
        store.dispatch('FindPropertyModule/findProperties', payload);
        //store.commit('FindPropertyModule/setIsFromFindProperty',true);
        router.push({
            path: `/liste-produit/${store.getters['ProductsListModule/getOperationType']}`,
            query: {
                defaultAddress: currentFormatedAddress.value,
            },
        });
    }

    function updatePayload($event: any) {
        payload = {
            ...payload,
            ...$event,
        };
    }
    function handleMarkInterestSeach($event: any) {
        payload = {
            ...payload,
            ...$event,
        };
        store.dispatch('FindPropertyModule/findProperties', payload);
        store.commit('FindPropertyModule/setIsFromFindProperty', true);
        router.push({
            path: `/liste-produit/${store.getters['ProductsListModule/getOperationType']}`,
        });
    }
    function handleCardClick(cardData: any, $event: any) {
        router.push(`detail/${cardData.id}`);
    }
    function handleShowAdvancedSearch() {
        // history.pushState({data : 'my data'}, 'home', '/');
        showAdvancedSearch.value = true;
        router.push({
            path: '/avancee',
            query: {
                defaultAddress: currentFormatedAddress.value,
            },
        } as any);
    }
</script>
