<template>
    <MainContainer class="gas__container">
        <SideMenu class="gas__sidemenu" @active-comp="changeComponent" />
        <component
            v-if="hasConnection"
            :is="activeComponent"
            :relativeWorkConnection="relativeWorkConnection"
            :relativeWorkCounter="relativeWorkCounter"
            class="gas__section"
            energyType="GAZ"
            energyName="Gaz"
            :supplier="supplier"
            @on-redirect-to-consumption="handleOpenConsumption"
        />
        <MainCard v-else>
            <NoProposal
                text-desc="Votre rue/maison n'est raccordée a aucun fournisseur"
            />
        </MainCard>
    </MainContainer>
</template>
<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { ref, onMounted, shallowRef, watch } from 'vue';
    import SideMenu from './components/Gas/GasSideMenu/SideMenu.vue';
    import MainContainer from './components/MainContainer.vue';
    import MyConnection from './components/Gas/MyConnection.vue';
    import Consumption from './components/Gas/Consumption.vue';
    import {
        relativeWorkConnection,
        relativeWorkCounter,
    } from './components/Gas/Data/relativeWork.data';
    import NoProposal from './components/Gas/Consumption/NoProposal.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { useStore } from 'vuex';

    const route = useRoute();
    const store = useStore();

    const supplier = ref<string>('');
    const propertyId = ref<any>();

    const hasConnection = ref<boolean>(true);
    const activeComponent = shallowRef<any>(MyConnection);

    onMounted(() => {
        propertyId.value = route.params.id;
        getSupplier();
    });

    watch(() => supplier.value, v => {
        hasConnection.value = !!v
    }, {immediate: true});

    function changeComponent(item: any) {
        activeComponent.value = item.component;
    }

    function getSupplier() {
        const {gazSupplier} = store.getters['SupplierModule/getSupplierList'];
        supplier.value = gazSupplier;
        store.dispatch('SupplierModule/updateSupplierName', supplier.value);
    }

    function handleOpenConsumption() {
        activeComponent.value = Consumption;
    }
</script>
<style scoped lang="scss">
    .gas {
        &__container {
            @apply flex flex-col my-[18px] px-[15px] gap-y-[14px];
            @screen md {
                @apply flex-row gap-x-[18px] mb-0;
            }
            @screen lg {
                @apply gap-x-[20px] container;
            }
            @screen xl {
                @apply gap-x-[24px];
            }
        }
        &__sidemenu {
            @screen md {
                @apply mb-[14px];
                min-height: calc(100vh - 94px);
            }
        }
        &__section {
            @apply px-0 mt-0 w-full max-w-none;
            @screen md {
                max-width: calc(100% - 339px);
            }
        }
        &__add-colis {
            &:deep() {
                button {
                    @apply w-full flex justify-center items-center gap-x-[10px];
                }
            }
        }
    }
</style>
