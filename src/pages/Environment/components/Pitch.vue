<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="pitch" :button="selectedGarden !== undefined">
            <div class="pitch__container">
                <Title type="h3" label="Terrain" class="pitch__title" />
                <hr class="__hr" />
                <div class="pitch__items">
                    <div class="pitch__map--item">
                        <Map idMap="pitch" :polygon-coordinates="currentCoordinates" :need-polygon-layer="true"
                            :key="mapKey" />
                    </div>
                    <div class="pitch__wrap">
                        <GardenList
                            v-if="collectiveGardenList.length >= 1" 
                            name-input="choosenGarden"
                            label="Jardins collectifs" 
                            :options="collectiveGardenList" 
                            @select-option="handleRadioSelect"
                        />
                        <GardenList
                            v-if="individualGardenList.length >= 1" 
                            name-input="choosenGarden"
                            label="Jardins individuels" 
                            :options="individualGardenList" 
                            @select-option="handleRadioSelect"
                        />
                    </div>
                </div>
            </div>
            <template #buttonFooter>
                <div class="pitch__slider-btn">
                    <Button type-button="secondary" class="pitch__footer-btn" @click="handleNavigation(Actor)">
                        Suivant
                    </Button>
                </div>
            </template>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
import MainCard from '@/components/Display/MainCard/MainCard.vue';
import GardenList from '@/pages/Environment/components/GardenList.vue';
import Title from '@/components/Common/Title/Title.vue';
import Map from '@/components/section/map/index.vue';
import Button from '@/components/Common/Button/Button.vue';
import Actor from '@/pages/Environment/components/joinGardenExisting/Actor.vue';

import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const currentProperty = route.params.id;

const individualGardens = 'individual-gardens';
const collectiveGardens = 'collective-gardens';

const mapKey = ref<number>(0);
const currentCoordinates = ref<object[]>([]);

const individualGardenList = computed(() => {
    let data = store.getters["CollectiveGardenModule/getIndividualGardenList"];
    if (data.length >= 1) data.forEach((garden: any) => garden.type = individualGardens);
    return data;
});

const collectiveGardenList = computed(() => {
    let data = store.getters["CollectiveGardenModule/getCollectiveGardenList"];
    if (data.length >= 1) data.forEach((garden: any) => garden.type = collectiveGardens);
    return data;
});

const selectedGarden = computed(() => store.getters["CollectiveGardenModule/getSelectedGarden"]);

const breadcrumbListsData = [
    {
        label: 'Jardin collectif',
        url: `/environnement/${currentProperty}/jardin-collectif`
    },
    {
        label: 'Joindre un jardin collective existant',
    },
];

watch(() => currentCoordinates.value,
    () => {
        mapKey.value++;
    },
    { immediate: true, deep: true }
);

onMounted(async () => await routeController());

async function routeController() {
    let userID = store.getters['UserModule/getUserDetails'].id;
    let feature = route.params.feature;
    if (feature === 'joindre-jardin-existant') await store.dispatch("CollectiveGardenModule/fetchGardenList")
    else if (feature === 'mes-jardins-collectifs') await store.dispatch("CollectiveGardenModule/fetchGardenList", { users: userID })
    else router.push({ name: 'environment-detail', params: { id: currentProperty } })
}

function handleRadioSelect(value: any) {
    setGardenCoordinates(value);
    store.commit("CollectiveGardenModule/cleanUpTemporaryData");
    store.dispatch("CollectiveGardenModule/setCurrentGarden", value.choosenGarden);
}

async function setGardenCoordinates(value: any) {
    let type: string = value.type, data: any;

    value.hasOwnProperty('choosenGarden')
        ? data = value.choosenGarden.document
        : data = value.document;

    type === individualGardens
        ? currentCoordinates.value = data.individualPlot
        : type === collectiveGardens
            ? currentCoordinates.value = data.collectivePlot
            : console.error("unknown issue");

    await fetchEnvironmentStatus(currentCoordinates.value.shift());
}

async function fetchEnvironmentStatus(value: any) {
    await store.dispatch("CollectiveGardenModule/fetchEnvironmentStatus", value);
}

function handleNavigation(value: any) {
    selectedGarden === undefined
        ? router.go(0) // reload needed to solve unknown issue
        : store.commit("CollectiveGardenModule/updateActiveDisplay", value);
}
</script>

<style lang="scss" scoped>
.pitch {
    &__container {
        @apply flex flex-col gap-[14px] mb-[18px];
    }

    &__title {
        @apply text-[14px] text-primary font-[600] leading-[17px];
    }

    &__items {
        @apply flex flex-col gap-[14px];
    }

    &__map {
        &--item {
            max-height: 179px;
            @apply h-[179px] w-full;

            @screen sm {
                max-height: 300px;
                @apply h-[300px];
            }

            @screen md {
                max-height: calc(100vh - 275px);
                @apply h-[325px];
            }
        }
    }

    &__wrap {
        @apply grid grid-cols-1 gap-[14px];

        @screen sm {
            @apply grid-cols-2;
        }

        @screen md {
            @apply grid-cols-1;
        }

        @screen lg {
            @apply grid-cols-2;
        }

        &-item {
            @apply flex flex-col gap-[18px];
        }
    }

    &__checkbox {
        @apply flex flex-col gap-[10px];

        &-content {
            @apply flex flex-col;
        }

        &:deep() {
            .checkbox__container {
                .ant-checkbox-wrapper {
                    @apply items-center;
                }

                span {
                    @apply text-black font-[400];
                }

                .label-name {
                    @apply font-[300];
                }
            }
        }
    }

    &__footer-btn {
        @apply w-full;

        @screen md {
            @apply w-auto;
        }
    }

    &__slider-btn {
        @apply w-full flex justify-end;
    }
}

.__hr {
    @apply text-gray w-full;
}
</style>
