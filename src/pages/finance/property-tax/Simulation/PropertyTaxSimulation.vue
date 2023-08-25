<template>
    <div class="property-tax-simulation">
        <modal
            :is-show-modal="isShowResultSimulation"
            @on-back="isShowResultSimulation = false"
            title="RESULTAT DE LA SIMULATION"
        >
            <template #content>
                <div class="property-tax-simulation__modal">
                    <div>
                        <Paragraphe class="property-tax-simulation__modal__label">
                            Montant du précompte immobilier après réduction:
                        </Paragraphe>
                        <Paragraphe class="property-tax-simulation__modal__amount important">
                            {{
                                separatorHandleFloat(
                                    (
                                        amountResultSimulation.precountAmount as number
                                    )?.toFixed(2)
                                )
                            }} €
                        </Paragraphe>
                    </div>
                    <div>
                        <Paragraphe class="property-tax-simulation__modal__label">
                            Réduction:
                        </Paragraphe>
                        <Paragraphe class="property-tax-simulation__modal__amount">
                            {{
                                separatorHandleFloat(
                                    (
                                        amountResultSimulation.reductionAmount as number
                                    )?.toFixed(2)
                                )
                            }} €
                        </Paragraphe>
                    </div>
                </div>
                <div class="property-tax-simulation__modal__validate">
                    <Button @click="isShowResultSimulation = false"
                        >OK</Button
                    >
                </div>
            </template>
        </modal>
        <finance-card
            label-title="Simulation précompte"
            :field-required="true"
            label-button="Lancer la simulation"
            :precount-simulation="params"
            @on-send-property-tax-value-amount="getSimulationResult"
        >
            <div v-if="!isLoad" class="property-tax-simulation__content">
                <Input
                    name-input="address"
                    label="Adrèsse"
                    :required="true"
                    name="address"
                    id="address"
                    placeholder="Veuillez renseigner une addresse précise"
                />
                <div class="property-tax-simulation__content--col">
                    <Input
                        name-input="cadastralReturn"
                        label="Revenue cadastal"
                        input-type="number"
                        placeholder="€"
                        :required="true"
                        @input="handleChangeEntry"
                    />
                    <Input
                        label="Bâtiments économes en énergie"
                        name-input="energyEfficientBuildingReduction"
                        placeholder="€"
                        input-type="number"
                        @input="handleChangeEntry"
                    />
                </div>
                <Select
                    label="Maison modeste(%)"
                    name="modestHouse"
                    :options="MODEST_HOUSE_TYPES"
                    placeholder="Selectionnez"
                    @change-select="handleChangeEntry"
                />
                <Select
                    label="Biens classés(%)"
                    name="savedProperty"
                    :options="SAVED_PROPERTY_TYPES"
                    placeholder="Selectionnez"
                    @change-select="handleChangeEntry"
                />
                <div class="property-tax-simulation__content--col">
                    <Switch
                        name="handicapOrInvalid"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label="Personne/enfant handicapé(e) ou invalide de guerre"
                        @handle-switch="handleChangeEntry($event, true)"
                    />
                    <Input
                        v-if="isShowHiddenEntries.includes('handicapOrInvalid')"
                        label="Nombre de personne handicapés"
                        name-input="disabledPersonDependent"
                        placeholder="0"
                        input-type="number"
                        @input="handleChangeEntry"
                    />
                </div>
                <div class="property-tax-simulation__content--col">
                    <Switch
                        name="_childElForFam"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label="Enfants ouvrant le droit aux allocations familiales"
                        @handle-switch="handleChangeEntry($event, true)"
                    />
                    <Input
                        v-if="isShowHiddenEntries.includes('_childElForFam')"
                        label="Nombre d'enfant ouvrant le droit aux allocations familiales"
                        name-input="childrenEligibleForFamilyAllowanceNb"
                        placeholder="0"
                        input-type="number"
                        @input="handleChangeEntry"
                    />
                </div>
                <div class="property-tax-simulation__content--col">
                    <Switch
                        name="propertyNotBuild"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label="Bien non bâtis situés dans une « VEN-gebied »"
                        @handle-switch="handleChangeEntry"
                    />
                    <!-- <Switch
                        name="warVictim"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label="Enfants ouvrant le droit aux allocations familiales"
                        @handle-switch="handleChangeEntry"
                    /> -->
                </div>
                <Switch
                    name="rentedByAgencySubletting"
                    checked-name="OUI"
                    unchecked-name="NON"
                    item-label="woningen die door een erkend sociaal verhuurkantoor worden gehuurd om doorverhuurd te worden"
                    @handle-switch="handleChangeEntry"
                />
                <div class="property-tax-simulation__content--col">
                    <Switch
                        name="_dependentChild"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label="Enfants à charge"
                        @handle-switch="handleChangeEntry($event, true)"
                    />
                    <div
                        v-if="isShowHiddenEntries.includes('_dependentChild')"
                        class="property-tax-simulation__content--col__child"
                    >
                        <Radio
                            name="dependentChildrenCondition"
                            :element="(DEPENDENT_CHILDREN_CONDITION as any)"
                            @get-radio-input="handleChangeEntry($event, true)"
                        />
                        <hr class="mt-[10px] mb-[10px] text-gray" />
                        <Input
                            label="Nombre d'enfant"
                            name-input="dependentChildrenNb"
                            placeholder="0"
                            input-type="number"
                            @input="handleChangeEntry"
                        />
                    </div>
                </div>
                <div class="property-tax-simulation__content--col">
                    <Switch
                        name="_disabledChild"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label="Enfant handicapé à charge"
                        @handle-switch="handleChangeEntry($event, true)"
                    />
                    <div
                        v-if="isShowHiddenEntries.includes('_disabledChild')"
                        class="property-tax-simulation__content--col__child"
                    >
                        <Radio
                            name="disabledChildrenCondition"
                            :element="(DISABLED_CHILDREN_CONDITION as any)"
                            @get-radio-input="handleChangeEntry($event, true)"
                        />
                        <hr class="mt-[10px] mb-[10px] text-gray" />
                        <Input
                            label="Nombre d'enfant handicapé"
                            name-input="disabledChildrenNb"
                            placeholder="0"
                            input-type="number"
                            @input="handleChangeEntry"
                        />
                    </div>
                </div>

                <div class="property-tax-simulation__content--col">
                    <Switch
                        name="_otherDependent"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label="Autre personne à charge de votre famille ou de la famille de votre conjoint, de votre cohabitant légal ou de votre concubin jusqu’au 2ème degré de parenté (ex. : un parent âgé à charge)."
                        @handle-switch="handleChangeEntry($event, true)"
                    />
                    <div
                        v-if="isShowHiddenEntries.includes('_otherDependent')"
                        class="property-tax-simulation__content--col__child"
                    >
                        <Input
                            label="Nombre de personne"
                            name-input="otherDependentOfYourFamilyNb"
                            placeholder="0"
                            input-type="number"
                            @input="handleChangeEntry"
                        />
                    </div>
                </div>

                <div class="property-tax-simulation__content--col">
                    <Switch
                        name="_unproductivityDuration"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label="Immeuble « improductif »"
                        @handle-switch="handleChangeEntry($event, true)"
                    />
                    <div
                        v-if="
                            isShowHiddenEntries.includes(
                                '_unproductivityDuration'
                            )
                        "
                        class="property-tax-simulation__content--col__child"
                    >
                        <Input
                            label="Nombre de mois d’improductivité"
                            name-input="unproductivityDuration"
                            placeholder="0"
                            input-type="number"
                            @input="handleChangeEntry"
                        />
                    </div>
                </div>
            </div>

            <div v-else class="property-tax-simulation__load">
                <Loader />
            </div>
        </finance-card>
    </div>
