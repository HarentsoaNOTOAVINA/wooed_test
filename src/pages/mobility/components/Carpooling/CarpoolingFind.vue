<template>
    <div class="carpooling__container">
        <SideMenu :dataBikes="dataMenuBikes" class="carpooling__side-menu" />

        <Result
            v-if="showResult"
            title="Résultat de recherche"
            @back="handleShowResult"
            type="search"
        />

        <MobilityCard
            v-else
            :dataBreadcrumbs="breadcrumbListsData"
            :editIcon="true"
            :button="true"
            label-button="Rechercher"
            class="carpooling-card__section"
            :disable-submit-button="disableBtn"
            @on-click="handleSubmit"
            :loading="loading"
        >
            <div class="carpooling-card__container">
                <div class="carpooling-card__items--container">
                    <Paragraphe class="text-primary">
                        Je cherche un covoitureur dans un périmètre
                    </Paragraphe>

                    <div class="carpooling-card__items">
                        <Input
                            label="De :"
                            placeholder="Rayon en km"
                            name-input="proposedPerimeter"
                            inputType="number"
                            class="carpooling-card__form"
                            @input="handleChange"
                        />
                    </div>
                    <div class="carpooling-card__items carpooling-card__card">
                        <!-- <div class="carpooling-card__input-date">
                            <div 
                                class="carpooling-card__input-date-container"
                               
                            >
                                <InputDate
                                    v-for="nb in numberDate"
                                    :key="nb"
                                    label="Jours suivant"
                                    placeholder="00"
                                    name="nextDay"
                                    class="carpooling-card__form"
                                    @handle-date-format="handleChange($event, nb)"
                                   
                                />
                            </div>
                            <div class="carpooling-card__action">
                                <div class="carpooling-card__add-date" @click="handleAddDate">
                                    +
                                </div>
                                <div 
                                    class="carpooling-card__add-date" 
                                    @click="handleMinusDate"
                                    v-if="numberDate > 1"
                                >
                                    -
                                </div>
                            </div>
                        </div> -->
                        <AddIncremented
                            label="Jours suivant"
                            increment-type="inputDate"
                            name="nextDay"
                        />
                    </div>
                    <div class="carpooling-card__items">
                        <TimePicker
                            label="Heure de départ"
                            placeholder="Entre 6h et 6h30....."
                            name="departureTime"
                            class="carpooling-card__form"
                            @change="handleChange"
                        />
                    </div>
                    <div class="carpooling-card__items">
                        <TimePicker
                            label="Heure de retour"
                            placeholder="Entre 12h et 12h30..."
                            name="returnTime"
                            class="carpooling-card__form"
                            @change="handleChange"
                        />
                    </div>
                    <div class="carpooling-card__items">
                        <Input
                            label="Adresse de destination"
                            placeholder="Bruxelles.."
                            class="carpooling-card__form"
                            name-input="destinationAddress"
                            @input="handleChange"
                            id="address"
                        />
                    </div>
                </div>
            </div>
        </MobilityCard>
    </div>
</template>
<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
    import SideMenu from '@/pages/mobility/components/Carpooling/CarpoolingSideMenu/CarpoolingSideMenu.vue';
    import MobilityCard from '@/pages/mobility/components/MobilityCard.vue';
    import { ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import useAutoComplete from '@/composables/useAutoComplete';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue'


    import Result from '@/pages/mobility/components/Carpooling/Result.vue';
    import AddIncremented from '@/components/Display/AddIncremented/AddIncremented.vue';

    const breadcrumbListsData = [
        {
            url: '/mobilite',
            label: 'Mobilité',
        },
        {
            label: 'Services de covoitureur',
        },
    ];

    const dataMenuBikes = [
        {
            icon: 'CarFind',
            label: 'Chercher un covoitureur',
            link: '/mobilite/recherche-covoitureur',
            activeButton: true,
        },
        {
            icon: 'TrainCar',
            label: 'Services de covoitureur',
            link: '/mobilite/service-covoitureur',
        },
    ];

    const { autocompleteResult } = useAutoComplete('address');

    const store = useStore();
    const loading = ref<boolean>(false);
    const disableBtn = ref<boolean>(false);
    const showResult = ref<boolean>(false);
    const params = ref<any>({
        destinationAddress: null,
        days: [],
    });
    const numberDate = ref<number>(1);

    watch(
        () => autocompleteResult,
        (value) => {
            params.value.destinationAddress = value.value?.address;
        },
        { immediate: true, deep: true }
    );

    function handleAddDate() {
        numberDate.value++;
    }

    function handleMinusDate() {
        numberDate.value--;
        if (params.value.days.length > numberDate.value) {
            params.value.days.pop();
        }
    }

    function handleChange(item: any, nb?: number) {
        for (let i in item) {
            if (i === 'nextDay') {
                if (nb && params.value.days.length > nb - 1) {
                    params.value.days[nb - 1] = item[i];
                } else {
                    params.value.days = [...params.value.days, item[i]];
                }
            } else if (i === 'proposedPerimeter') {
                params.value = {
                    ...params.value,
                    proposedPerimeter: +item[i],
                };
            } else if (i === 'depositedPerimeter') {
                params.value = {
                    ...params.value,
                    depositedPerimeter: +item[i],
                };
            } else {
                params.value = {
                    ...params.value,
                    ...item,
                };
            }
        }
    }
    async function handleSubmit() {
        console.log('params\n', params.value);
        loading.value = true;
        await store.dispatch('MobilityModule/carpoolingService', params.value);
        loading.value = false;
        handleShowResult();
    }

    function handleShowResult() {
        showResult.value = !showResult.value;
    }
</script>
<style scoped lang="scss">
    .carpooling {
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
        &__sideMenu {
            @apply mb-[14px];
            min-height: calc(100vh - 94px);
        }
        &__items {
            @apply mt-0 px-0;
        }
    }
    .carpooling-card {
        &__section {
            @apply px-0 mt-0 max-w-none w-full;
        }
        &__container {
            @apply flex flex-col gap-y-[18px];
        }
        &__items--container {
            @apply flex flex-col gap-y-[12px];
        }
        &__items--wrap {
            @apply grid grid-cols-1 gap-[12px];
            @screen lg {
                @apply grid grid-cols-2;
            }
        }
        &__form {
            @apply mb-0 flex flex-col gap-[10px];
            &:deep() {
                label,
                p {
                    @apply font-[600] text-black mb-0;
                }
            }
        }

        &__add-date {
            @apply bg-slate-300 w-[40px] h-[40px] flex justify-center items-center rounded-[50%] cursor-pointer hover:bg-slate-200;
        }
        &__input-date {
            @apply flex gap-[20px];
        }

        &__card {
            @apply border p-[10px] rounded-[8px] border-slate-300;
        }

        &__input-date-container {
            @apply flex flex-col flex-1 gap-[10px];
        }

        &__action {
            @apply flex flex-col gap-[20px];
        }
    }
</style>
