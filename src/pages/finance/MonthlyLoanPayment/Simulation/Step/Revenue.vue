<template>
    <div class="simulation-step">
        <Title type="h3" label="REVENUS" />
        <hr />
        <Select
            @change-select="handleEntry"
            placeholder="Selectionnez"
            label="Profession"
            name="occupation"
            :options="OCCUPATION"
            :required="true"
        />
        <div class="simulation-step__col">
            <Input
                @input="handleEntry"
                placeholder="0.00 €"
                label="Employeur"
                name-input="employer"
                :required="true"
                input-type="number"
            />
            <InputDate
                :required="true"
                name="dateFrom"
                label="Depuis"
                @handle-date-format="handleEntry"
                class="mb-[20px]"
            />
        </div>
        <Input
            @input="handleEntry"
            placeholder="0.00 €"
            label="Revenu net de l'activité principale"
            name-input="netIncomeFromMainActivity"
            input-type="number"
        />
        <Input
            @input="handleEntry"
            placeholder="0.00 €"
            label="Revenus de l'activité complémentaire"
            name-input="netIncomeFromComplementaryActivity"
            input-type="number"
        />
        <Input
            @input="handleEntry"
            placeholder="0.00 €"
            label="Revenus locatifs"
            name-input="rentalIncome"
            input-type="number"
        />
        <Switch
            @handle-switch="handleEntry"
            item-label="Avez-vous d'autres revenus (pension alimentaire, chèques-repas,...)?"
            name="otherIncome"
            class="mb-[20px]"
        />
        <transition appear mode="out-in" name="fade-appear">
            <div v-if="params.otherIncome">
                <div class="simulation-step__info">
                    <InfoIcon />
                    <Paragraphe
                        >Additionnez les montants mensuels de vos autres revenus
                        et indiquez le montant total. Les revenus locatifs, les
                        allocations familiales et les revenus d'une activité
                        complémentaire ne doivent pas être inclus.</Paragraphe
                    >
                </div>
                <Input
                    @input="handleEntry"
                    placeholder="0.00 €"
                    label="Montant"
                    name-input="otherIncomeAmount"
                    input-type="number"
                />
                <div class="simulation-step__info">
                    <InfoIcon />
                    <Paragraphe
                        >Indiquez ici les autres revenus que vous avez
                        additionnés au préalable.</Paragraphe
                    >
                </div>
                <Input
                    @input="handleEntry"
                    placeholder="0.00 €"
                    label="De quels autres revenus s'agit-il?"
                    name-input="otherIncomeType"
                    input-type="number"
                />
            </div>
        </transition>
        <div v-if="havePartener">
            <hr />
            <Title type="h3" label="REVENUS PARTENAIRE" />
            <hr />
            <Select
                @change-select="handleEntry"
                placeholder="Selectionnez"
                label="Profession"
                name="partOccupation"
                :options="OCCUPATION"
                :required="true"
            />
            <div class="simulation-step__col">
                <Input
                    @input="handleEntry"
                    placeholder="0.00 €"
                    label="Employeur"
                    name-input="partEmployer"
                    :required="true"
                    input-type="number"
                />
                <InputDate
                    :required="true"
                    name="partDateFrom"
                    label="Depuis"
                    @handle-date-format="handleEntry"
                    class="mb-[20px]"
                />
            </div>
            <Input
                @input="handleEntry"
                placeholder="0.00 €"
                label="Revenu net de l'activité principale"
                name-input="partNetIncomeFromMainActivity"
                input-type="number"
            />
            <Input
                @input="handleEntry"
                placeholder="0.00 €"
                label="Revenus de l'activité complémentaire"
                name-input="partNetIncomeFromComplementaryActivity"
                input-type="number"
            />
            <Input
                @input="handleEntry"
                placeholder="0.00 €"
                label="Revenus locatifs"
                name-input="partRentalIncome"
                input-type="number"
            />
            <Switch
                @handle-switch="handleEntry"
                item-label="Avez-vous d'autres revenus (pension alimentaire, chèques-repas,...)?"
                name="partOtherIncome"
                class="mb-[20px]"
            />
            <transition appear mode="out-in" name="fade-appear">
                <div v-if="params.otherIncome">
                    <div class="simulation-step__info">
                        <InfoIcon />
                        <Paragraphe
                            >Additionnez les montants mensuels de vos autres
                            revenus et indiquez le montant total. Les revenus
                            locatifs, les allocations familiales et les revenus
                            d'une activité complémentaire ne doivent pas être
                            inclus.</Paragraphe
                        >
                    </div>
                    <Input
                        @input="handleEntry"
                        placeholder="0.00 €"
                        label="Montant"
                        name-input="partOtherIncomeAmount"
                        input-type="number"
                    />
                    <div class="simulation-step__info">
                        <InfoIcon />
                        <Paragraphe
                            >Indiquez ici les autres revenus que vous avez
                            additionnés au préalable.</Paragraphe
                        >
                    </div>
                    <Input
                        @input="handleEntry"
                        placeholder="0.00 €"
                        label="De quels autres revenus s'agit-il?"
                        name-input="partOtherIncomeType"
                        input-type="number"
                    />
                </div>
            </transition>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import { ref, watch } from 'vue';
    import InfoIcon from '@/components/Icon/InfoIcon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';

    const params = ref<any>({});

    const OCCUPATION = ref<any>([
        {
            value: 'Employé, fonctionnaire',
            label: 'Employé, fonctionnaire',
        },
        {
            value: 'Ouvier',
            label: 'Ouvier',
        },
        {
            value: 'Indépendant',
            label: 'Indépendant',
        },
        {
            value: 'Pennsionné',
            label: 'Pennsionné',
        },
        {
            value: 'Administrateur de société',
            label: 'Administrateur de société',
        },
        {
            value: 'Femme/homme au foyer',
            label: 'Femme/homme au foyer',
        },
        {
            value: 'Etudiant',
            label: 'Etudiant',
        },
        {
            value: `Demandeur d'emploi`,
            label: `Demandeur d'emploi`,
        },
        {
            value: 'Revenu de remplacement mutuelle',
            label: 'Revenu de remplacement mutuelle',
        },
        {
            value: 'Professions libérales',
            label: 'Professions libérales',
        },
        {
            value: 'Rentier',
            label: 'Rentier',
        },
        {
            value: 'Agriculteur',
            label: 'Agriculteur',
        },
    ]);

    const emit = defineEmits<{
        (fn: 'on-handle-params', v: any): void;
    }>();

    defineProps<{
        havePartener?: boolean
    }>()

    watch(
        () => params.value,
        (v) => {
            emit('on-handle-params', v);
        }
    );

    function handleEntry(evt: any) {
        const [name, value] = Object.entries(evt)[0];
        switch (name) {
            case '':
                break;
            default:
                paramsDefaultAssignation(evt);
                break;
        }
    }
    function paramsDefaultAssignation(
        obj?: any,
        defaultParams: any = params.value
    ) {
        params.value = {
            ...defaultParams,
            ...obj,
        };
    }
</script>
<style lang="scss" scoped>
    .simulation-step {
        &__info {
            @apply p-[10px] rounded-[8px] bg-gray;
            &:deep() {
                .paragraphe__normal {
                    @apply italic text-[11px];
                }
                path:first-child {
                    @apply fill-[var(--color-stroke-gray)];
                }
                path:last-child {
                    @apply fill-[var(--color-gray-icon)];
                }
            }
        }
        &__col {
            @apply md:grid grid-cols-2 gap-[10px];
            &:deep() {
                .date__space {
                    @apply gap-[9px];
                }
            }
        }
        .fade-appear-enter-active,
        .fade-appear-leave-active {
            @apply transition-all;
        }
        .fade-appear-enter-from,
        .fade-appear-leave-to {
            @apply translate-x-[-200px];
        }
    }
</style>
