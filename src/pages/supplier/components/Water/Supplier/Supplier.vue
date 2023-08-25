<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="supplier">
            <div class="supplier__container">
                <Title type="h2" label="Fournisseur" class="supplier__title" />
                <hr class="__hr" />
                <SupplierNameInfo />
                <ListSupplier
                    :listSupplierData="listSupplierData"
                    @handle-open-form="openForm"
                />
                <Modal
                    :is-show-modal="isShow"
                    @on-back="onOpenModal"
                    title="Fourniseur"
                    width="750"
                >
                    <template #content>
                        <SupplierForm />
                    </template>
                </Modal>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import SupplierNameInfo from '../../SupplierNameInfo.vue';
    import ListSupplier from '../../ListSupplier.vue';
    import { computed, onMounted, PropType, ref } from 'vue';
    import SupplierForm from './SupplierForm.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },

        {
            label: 'Eau',
        },
    ];

    const isShow = ref<boolean>(false);

    function openForm(url: string) {
        isShow.value = true;
    }

    function onOpenModal() {
        isShow.value = !isShow.value;
    }

    onMounted(() => {
        getListSupplierByRegion();
    });

    const listSupplierData = ref<any>();

    const props = defineProps({
        listSupplier: {
            type: Object as PropType<any>,
            default: null,
        },
    });

    function getListSupplierByRegion() {
        listSupplierData.value = props.listSupplier;
    }
</script>

<style lang="scss" scoped>
    .supplier {
        &__container {
            @apply flex flex-col gap-[18px];
        }
        &__title {
            @apply text-[16px] font-[600] text-grayIcon;
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
