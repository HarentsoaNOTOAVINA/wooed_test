<template>
    <div v-if="!isLoad" class="property-tax__items">
        <div class="property-tax__form-item-wrap">
            <label>
                <span> Maison modeste </span>
                <InfoIcon @click="$emit('on-modal-handled', 'modesteHouse')" />
            </label>
            <Select
                name="modestHouse"
                class="property-tax__form-item"
                :options="modesteHouse"
                @change-select="$emit('on-handle-change', $event)"
            />
        </div>
        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span> Personne handicapé(e) </span>
                        <InfoIcon
                            @click="
                                $emit('on-modal-handled', 'invalidPersonDepWal')
                            "
                        />
                    </label>
                    <Switch
                        name="handicapOrInvalid"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label=""
                        class="property-tax__form-item p"
                        @handle-switch="$emit('on-handle-change', $event)"
                    />
                </div>

                <div class="property-tax__child" v-if="showHandicapInput">
                    <label>
                        <span> Nombre de personne handicapés </span>
                    </label>

                    <Input
                        placeholder="Nombre"
                        name-input="disabledPersonDependent"
                        input-type="number"
                        @input="$emit('on-handle-change', $event)"
                    />
                </div>
            </div>
        </div>

        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span> Enfants à charge </span>
                        <InfoIcon
                            @click="$emit('on-modal-handled', 'childDepWal')"
                        />
                    </label>
                    <Switch
                        name="switchChild"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label=""
                        class="property-tax__form-item"
                        @handle-switch="$emit('on-handle-change', $event)"
                    />
                </div>

                <div class="property-tax__child" v-if="isShowDependentChildren">
                    <div class="reduction-subchoice">
                        <Radio
                            name="dependentChildrenCondition"
                            :element="([{
                                index: `n/a`,
                                value: -1,
                                label: 'Non specifié',
                            },...DEPENDENT_CHILDREN_CONDITION as any])"
                            @get-radio-input="$event => {$event && $emit('on-handle-change', {[($event?.target as any).name]: ($event?.target as any).value}); handleChoice($event)}"
                        />
                    </div>
                    <template v-if="isShowDependentChildrenNb">
                        <hr
                            class="text-[var(--color-gray)] mb-[10px] mt-[10px]"
                        />
                        <label>
                            <span> Nombre d'enfant </span>
                        </label>

                        <Input
                            placeholder="Nombre"
                            name-input="dependentChildrenNb"
                            input-type="number"
                            @input="$emit('on-handle-change', $event)"
                        />
                    </template>
                </div>
            </div>
        </div>

        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span> Enfant handicapé à charge </span>
                        <InfoIcon
                            @click="
                                $emit('on-modal-handled', 'invalidChildDepWal')
                            "
                        />
                    </label>
                    <Switch
                        name="isDisabledChildrenCondition"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label=""
                        class="property-tax__form-item"
                        @handle-switch="$emit('on-handle-change', $event)"
                    />
                </div>

                <div
                    class="property-tax__child"
                    v-if="isShowDisabledChildrenCondition"
                >
                    <div class="reduction-subchoice">
                        <Radio
                            name="disabledChildrenCondition"
                            :element="([{
                                index: `n/a`,
                                value: -1,
                                label: 'Non specifié',
                            },...DISABLED_CHILDREN_CONDITION as any])"
                            @get-radio-input="$event => {$event && $emit('on-handle-change', {[($event?.target as any).name]: ($event?.target as any).value}); handleChoice($event)}"
                        />
                    </div>
                    <template v-if="isShowDisabledChildrenConditionNb">
                        <hr
                            class="text-[var(--color-gray)] mb-[10px] mt-[10px]"
                        />
                        <label>
                            <span> Nombre d'enfant </span>
                        </label>

                        <Input
                            placeholder="Nombre"
                            name-input="disabledChildrenNb"
                            input-type="number"
                            @input="$emit('on-handle-change', $event)"
                        />
                    </template>
                </div>
            </div>
        </div>

        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span>
                            Autre personne à charge de votre famille ou de la
                            famille de votre conjoint, de votre cohabitant légal
                            ou de votre concubin jusqu’au 2ème degré de parenté
                            (ex. : un parent âgé à charge).
                        </span>
                    </label>
                    <Switch
                        name="isOtherDependentOfYourFamilyNb"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label=""
                        class="property-tax__form-item"
                        @handle-switch="$emit('on-handle-change', $event)"
                    />
                </div>
                <div
                    class="property-tax__child"
                    v-if="isShowOtherDependentOfYourFamilyNb"
                >
                    <label>
                        <span> Nombre de personne </span>
                    </label>

                    <Input
                        placeholder="Nombre"
                        name-input="otherDependentOfYourFamilyNb"
                        input-type="number"
                        @input="$emit('on-handle-change', $event)"
                    />
                </div>
            </div>
        </div>

        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span> Immeuble « improductif » </span>
                    </label>
                    <Switch
                        name="isUnproductivityDuration"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label=""
                        class="property-tax__form-item"
                        @handle-switch="$emit('on-handle-change', $event)"
                    />
                </div>
                <div class="property-tax__child" v-if="unproductivityDuration">
                    <label>
                        <span> Nombre de mois d’improductivité </span>
                    </label>

                    <Input
                        placeholder="Nombre"
                        name-input="unproductivityDuration"
                        input-type="number"
                        @input="$emit('on-handle-change', $event)"
                    />
                </div>
            </div>
        </div>
    </div>
    <div v-else class="relative h-[200px] loading">
        <Loader />
    </div>
