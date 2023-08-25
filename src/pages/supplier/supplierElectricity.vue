<template>
    <MainContainer class="elec__container">
        <SideMenu
            class="elec__sidemenu"
            @active-comp="changeComponent"
            :region="region"
        />
        <component
            v-if="hasConnection"
            :is="activeComponent"
            :relativeWorkConnection="relativeWorkConnection"
            :relativeWorkCounter="relativeWorkCounter"
            class="elec__section"
            energyType="electricity"
            energyName="Eléctricité"
            :supplier="supplier"
            :region="region"
            @on-redirect-to-consumption="handleOpenMenu('consumption')"
            @on-go-to-fitter="handleOpenMenu('fitter')"
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
    import { ref, onMounted, shallowRef, onBeforeMount, computed, watch } from 'vue';
    import SideMenu from './components/Electricity/ElectrictySideMenu/SideMenu.vue';
    import MainContainer from './components/MainContainer.vue';
    import MyConnection from './components/Gas/MyConnection.vue';
    import Consumption from './components/Gas/Consumption.vue';
    import NoProposal from './components/Gas/Consumption/NoProposal.vue';
    import Installation from './components/Electricity/SolarPannel/Installation/Installation.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import {
        relativeWorkConnection,
        relativeWorkCounter,
    } from './components/Gas/Data/relativeWork.data';
    import { useStore } from 'vuex';

    const route = useRoute();
    const store = useStore();

    const region = ref<string>('');
    const supplier = ref<string>('');
    const propertyId = ref<any>();

    const hasConnection = ref<boolean>(true);
    const activeComponent = shallowRef<any>(MyConnection);

    onMounted(() => {
        propertyId.value = route.params.id;
        getSupplier();
    });

    onBeforeMount(() => {
        getRegion();
    });

    watch(() => supplier.value, v => {
        hasConnection.value = !!v
    }, {immediate: true});

    const getRegion = () => {
        const data = computed(
            () => store.getters['PropertyDetailModule/getPropertyDetail'].data
        );
        region.value = 'Vlaams Gewest';
        // region.value = data.value.region;
    };

    function changeComponent(item: any) {
        activeComponent.value = item.component;
    }

    function getSupplier() {
        const {elecSupplier} = store.getters['SupplierModule/getSupplierList'];
        supplier.value = elecSupplier;
        store.dispatch('SupplierModule/updateSupplierName', supplier.value);
    }

    function handleOpenMenu(menuToOpen: string) {
        switch (menuToOpen) {
            case 'consumption':
                activeComponent.value = Consumption;
                break;
            case 'fitter':
                activeComponent.value = Installation;
                break;
        }
    }
</script>
<style scoped lang="scss">
    .elec {
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
