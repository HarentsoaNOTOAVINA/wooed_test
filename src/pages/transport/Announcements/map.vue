<template>
    <div class="map">
        <div class="map__section">
            <BackButton :text="'retour'" @return="backTo" />
            <hr class="__hr" />
            <span class="map__title">Votre itineraire</span>
            <Map 
                v-if="itinerary" class="map__measurement" 
                :key="mapKey"
                :need-polyline-layer="true"
                :polyline-coordinates="itinerary" 
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import BackButton from "@/components/Common/BackButton/BackButton.vue";
import Map from '@/components/section/map/index.vue';

import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();

const itinerary = ref<any>();
const mapKey= ref<number>(0)

watch(() => itinerary.value,
    (value) => {
        mapKey.value += 1;
        itinerary.value = value;
    }, { immediate: true, deep: true }
)

onMounted(() => checkItineraryData())

function checkItineraryData() {
    itinerary.value = store.getters["TransportModule/getItineraryData"];
    if (!itinerary.value) backTo();
}

function backTo() {
    router.back();
}

</script>
<style lang="scss" scoped>
.map {
    max-width: 945px;
    @apply mx-auto container;

    &__section {
        @apply mt-[18px];
        background-color: #fff;
        border-radius: 8px;
        padding: 14px;
    }

    &__title {
        @apply text-primary font-[600];
    }

    &__measurement {
        height: calc(100vh - 220px);
        width: 80vw;
        @apply mx-auto my-[18px];
    }

    &__grid {
        @apply w-fit mx-auto grid grid-cols-1 justify-items-center justify-center gap-[14px] my-4;

        @screen md {
            @apply grid-cols-2;
        }

        @screen lg {
            @apply grid-cols-3;
        }
    }
}

.__hr {
    @apply block my-[10px] text-gray;
}
</style>