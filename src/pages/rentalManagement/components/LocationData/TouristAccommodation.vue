<template>
    <div class="place-content-14px">
        <CardWrapper class="locationData__content">
            <Title
                type="h3"
                label="Périodes d’occupation"
                class="locationData__content-title"
            />
            <hr class="__hr" />
            <div class="locationData__content-items place-content-14px">
                <Select
                    name="dateStory"
                    label="Année"
                    placeholder="Selectionnez l'année"
                    :options="props.options"
                    @change-select="selectChange"
                />
                <div
                    class="locationData_content-hasData"
                    v-if="dataPeriodOccupation.lists.length > 0"
                >
                    <div class="locationData__content-content">
                        <ContentValue
                            v-for="(list, index) in dataPeriodOccupation.lists"
                            :label="mots[index] + ' période d’occupation'"
                            :value="list.duration"
                            unity="Jours"
                        />
                        <!-- <ContentValue
                        label="Seconde période d’occupation"
                        value="3"
                        unity="Jours"
                        /> -->
                    </div>
                    <ContentValue
                        label="TOTAL"
                        :value="dataPeriodOccupation.totalDay"
                        unity="Jours"
                    />
                    <div class="locationData__content-content">
                        <ContentValue
                            label="Période d’occupation maximale restante"
                            :value="dataPeriodOccupation.remainingDay"
                            unity="Jours"
                        />
                        <ContentValue
                            label="Période d’occupation maximale éventuellement"
                            :value="dataPeriodOccupation.maxDays"
                            unity="Jours"
                        />
                        <!-- <Input
                            label="Période d’occupation maximale éventuellement"
                            nameInput="lessorAccount"
                            placeholder="Ajouter la période imposée par la copropriété"
                            unity="Jours"
                        />
                        <hr class="__hr" />
                        <div class="locationData__content-button">
                            <Button> Ajouter </Button>
                        </div> -->
                    </div>
                </div>
                <div class="locationData__content-noData" v-else>
                    <Empty description="Aucune occupation" />
                </div>
            </div>
        </CardWrapper>
        <CardWrapper class="place-content-24px">
            <div class="locationData__content">
                <Title
                    type="h3"
                    label="Montant du loyer"
                    class="locationData__content-title"
                />
                <hr class="__hr" />
                <div class="locationData__content-items place-content-18px">
                    <!-- <Select
                        name="dateStory"
                        label="Année"
                        placeholder="Selectionnez l'année"
                        :options="props.options"
                        @change-select="selectChange"
                    /> -->
                    <div
                        class="locationData__hasData"
                        v-if="dataPeriodOccupation.lists.length > 0"
                    >
                        <div class="locationData__content-content">
                            <ContentValue
                                v-for="(
                                    list, index
                                ) in dataPeriodOccupation.lists"
                                :label="mots[index] + ' période d’occupation'"
                                :value="list.rent"
                                unity="€"
                            />
                            <!-- <ContentValue
                                label="Seconde période d’occupation"
                                value="12 000"
                                unity="€"
                            /> -->
                        </div>
                        <ContentValue
                            label="TOTAL"
                            :value="dataPeriodOccupation.totalRent"
                            unity="€"
                        />
                    </div>
                    <div class="locationData__noData" v-else>
                        <Empty description="Aucun loyer" />
                    </div>
                </div>
            </div>
            <!-- <div class="locationData__content">
                <Title
                    type="h3"
                    label="Compte du bailleur"
                    class="locationData__content-title"
                />
                <hr class="__hr" />
                <div class="locationData__content-items place-content-18px">
                    <Input
                        label="Numero du compte"
                        nameInput="accountNumber"
                        placeholder="0000 0000 0000 0000"
                    />
                </div>
            </div>
            <hr class="__hr" />
            <div class="locationData__content-button">
                <Button> Ajouter </Button>
            </div> -->
        </CardWrapper>
        <CardWrapper>
            <Title
                type="h3"
                label="Historique de paiment"
                class="locationData__content-title"
            />
            <hr class="__hr" />
            <!-- <Select
                name="dataHistory"
                label="Année"
                placeholder="Selectionnez l'année"
                :options="props.options"
                @change-select="selectChange"
            /> -->
            <div
                v-if="dataPeriodOccupation.lists.length > 0"
                class="locationData__history-lists"
                v-for="(list, index) in dataPeriodOccupation.lists"
            >
                <ContentValue
                    :label="'Durée du ' + mots[index] + ' période d’occupation'"
                    :value="list.duration"
                    unity="jours"
                />
                <ContentValue
                    :label="'Loyer du ' + mots[index] + ' période d’occupation'"
                    :value="list.rent"
                    unity="€"
                />
            </div>
            <div class="locationData__noData" v-else>
                <Empty description="Aucun historique" />
            </div>
            <!-- <ContentValue
                v-for="(list, index) in dataPeriodOccupation.lists"
                :label="mots[index] + ' période d’occupation'"
                :value="list.rent"
                unity="€"
            /> -->
        </CardWrapper>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import { ref } from 'vue';
    import Select from '@/components/Common/Select/Select.vue';
    import ContentValue from '@/components/Display/ContentValue/ContentValue.vue';
    import { Empty } from 'ant-design-vue';

    const props = defineProps({
        options: {
            type: null,
        },
        dataPeriodOccupation: {
            type: null,
        },
    });

    const emit = defineEmits<{
        (e: 'handleYearOccupation', payload: any): void;
        (e: 'handleYearHistory', payload: any): void;
    }>();

    const yearsSelected = ref<string>('');

    // const options = [
    //     {
    //         label: '2024',
    //         value: '2024',
    //     },
    //     {
    //         label: '2023',
    //         value: '2023',
    //     },
    //     {
    //         label: '2022',
    //         value: '2022',
    //     },
    //     {
    //         label: '2021',
    //         value: '2021',
    //     },
    // ];
    const mots = [
        'Première',
        'Deuxième',
        'Troisième',
        'Quatrième',
        'Cinquième',
        'Sixième',
        'Septième',
        'Huitième',
        'Neuvième',
        'Dixième',
        'Onzième',
        'Douzième',
        'Treizième',
        'Quatorzième',
        'Quinzième',
        'Seizième',
        'Dix-septième',
        'Dix-huitième',
        'Dix-neuvième',
        'Vingtième',
        'Vingt et unième',
        'Vingt-deuxième',
        'Vingt-troisième',
        'Vingt-quatrième',
        'Vingt-cinquième',
    ];

    async function selectChange(value: any) {
        yearsSelected.value = value.dateStory;
        switch (Object.keys(value)[0]) {
            case 'dataHistory':
                emit('handleYearHistory', yearsSelected.value);

                break;

            default:
                emit('handleYearOccupation', yearsSelected.value);
                break;
        }
    }
</script>

<style lang="scss" scoped>
    .locationData {
        &__content {
            @apply flex flex-col gap-[14px];
            &-title {
                @apply text-primary font-[600] text-[14px];
            }
            &-content {
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
                &:deep() {
                    .contentValue {
                        @apply w-full;
                    }
                }
            }
            &-button {
                @apply flex justify-end;
            }
        }
        &__history-lists {
            @apply flex gap-[10px] mt-[15px];
            // display: flex;
            // gap: 10px;
            // margin-top: 15px;
        }
    }
</style>
