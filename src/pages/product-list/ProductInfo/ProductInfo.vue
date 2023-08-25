<template>
    <div class="product-info">
        <div class="product-info__right">
            <Filter @on-show-cart="$emit('on-show-cart')" :isMap="true" />
            <Map
                class="my-map"
                :mapCenterCoordinate="dataMap[mapCenter]"
                :needMarkerLayer="true"
                :markerCustomCoordinates="dataMap"
                :needPriceMarker="true"
                @touched="testEvent"
            />
        </div>
        <div class="product-info__left">
            <ProductCard :DataCard="DataCard" />
        </div>
    </div>
</template>
<script setup lang="ts">
    import ProductCard from '@/components/Display/productCard/ProductCard.vue';
    import CardType from '@/components/Display/productCard/CardType';
    import { onMounted, PropType, reactive, ref } from 'vue';
    import Filter from '../Filter/Filter.vue';
    import Map from '@/components/section/map/index.vue';
    import { geocode } from '@/composables/google-maps-api';
    interface latLngWithPrice {
        lat: number;
        lng: number;
        prices: number;
        activeClass: string;
        id: number;
    }

    const props = defineProps({
        DataCard: {
            type: Object as PropType<CardType>,
            required: true,
        },
        mapData: {
            type: Array<latLngWithPrice>,
            required: true,
        },
        mapCenter: {
            type: Number,
            required: true,
        },
    });
    let dataMap = ref(props.mapData);
    const emit = defineEmits(['touched', 'on-show-cart']);
    const data: any = reactive({
        isMapReady: false,
        PlaceCoordinates: [],
        fields: [
            {
                id: 'propertyType',
                placeholder: 'type de bien',
                options: [],
                class: 'w-full',
                handler: () => {},
            },
            {
                id: 'propertyLocation',
                placeholder: 'Ou se trouve le bien ?',
                options: [],
                class: 'w-full',
                handler: () => {},
            },
            {
                id: 'minPrice',
                placeholder: 'Prix min',
                options: [],
                class: 'w-1/2',
                handler: () => {},
            },
            {
                id: 'maxPrice',
                placeholder: 'Prix max',
                options: [],
                class: 'w-1/2',

                handler: () => {},
            },
        ],
    });
    const testEvent = (n: any) => {
        emit('touched', n);
    };

    onMounted(async () => {
        const proomise = geocode('Bruxelles Belgique');
        await proomise.then((result: any) => {
            return (
                (data.isMapReady = true),
                data.PlaceCoordinates.push(result.coordinates)
            );
        });
    });
</script>

<style lang="scss" scoped>
    .product-info {
        @apply grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-2;
        height: auto;
        &__left {
            @apply sm:col-span-2 md:col-span-2 md:justify-self-center lg:col-span-1  sm:w-full;
            height: 478px;
        }
        &__right {
            @apply col-span-1 sm:col-span-2  md:col-span-2 lg:col-span-2 xl:col-span-2   flex flex-col gap-2;
            height: 80vh;
            .my-map {
                height: 80vh;
                width: 100%;
                border-radius: 8px;
                z-index: 9;
            }
        }
    }
</style>
