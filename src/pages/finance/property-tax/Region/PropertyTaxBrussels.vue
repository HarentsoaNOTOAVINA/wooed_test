<script setup lang="ts">
    import useCmp from './useCmp';
    import Demande from './Demande/Demande.vue';
    import {separatorHandleFloat} from '@/utils/separator-number/SeparatorMiller'

    let {
        FinanceCard,
        InfoIcon,
        InfoModal,
        Input,
        InputDate,
        Loader,
        Paragraphe,
        Select,
        Switch,
        handleCalculate,
        handleChange,
        modalHandler,
        precountAmountHandler,
        modalType,
        isShowModal,
        finalDataForm,
        dataPrecount,
        modesteHouse,
        showHandicapInput,
        childAllocatedFamily,
        valueAmount,
    }: any = useCmp();

    
</script>

<template>
    <div class="tax__container">
        <InfoModal
            :modal-type="modalType"
            :is-show="isShowModal"
            @close-modal="
                () => {
                    isShowModal = false;
                }
            "
        />

        <FinanceCard
            label-title="Précompter immobilier"
            label-button="Calculer"
            @calculate="handleCalculate"
            :property-tax="finalDataForm"
            @on-send-property-tax-value-amount="precountAmountHandler"
        >
            <div
                v-if="!dataPrecount"
                class="relative h-full tax__container__loading"
            >
                <Loader />
            </div>
            <template v-else>
                <div class="property-tax__items">
                    <div class="property-tax__field-wrap">
                        <div class="property-tax__form-item-wrap">
                            <label>
                                <span> Montant de base </span>
                            </label>
                            <Paragraphe class="property-tax__basic-amount">
                                <span> {{separatorHandleFloat(dataPrecount.basicAmount) }} </span>
                                <span> € </span>
                            </Paragraphe>
                        </div>
                        <div class="property-tax__form-item-wrap">
                            <label>
                                <span> Prochaine échéance </span>
                            </label>
                            <InputDate
                                name="nextDueDate"
                                class="property-tax__form-item"
                                @handle-date-format-en="handleChange"
                            />
                        </div>
                    </div>
                </div>
                <hr class="__hr" />
                <div class="property-tax__items">
                    <!-- <Button class="property-tax__button"> Payement KBC </Button> -->
                    <Paragraphe class="property-tax__content">
                        J’ai droit à une réduction du précompte
                    </Paragraphe>
                </div>
                <hr class="__hr" />
                <div class="property-tax__items">
                    <div class="property-tax__form-item-wrap">
                        <label>
                            <span> Maison modeste </span>
                            <InfoIcon @click="modalHandler('modesteHouse')" />
                        </label>
                        <Select
                            name="modestHouse"
                            class="property-tax__form-item"
                            :options="modesteHouse"
                            @change-select="handleChange"
                        />
                    </div>
                    <div class="property-tax__form-item-wrap">
                        <div class="property-tax__haschild">
                            <div class="property-tax__child">
                                <label>
                                    <span>
                                        Personne/enfant handicapé(e) ou invalide
                                        de guerre
                                    </span>
                                    <InfoIcon
                                        @click="modalHandler('warInvalid')"
                                    />
                                </label>
                                <Switch
                                    name="handicapOrInvalid"
                                    checked-name="OUI"
                                    unchecked-name="NON"
                                    item-label=""
                                    class="property-tax__form-item p"
                                    @handle-switch="handleChange"
                                />
                            </div>

                            <div
                                class="property-tax__child"
                                v-if="showHandicapInput"
                            >
                                <label>
                                    <span> Nombre de personne handicapés </span>
                                </label>

                                <Input
                                    placeholder="Nombre"
                                    name-input="disabledPersonDependent"
                                    input-type="number"
                                    @input="handleChange"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="property-tax__form-item-wrap">
                        <div class="property-tax__haschild">
                            <div class="property-tax__child">
                                <label>
                                    <span>
                                        Enfants ouvrant le droit aux allocations
                                        familiales
                                    </span>
                                    <InfoIcon
                                        @click="modalHandler('childOpening')"
                                    />
                                </label>
                                <Switch
                                    name="switchChild"
                                    checked-name="OUI"
                                    unchecked-name="NON"
                                    item-label=""
                                    class="property-tax__form-item"
                                    @handle-switch="handleChange"
                                />
                            </div>

                            <div
                                class="property-tax__child"
                                v-if="childAllocatedFamily"
                            >
                                <label>
                                    <span> Nombre d'enfant </span>
                                </label>

                                <Input
                                    placeholder="Nombre"
                                    name-input="childrenEligibleForFamilyAllowanceNb"
                                    input-type="number"
                                    @input="handleChange"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Demande
                    v-if="valueAmount !== null"
                    :value-amount="valueAmount"
                    @on-modal-handled="modalHandler"
                />
            </template>
        </FinanceCard>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/style.scss';
    @import '@/assets/style/precompte.scss';
</style>
