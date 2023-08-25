<template>
    <div class="property-tax__items">
        <div class="property-tax__form-item-wrap">
            <label>
                <span> Maison modeste </span>
                <InfoIcon
                    @click="$emit('on-modal-handled', 'modesteHouseFlanders')"
                />
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
                                $emit('on-modal-handled', 'warInvalidFlanders')
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
                        <span>
                            Enfants ouvrant le droit aux allocations familiales
                        </span>
                        <InfoIcon
                            @click="
                                $emit(
                                    'on-modal-handled',
                                    'childOpeningFlanders'
                                )
                            "
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

                <div class="property-tax__child" v-if="childAllocatedFamily">
                    <label>
                        <span> Nombre d'enfant </span>
                    </label>

                    <Input
                        placeholder="Nombre"
                        name-input="childrenEligibleForFamilyAllowanceNb"
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
                        <span> Bâtiments économes en énergie </span>
                        <InfoIcon
                            @click="
                                $emit(
                                    'on-modal-handled',
                                    'efficientBuildingFlanders'
                                )
                            "
                        />
                    </label>
                    <Switch
                        name="efficientBuilding"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label=""
                        class="property-tax__form-item"
                        @handle-switch="$emit('on-handle-change', $event)"
                    />
                </div>
            </div>
        </div>

        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <div class="options" v-if="isShowEfficientBuilding">
                        <label>
                            <span> OPTIONS </span>
                        </label>
                        <div
                            class="flex gap-[10px] items-center"
                            v-for="item in efficientBuildingOptions"
                        >
                            <input
                                class="mb-[10px]"
                                name="efficientBuilding_option"
                                :value="item.value"
                                :key="item.value"
                                :id="item.id"
                                type="radio"
                                @change="
                                    () => {
                                        $emit(
                                            'handle-selected-efficient-building',
                                            item
                                        );
                                    }
                                "
                            /><label class="options__label" :for="item.id">{{
                                item.label
                            }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="choosenEb" class="choosen-result">
                <hr class="__hr mb-[10px] mt-[10px]" />
                <Paragraphe
                    ><span>maximaal E-peil bij nieuwbouw of gelijkgesteld</span
                    >: <strong>{{ choosenEb?.max_1 }}</strong></Paragraphe
                >
                <Paragraphe
                    ><span
                        >maximaal E-peil na ingrijpende energetische
                        renovatie</span
                    >: <strong>{{ choosenEb?.max_2 }}</strong></Paragraphe
                >
                <Paragraphe
                    ><span>Réduction</span>:
                    <strong>{{ choosenEb?.reduction }}</strong></Paragraphe
                >
                <Paragraphe
                    ><span>Durée de la réduction</span>:
                    <strong>{{ choosenEb?.duration }}</strong></Paragraphe
                >
                <hr class="__hr mt-[10px]" />
            </div>
        </div>

        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span>
                            Bien non bâtis situés dans une « VEN-gebied »
                        </span>
                        <InfoIcon
                            @click="
                                $emit('on-modal-handled', 'propertyNotBuild')
                            "
                        />
                    </label>
                    <Switch
                        name="propertyNotBuild"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label=""
                        class="property-tax__form-item"
                        @handle-switch="$emit('on-handle-change', $event)"
                    />
                </div>
            </div>
        </div>

        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span> Immeuble « improductif » </span>
                        <InfoIcon
                            @click="
                                $emit(
                                    'on-modal-handled',
                                    'isUnproductivityDuration'
                                )
                            "
                        />
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

        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span> Victimes de guerres </span>
                        <InfoIcon
                            @click="$emit('on-modal-handled', 'warVictim')"
                        />
                    </label>
                    <Switch
                        name="warVictim"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label=""
                        class="property-tax__form-item"
                        @handle-switch="$emit('on-handle-change', $event)"
                    />
                </div>
            </div>
        </div>

        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span>
                            woningen die door een erkend sociaal verhuurkantoor
                            worden gehuurd om doorverhuurd te worden
                        </span>
                        <InfoIcon
                            @click="
                                $emit(
                                    'on-modal-handled',
                                    'rentedByAgencySubletting'
                                )
                            "
                        />
                    </label>
                    <Switch
                        name="rentedByAgencySubletting"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label=""
                        class="property-tax__form-item"
                        @handle-switch="$emit('on-handle-change', $event)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import useCmp from '../useCmp';

    let {
        InfoIcon,
        Input,
        Select,
        Switch,
        Paragraphe,
    } = useCmp();

    defineProps<{
        modesteHouse: Array<any>;
        showHandicapInput: boolean;
        childAllocatedFamily: any;
        isShowEfficientBuilding: boolean;
        efficientBuildingOptions: Array<{
            id: string;
            value: string | number;
            label: string;
        }>;
        choosenEb: {
            max_1: string;
            max_2: string;
            reduction: string;
            duration: string;
            value: number;
            id: number;
        } | null;
        unproductivityDuration: boolean;
    }>();
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    @import '@/assets/style/precompte.scss';
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
</style>
