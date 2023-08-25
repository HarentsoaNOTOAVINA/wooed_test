<template>
    <MainCard
        :button="false"
        :dataBreadcrumbs="breadcrumbListsData"
        class="movingCard mt-[25px]"
    >
        <div class="moving-container">
            <InputDate
                label="Je démenage le : "
                @handleChange="handleChange($event, 'plannedMovingDate')"
                :required="true"
                :value="date"
                :placeholder="date !== '' ? date : 'Choisir une date'"
            />
            <LoadingButton
                size="md"
                theme="dark"
                v-if="loading"
                class="loading"
            />
            <div v-if="isPlanningMoving" class="flex flex-col gap-[18px]">
                <div class="flex flex-col gap-[12px]">
                    <div class="flex justify-between items-end">
                        <Title
                            label="Préparer mon déménagement"
                            type="h3"
                            class="title"
                        />
                        <Paragraphe class="jj"
                            >J-{{ dDay + 1 }}</Paragraphe
                        >
                    </div>
                    <hr class="__hr" />
                </div>
                <MovingElements
                    :date="date"
                    :property-detail="property"
                    :is-load="isLoading"
                    :roadway-service="roadwayService"
                />
            </div>
        </div>
    </MainCard>
</template>
<script lang="ts" setup>
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import MovingElements from './components/MovingElements.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { onMounted, ref, watch, computed } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import PropertyDetailService from '@/services/PropertyDetailService';
    import { useStore } from 'vuex';
    import moment from 'moment';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const store = useStore();
    const currentProperty = parseInt(route.params.id.toString());
    const breadcrumbListsData = [
        {
            url: `/demenagement/${currentProperty}`,
            label: 'Démenagement',
        },
        {
            label: 'Préparer mon déménagement',
        },
    ];

    const isLoading = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const isPlanningMoving = ref<boolean>(false);

    const date = ref<string>('');
    const propertyDetail = ref<Object>();
    const dDay = ref<number>(0);
    const property = computed(() => store.getters['PropertyDetailModule/getPropertyDetail']['data']);
    const roadwayService = computed(() => store.getters["PropertyDetailModule/getRoadwayServiceDetails"]);
    watch(
        () => date.value,
        (v) => {
            date.value = v;
        },
        { immediate: true }
    );

    onMounted(async () => {
        await getProductDetail();
        await fetchPropertyDetails();
        await fetchRoadwayServiceDetails();
    });

    async function getProductDetail() {
        try {
            const { plannedMovingDate } = (
                await PropertyDetailService.getProductDetail(currentProperty)
            ).data;
            date.value = plannedMovingDate;
            if (date.value) {
                isPlanningMoving.value = true;
            }
            const selectedDate = new Date(plannedMovingDate);
            dDay.value = Math.floor(
                    (selectedDate.getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    );
        } catch (error) {
            console.error(error);
        } 
    }

    async function handleChange($event: any, name: any) {
        isLoading.value = true;
        loading.value = true;
        const formattedDate = moment($event).format('YYYY-MM-DD');
        const params = {
            plannedMovingDate: formattedDate,
        };

        try {
            const { data } = await PropertyDetailService.updateProductDetail(
                currentProperty,
                params
            );
            const selectedDate = new Date(data.data.plannedMovingDate);
            propertyDetail.value = data.data;
            
            date.value = data.data.plannedMovingDate;
            dDay.value = Math.floor(
                    (selectedDate.getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                );
        } catch (error) {
            console.error(error);
        } finally {
            isPlanningMoving.value = true;
            isLoading.value = false;
            loading.value = false;
        }
    }

    async function fetchRoadwayServiceDetails() {
        const payload = {
            municipality: property.value.municipalityName,
            region: property.value.region,
            postalCode: property.value.postalCode
        }
        await store.dispatch("PropertyDetailModule/fetchRoadwayServiceDetails", payload);
    }

    async function fetchPropertyDetails() {
        await store.dispatch("PropertyDetailModule/setPropertyData", currentProperty);
    }
</script>
<style lang="scss" scoped>
    .moving-container {
        background-color: white;
        @apply flex flex-col gap-[25px];
    }
    .title {
        @apply text-grayIcon font-[600];
    }
    .movingCard {
        .fade-slide-enter-active,
        .fade-slide-leave-active {
            @apply transition-all;
        }
        .fade-slide-enter-from,
        .fade-slide-leave-to {
            @apply translate-x-[-300px] opacity-0;
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
    .jj {
        @apply p-[12px] font-semibold w-auto text-center text-green rounded-[100%];
        background-color: var(--color-gray);
    }
    .loading {
        display: flex;
        &:deep() {
            svg {
                margin: 25px auto;
            }
        }
    }
</style>
