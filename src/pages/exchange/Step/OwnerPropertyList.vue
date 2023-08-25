<template>
    <div class="owner-product-list">
        <div v-if="isLoadProperties" class="relative loading__container">
            <Loader />
        </div>
        <div v-else class="owner-product-list__content">
            <a-empty
                v-if="!propertiesList || !propertiesList.length"
                :description="`Vous n'avez pas de bien`"
            />
            <ListProducts
                v-else
                :is-bordered="true"
                class="owner-product-list__content__items"
                :DataCard="propertiesList"
                @on-handle-detail="getPropertyId"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
    import ListProducts from '@/components/section/ListProducts/ListProducts.vue';
    import { onMounted, ref } from 'vue';
    import productsListServices from '@/services/productsListService';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { notification } from 'ant-design-vue';
    import { Empty as AEmpty } from 'ant-design-vue';
    import { useStore } from 'vuex';

    const store = useStore();
    const emit = defineEmits<{
        (e: 'on-select-owner-property', details: any): void;
    }>();
    const isLoadProperties = ref<boolean>(true);
    const propertiesList = ref<any[]>([]);

    onMounted(() => {
        getOwnerProperties();
    });

    async function getOwnerProperties() {
        try {
            // const { data } =
            //     await productsListServices.getProductsListPerUser();
            // propertiesList.value = data;

            const data = await store.dispatch(
                'ManagePropertyModule/getAllProperty'
            );
            propertiesList.value = data;
        } finally {
            isLoadProperties.value = false;
        }
    }
    async function getPropertyId(property: any) {
        console.log(property, "Ity property");
        
        try {
            isLoadProperties.value = true;
            const { data } = await productsListServices.updateProductDetail(
                property.id,
                { exchangeable: true }
            );
            console.log(data, 'changed');
            emit('on-select-owner-property', {
                id: property.id,
                lat: property.latitude,
                lng: property.longitude,
            });
        } catch (error) {
            notification.error({
                message: "Une erreur s'est produite, veuillez réessayer",
            });
        } finally {
            isLoadProperties.value = false;
        }
        /**
         * TO DO => change selected property status to exchangeable
         */
    }
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .owner-product-list {
        @apply h-full;
        .loading__container {
            @apply h-full;
            &:deep() {
                .custom-loader {
                    @apply bg-white;
                }
            }
        }
        &__content {
            &__items {
                @apply grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:w-full justify-items-center overflow-auto;
            }
            &:deep() {
                .card {
                    @apply border border-gray;
                }
            }
        }
    }
</style>
