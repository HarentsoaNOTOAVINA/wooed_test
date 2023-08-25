<template>
    <MainContainer class="water__container">
        <SideMenu class="water__sidemenu" @active-comp="changeComponent" />
        <component
            v-if="hasConnection"
            :is="activeComponent"
            :relativeWorkConnection="relativeWorkConnection"
            :listSupplier="listSupplier"
            class="water__section"
            energyType="water"
            energyName="Eau"
            :supplier="supplier"
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
    import { ref, onMounted, shallowRef, computed, onBeforeMount, watch } from 'vue';
    import SideMenu from './components/Water/WaterSideMenu/SideMenu.vue';
    import MainContainer from './components/MainContainer.vue';
    import {
        relativeWorkConnectionFlandre,
        relativeWorkConnectionWallon,
        relativeWorkConnectionBruxelle,
    } from './components/Water/Data/relativeWork.data';
    import {
        listSupplierDataFlandre,
        listSupplierDataBruxelle,
        listSupplierDataWallon,
    } from './components/Water/Data/listSupplier.data';
    import NoProposal from './components/Gas/Consumption/NoProposal.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { useStore } from 'vuex';
    import MyConnection from './components/Water/MyConnection/MyConnection.vue';

    const route = useRoute();
    const store = useStore();

    const supplier = ref<string>('');
    const propertyId = ref<any>();
    const relativeWorkConnection = ref<any>(relativeWorkConnectionFlandre);
    const listSupplier = ref<any>();

    const hasConnection = ref<boolean>(true);
    const activeComponent = shallowRef<any>(MyConnection);

    const region = ref<string>('');

    onBeforeMount(() => {
        getRegion();
    });

    onMounted(() => {
        propertyId.value = route.params.id;
        getSupplier();
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
        console.log("DATA REGION = ", region.value);
        
        switch (region.value) {
            case 'Vlaams Gewest':
                listSupplier.value = listSupplierDataFlandre;
                break;
            case 'Bruxelles-Capitale':
            case 'Bruxelles':
                listSupplier.value = listSupplierDataBruxelle;
                break;
            case 'Région Wallonne':
                listSupplier.value = listSupplierDataWallon;
                break;
            default:
                break;
        }
    };

    function changeComponent(item: any) {
        activeComponent.value = item.component;
    }

    function getSupplier() {
        const {waterSupplier} = store.getters['SupplierModule/getSupplierList'];
        supplier.value = waterSupplier;
        switch (supplier.value) {
            case 'SIBLEGA':
                relativeWorkConnection.value = relativeWorkConnectionBruxelle;
                break;
            case 'ORES':
                relativeWorkConnection.value = relativeWorkConnectionWallon;
                break;
            case 'FLUVIUS':
                relativeWorkConnection.value = relativeWorkConnectionFlandre;
                break;
            default:
                break;
        }
        store.dispatch('SupplierModule/updateSupplierName', supplier.value);
    }
</script>
<style scoped lang="scss">
    .water {
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