</template>
<script lang="ts" setup>
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import PrecompteService from '@/services/PrecompteServices';
    import { ref, onMounted } from 'vue';
    import useCmp from '../useCmp';

    let { InfoIcon, Input, Select, Switch } = useCmp();

    defineProps<{
        modesteHouse: Array<any>;
        showHandicapInput: boolean;
        childAllocatedFamily: any;
        unproductivityDuration: boolean;
        isShowDependentChildren: boolean;
        isShowDisabledChildrenCondition: boolean;
        isShowOtherDependentOfYourFamilyNb: boolean;
    }>();

    const isShowDependentChildrenNb = ref<boolean>(false);
    const isShowDisabledChildrenConditionNb = ref<boolean>(false);
    const isLoad = ref<boolean>(false);
    interface TypesPrecountConst {
        name: string;
        value: string | string[];
    }
    const DEPENDENT_CHILDREN_CONDITION = ref<TypesPrecountConst>();
    const DISABLED_CHILDREN_CONDITION = ref<TypesPrecountConst>();
    const CHILD_CONDITION_LABEL = [
        'Je vis avec l’autre parent de l’enfant ou je suis l’unique parent de l’enfant',
        `Enfant soumis à un régime d’autorité parentale conjointe et dont l’hébergement est réparti de manière égalitaire entre les parents (garde alternée`,
        `J’exerce l’autorité parentale sur l’enfant OU  j’en assume l’hébergement à titre principal`,
        `Je n’exerce pas l’autorité parentale sur l’enfant ou je n’en assume pas l’hébergement à titre principal`,
    ];

    onMounted(() => {
        getPrecountConst();
    });

    function handleChoice(evt: any) {
        console.log(evt);
        const { name } = evt.target;
        switch (name) {
            case 'dependentChildrenCondition':
                isShowDependentChildrenNb.value = true;
                break;
            case 'disabledChildrenCondition':
                isShowDisabledChildrenConditionNb.value = true;
                break;
        }
    }

    async function getPrecountConst() {
        isLoad.value = true;
        try {
            const res = (await PrecompteService.getPrecountConst()) as any[];
            DEPENDENT_CHILDREN_CONDITION.value = res
                .filter((item) => item.name === 'DEPENDENT_CHILDREN_CONDITION')
                .at(-1)
                .value.map((valueItem: string, i: number) => ({
                    index: `enfant-a-charge-${i}`,
                    value: valueItem,
                    label: CHILD_CONDITION_LABEL[i],
                }));
            DISABLED_CHILDREN_CONDITION.value = res
                .filter((item) => item.name === 'DISABLED_CHILDREN_CONDITION')
                .at(-1)
                .value.map((valueItem: string, i: number) => ({
                    index: `enfant-a-charge-${i}`,
                    value: valueItem,
                    label: CHILD_CONDITION_LABEL[i],
                }));
        } finally {
            isLoad.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    @import '@/assets/style/precompte.scss';
    .loading {
        &:deep() {
            .custom-loader {
                @apply bg-transparent;
            }
        }
    }
    table {
        border-collapse: collapse;
    }
    td,
    th {
        border: 1px solid var(--color-primary);
        @apply p-[10px];
    }
    th {
        @apply bg-gray;
    }
    .options {
        @apply bg-gray p-[10px];
        border-radius: 8px;
        &__label {
            font-weight: 400 !important;
        }
    }
    .reduction-subchoice {
        &__entry {
            @apply flex items-center gap-[10px] mb-[10px];
        }
        label {
            @apply m-0;
        }
    }
</style>