</template>
<script lang="ts" setup>
    import FinanceCard from '../../components/FinanceCard/FinanceCard.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import { onMounted, ref, watch } from 'vue';
    import PrecompteService from '@/services/PrecompteServices';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import useGeocode from '@/composables/useGeocode';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';

    const amountResultSimulation = ref<{
        precountAmount?: string | number;
        reductionAmount?: string | number;
    }>({});
    const isShowResultSimulation = ref<boolean>(false);
    const loactionParams = ref<any>({});
    const currentLatLng = ref<{ lat: number; lng: number }>();
    const defaultLatLng = ref<ILocationParams>({
        lat: 50.824446059264694,
        lng: 4.38640342821515,
    });
    const { geocodeResult } = useGeocode(
        defaultLatLng as any,
        currentLatLng as any
    );
    const isLoad = ref<boolean>(false);
    const { autocompleteResult } = useAutoComptetion('address', isLoad as any);

    interface TypesPrecountConst {
        name: string;
        value: string | string[];
    }
    const isShowHiddenEntries = ref<string[]>([]);
    const DEPENDENT_CHILDREN_CONDITION = ref<TypesPrecountConst>();
    const DISABLED_CHILDREN_CONDITION = ref<TypesPrecountConst>();
    const CHILD_CONDITION_LABEL = [
        'Je vis avec l’autre parent de l’enfant ou je suis l’unique parent de l’enfant',
        `Enfant soumis à un régime d’autorité parentale conjointe et dont l’hébergement est réparti de manière égalitaire entre les parents (garde alternée`,
        `J’exerce l’autorité parentale sur l’enfant OU  j’en assume l’hébergement à titre principal`,
        `Je n’exerce pas l’autorité parentale sur l’enfant ou je n’en assume pas l’hébergement à titre principal`,
    ];
    const MODEST_HOUSE_TYPES = ref<{ label: string; value: number }[]>([
        {
            label: 'N/A',
            value: -1,
        },
    ]);
    const SAVED_PROPERTY_TYPES = ref<{ label: string; value: number }[]>([
        {
            label: 'N/A',
            value: -1,
        },
    ]);
    const params = ref<any>({});

    watch(
        () => params.value,
        (v) => {
            console.log(v);
        },
        { deep: true }
    );
    watch(
        () => autocompleteResult.value,
        (v) => {
            defaultLatLng.value = { lat: v.lat, lng: v.lng };
            console.log(v.lat, v.lng);
        },
        { deep: true }
    );

    watch(
        () => geocodeResult.value,
        (v) => {
            if (v && v.length) {
                v[0].address_components.forEach((item: any) => {
                    extractLocationDetails(item);
                });
            }
        },
        { immediate: true, deep: true }
    );

    watch(
        () => loactionParams.value,
        (v) => {
            params.value = {
                ...params.value,
                region: v.region,
                municipality: v.municipality,
            };
        },
        { deep: true }
    );

    onMounted(() => {
        getPrecountConst();
    });

    function getSimulationResult(res: any) {
        isShowResultSimulation.value = true;
        amountResultSimulation.value = {
            ...amountResultSimulation,
            ...res,
        };
    }

    function filterEntry(res: any[], name: string) {
        return res
            .filter((item) => item.name === name)
            .at(-1)
            .value.map((value: string, i: number) => ({
                label: `${value}%`,
                value,
            }));
    }

    async function getPrecountConst() {
        isLoad.value = true;
        try {
            const res = (await PrecompteService.getPrecountConst()) as any[];
            MODEST_HOUSE_TYPES.value = [
                ...MODEST_HOUSE_TYPES.value,
                ...filterEntry(res, 'MODEST_HOUSE_TYPES'),
            ];
            SAVED_PROPERTY_TYPES.value = [
                ...SAVED_PROPERTY_TYPES.value,
                ...filterEntry(res, 'SAVED_PROPERTY_TYPES'),
            ];
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

    function handleChangeEntry(evt: any, haveHidden?: boolean) {
        let [name, value] = Object.entries(evt)[0];
        /**
         * check if returned value is nativeEvent
         */
        if (Object.keys(evt).length > 2 && evt.hasOwnProperty('target')) {
            name = evt.target.name;
            value = evt.target.value;
        }
        handleParams(name, value);
        haveHidden && handleHiddenEntry(name);
    }

    function extractLocationDetails(locationObj: {
        long_name: string;
        short_name: string;
        types: Array<string>;
    }) {
        switch (true) {
            case locationObj.types.includes('country'):
                loactionParams.value = {
                    ...loactionParams.value,
                    country: locationObj.long_name,
                    codeCountry: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('locality'):
                loactionParams.value = {
                    ...loactionParams.value,
                    municipality: locationObj.long_name,
                    codeMunicipality: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('administrative_area_level_1'):
                loactionParams.value = {
                    ...loactionParams.value,
                    region: locationObj.long_name,
                    codeRegion: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('postal_code'):
                loactionParams.value = {
                    ...loactionParams.value,
                    postalCode: locationObj.long_name,
                };
                break;
        }
    }
    function handleParams(name: string, value: unknown) {
        switch (name) {
            case 'modestHouse':
                if (value === -1) {
                    const { modestHouse, ...rest } = params.value;
                    params.value = { ...rest };
                } else {
                    params.value = {
                        ...params.value,
                        [name]: value,
                    };
                }
                break;
            case 'savedProperty':
                if (value === -1) {
                    const { savedProperty, ...rest } = params.value;
                    params.value = { ...rest };
                } else {
                    params.value = {
                        ...params.value,
                        [name]: value,
                    };
                }
                break;
            case '_otherDependent':
                if (!value) {
                    const { otherDependentOfYourFamilyNb, ...rest } =
                        params.value;
                    params.value = { ...rest };
                }
                break;
            case '_unproductivityDuration':
                if (!value) {
                    const { unproductivityDuration, ...rest } = params.value;
                    params.value = { ...rest };
                }
                break;
            case '_dependentChild':
                if (!value) {
                    /**
                     * reset value when switch off
                     */
                    const {
                        dependentChildrenCondition,
                        dependentChildrenNb,
                        ...rest
                    } = params.value;
                    params.value = { ...rest };
                } else {
                    params.value = {
                        ...params.value,
                        ['dependentChildrenCondition']:
                            'dependent_children_with_parent',
                    };
                }
                break;
            case '_disabledChild':
                if (!value) {
                    /**
                     * reset value when switch off
                     */
                    const {
                        disabledChildrenCondition,
                        disabledChildrenNb,
                        ...rest
                    } = params.value;
                    params.value = { ...rest };
                } else {
                    params.value = {
                        ...params.value,
                        ['disabledChildrenCondition']:
                            'disabled_children_with_parent',
                    };
                }
                break;
            default:
                /**
                 * Attribute name with "_" is not need to be post
                 */
                if (!name.startsWith('_')) {
                    params.value = {
                        ...params.value,
                        [name]: value,
                    };
                }
                break;
        }
    }
    function handleHiddenEntry(name: string) {
        isShowHiddenEntries.value.includes(name)
            ? (isShowHiddenEntries.value = [
                  ...isShowHiddenEntries.value.filter(
                      (value: string) => value !== name
                  ),
              ])
            : isShowHiddenEntries.value.push(name);
    }
</script>
<style lang="scss" scoped>
    .property-tax-simulation {
        @apply w-full;
        &__content {
            @apply mt-[10px];
            &--col {
                @apply block md:flex gap-[10px];
                * {
                    @apply w-full;
                }
            }
            :deep() {
                .switch {
                    @apply mb-[25px];
                }
            }
        }
        &__load {
            @apply h-full relative;
            :deep() {
                .custom-loader {
                    @apply bg-[#fff];
                }
            }
        }
        &__modal {
            @apply rounded-[8px] px-[5px] py-[10px] flex flex-col gap-[20px] border text-center border-solid border-[var(--color-gray)];
            &__label {
                @apply text-[20px];
            }
            &__amount {
                @apply text-[24px] text-[var(--color-secondary)] font-semibold;
            }
            &__validate {
                @apply text-right mt-[10px];
            }
            .important {
                @apply text-[32px]
            }
        }
    }
</style>
