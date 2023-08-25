<template>
    <div class="other-product-list">
        <div v-if="isLoadProperties" class="relative loading__container">
            <Loader />
        </div>
        <template v-else>
            <div
                v-if="propertiesList.length"
                class="other-product-list__content"
            >
                <ListProducts
                    :is-bordered="true"
                    class="other-product-list__content__items"
                    :DataCard="propertiesList"
                    @on-handle-detail="getPropertyId"
                />
            </div>
            <div class="is-empty">
                <a-empty description="Pas de resultat" />
            </div>
        </template>
    </div>
</template>
<script lang="ts" setup>
    import ListProducts from '@/components/section/ListProducts/ListProducts.vue';
    import { onMounted, ref } from 'vue';
    import productsListServices from '@/services/productsListService';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { Empty as AEmpty } from 'ant-design-vue';

    const emit = defineEmits<{
        (e: 'on-select-other-property', v: { id: number; user: any }): void;
    }>();
    const isLoadProperties = ref<boolean>(true);
    const propertiesList = ref<any[]>([]);

    const props = defineProps<{
        searchParams: any;
    }>();

    onMounted(() => {
        getOtherProperties();
        console.log(props.searchParams, 'PARAMS');
    });

    async function getOtherProperties() {
        try {
            const { data } = await productsListServices.getProductsList({
                exchangeable: true,
            });
            // propertiesList.value = data;
            console.log(data, 'INIT');
            filterPropertyRes(data);
        } finally {
            isLoadProperties.value = false;
        }
    }
    function filterPropertyRes(propList: any[]) {
        function _condition(toCheck: any, value: any) {
            if (toCheck) {
                return toCheck === value;
            } else {
                return toCheck === toCheck;
            }
        }
        const { propertyType, country, region, municipality } =
            props.searchParams;
        propertiesList.value = propList
            .filter((property: any) =>
                _condition(propertyType, property.propertyType.name)
            )
            .filter((property: any) =>
                _condition(country, property.codeCountry)
            )
            .filter((property: any) => _condition(region, property.codeRegion))
            .filter((property: any) =>
                _condition(municipality, property.codeMunicipality)
            );
        console.log(propertiesList.value, 'filterd');
    }
    function getPropertyId(property: any) {
        emit('on-select-other-property', {
            id: property.id,
            user: property.user,
        });
    }
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .other-product-list {
        .is-empty {
            @apply h-[calc(100vh-230px)] flex justify-center items-center;
        }
        .loading__container {
            @apply h-[600px];
            &:deep() {
                .custom-loader {
                    @apply bg-white;
                }
            }
        }
        &__content {
            @include scrollbar;
            @apply overflow-auto h-[calc(100vh-230px)];
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
