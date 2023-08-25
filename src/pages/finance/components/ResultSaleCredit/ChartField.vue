<template>
    <div class="preview__simple">
        <div class="preview__simple">
            <div class="preview__simple__body">
                <div class="preview__simple__body__section">
                    <AppTitle
                        type="h3"
                        label="Droit d'enregistrement"
                        weight="600"
                    />
                    <div class="preview__simple__body__section--multiple">
                        <div
                            class="pl-[10px]"
                            v-for="(item, index) in regionElt"
                            :key="index"
                        >
                            <div
                                class="flex justify-between items-center"
                                v-if="item.result"
                            >
                                <Select
                                    v-if="item.type === 'select'"
                                    :placeholder="item.options[0].label"
                                    :options="item.options"
                                    :name="item.name"
                                    :required="true"
                                    class="w-[50%]"
                                    @change-select="handleChange"
                                />
                                <Paragraphe class="sale-content__choice__name">
                                    <span
                                        class="preview__simple__body__elt__amount"
                                        ><span>{{
                                            saleResultData[item.result]
                                                ? separatorHandleFloat(
                                                      saleResultData[
                                                          item.result
                                                      ].toFixed(2) as string
                                                  )
                                                : 0
                                        }}</span>
                                        <span>€</span></span
                                    >
                                </Paragraphe>
                            </div>
                            <Select
                                v-if="item.type === 'select' && !item.result"
                                :placeholder="item.options[0].label"
                                :options="item.options"
                                :name="item.name"
                                :required="true"
                                @change-select="handleChange"
                            />
                            <Input
                                v-if="item.type === 'input'"
                                :label="item.label"
                                :name-input="item.name"
                                :required="true"
                                placeholder="0"
                                @change="handleChange"
                            />
                            <CheckBox
                                v-if="item.type === 'checkbox'"
                                :name="item.name"
                                :return-boolean="true"
                                :label="item.label"
                                :isChecked="item.checked"
                                @handleCheck="handleChange"
                            />
                        </div>
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Droit d'enregistrement</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.recordingRight
                                        ? separatorHandleFloat(
                                              saleResultData?.recordingRight.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                    </div>
                </div>
                <div class="preview__simple__body__section">
                    <AppTitle type="h3" label="Transcription" weight="600" />
                    <div class="preview__simple__body__section--multiple">
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Transcription</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.transcription
                                        ? separatorHandleFloat(
                                              saleResultData?.transcription.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                    </div>
                </div>

                <div class="preview__simple__body__section">
                    <AppTitle type="h3" label="Honoraires" weight="600" />
                    <div class="preview__simple__body__section--multiple">
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Honoraires</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.honoraire
                                        ? separatorHandleFloat(
                                              saleResultData?.honoraire.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <div class="pl-[10px] flex flex-col gap-[18px]">
                            <CheckBox
                                :return-boolean="true"
                                label="Réduction pour habitation unique"
                                @handleCheck="handleChange"
                                name="discountForSingleDwelling"
                            />
                            <div class="flex justify-between items-end">
                                <CheckBox
                                    :return-boolean="true"
                                    label="Prêt social"
                                    @handleCheck="handleChange"
                                    name="prSocial"
                                />
                                <Paragraphe class="sale-content__choice__name">
                                    <span
                                        class="preview__simple__body__elt__amount"
                                        ><span>{{
                                            saleResultData?.prSocialResult
                                                ? separatorHandleFloat(
                                                      saleResultData?.prSocialResult.toFixed(
                                                          2
                                                      ) as string
                                                  )
                                                : 0
                                        }}</span>
                                        <span>€</span></span
                                    >
                                </Paragraphe>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="preview__simple__body__section">
                    <AppTitle
                        type="h3"
                        label="Frais divers, forfait légal"
                        weight="600"
                    />
                    <div class="preview__simple__body__section--multiple">
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Frais divers, forfait légal</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.miscellaneousCosts
                                        ? separatorHandleFloat(
                                              saleResultData?.miscellaneousCosts.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                    </div>
                </div>

                <div class="preview__simple__body__section">
                    <AppTitle
                        type="h3"
                        label="DEBOURS - VACATIONS"
                        weight="600"
                    />
                    <div class="preview__simple__body__section--multiple">
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Droits d'écriture (taxe)</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.writingRate
                                        ? separatorHandleFloat(
                                              saleResultData?.writingRate.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >E-regis, forfait Naban - eNot</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.eRegistration
                                        ? separatorHandleFloat(
                                              saleResultData?.eRegistration.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Recherche hypothécaire</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.hypotecaire
                                        ? separatorHandleFloat(
                                              saleResultData?.hypotecaire.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <Paragraphe class="preview__simple__body__elt">
                            <CheckBox
                                :return-boolean="true"
                                label="Rech. Hypo. Compl (sauf Refresh)"
                                name="hypoSearch"
                                @handleCheck="handleChange"
                            />
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.hypoSearchResult
                                        ? separatorHandleFloat(
                                              saleResultData?.hypoSearchResult.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <Paragraphe class="preview__simple__body__elt">
                            <Input
                                name-input="gagesRegister"
                                input-type="number"
                                class="w-[50%]"
                                placeholder="Consultation du registre des gages"
                                @change="handleChange"
                            />
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.gagesRegister
                                        ? separatorHandleFloat(
                                              saleResultData?.gagesRegister.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <Paragraphe class="preview__simple__body__elt">
                            <CheckBox
                                :return-boolean="true"
                                label="Consultation avis de saisies"
                                name="noticeConsultation"
                                @handleCheck="handleChange"
                            />
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.noticeConsultationResult
                                        ? separatorHandleFloat(
                                              saleResultData?.noticeConsultationResult.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <Paragraphe class="preview__simple__body__elt">
                            <CheckBox
                                :return-boolean="true"
                                label="Apport anticipé au patrimoine commun"
                                name="advanceContribution"
                                @handleCheck="handleChange"
                            />
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.advanceContributionResult
                                        ? separatorHandleFloat(
                                              saleResultData?.advanceContributionResult.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <Paragraphe class="preview__simple__body__elt">
                            <CheckBox
                                :return-boolean="true"
                                label="Clause d'accroissement"
                                name="growthClause"
                                @handleCheck="handleChange"
                            />
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.growthClauseResult
                                        ? separatorHandleFloat(
                                              saleResultData?.growthClauseResult.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Comptes entre acquéreurs, reconnaissance de
                                dette (barème "G")</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.accountBetweenAquirers
                                        ? separatorHandleFloat(
                                              saleResultData?.accountBetweenAquirers.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <Paragraphe class="preview__simple__body__elt"
                            >
                            <CheckBox
                                :return-boolean="true"
                                label="Rech. Hypo. post act"
                                name="rechHypo"
                                @handleCheck="handleChange"
                            />
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.rechHypoResult
                                        ? separatorHandleFloat(
                                              saleResultData?.rechHypoResult.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Total</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.totalDebours
                                        ? separatorHandleFloat(
                                              saleResultData?.totalDebours.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                    </div>
                </div>

                <div class="preview__simple__body__section">
                    <AppTitle
                        type="h3"
                        label="Salaire horaire de négociations et difficultés"
                        weight="600"
                    />
                    <div class="preview__simple__body__section--multiple">
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Salaire horaire de négociations et
                                difficultés</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.negociationSalaryResult
                                        ? separatorHandleFloat(
                                              saleResultData?.negociationSalaryResult.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : (0.0).toString()
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <div class="pl-[10px]">
                            <Select
                                :placeholder="salaireOptions[0].label"
                                :options="salaireOptions"
                                name="negociationSalary"
                                @change-select="handleChange"
                            />
                            <Input
                                name-input="negociationSalaryValue"
                                input-type="number"
                                placeholder="0"
                                @change="handleChange"
                            />
                        </div>
                    </div>
                </div>

                <div class="preview__simple__body__section">
                    <AppTitle
                        type="h3"
                        label="TVA, base taxable"
                        weight="600"
                    />
                    <div class="preview__simple__body__section--multiple">
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Base taxable</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.taxableBasis
                                        ? separatorHandleFloat(
                                              saleResultData?.taxableBasis.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >TVA</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.tva
                                        ? separatorHandleFloat(
                                              saleResultData?.tva.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                    </div>
                </div>
                <div class="preview__simple__body__section">
                    <AppTitle type="h3" label="PROVISION" weight="600" />
                    <div class="preview__simple__body__section--multiple">
                        <div
                            class="flex justify-between items-end bg-white p-[10px] rounded-[4px]"
                        >
                            <AppTitle
                                class="title"
                                type="h4"
                                label="PROVISION"
                            />
                            <Paragraphe class="sale-content__choice__name">
                                {{
                                    saleResultData?.provision
                                        ? separatorHandleFloat(
                                              saleResultData?.provision.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}
                            </Paragraphe>
                        </div>

                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Intervention fonds notarial</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.interventionFundNotorial
                                        ? separatorHandleFloat(
                                              saleResultData?.interventionFundNotorial.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    saleResultData?.valuePercent
                                        ? separatorHandleFloat(
                                              saleResultData?.valuePercent.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>%</span></span
                            ></Paragraphe
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';
    import AppTitle from '@/components/Common/Title/Title.vue';
    import { computed, PropType, ref, watch } from 'vue';
    import useSaleConstant from '@/pages/finance/Sale/Composable/useSaleConstant';
    import { useStore } from 'vuex';
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Financial from '@/services/FinancialService';
    const store = useStore();
    const {
        walloniaElt,
        bruxelleElement,
        luxembourgElement,
        flandreElement,
        isLoad,
    } = useSaleConstant();

    const props = defineProps({
        saleResult: {
            type: Object as PropType<TypesSaleResult>,
        },
    });

    const saleResultData = ref<any>({ ...props.saleResult });

    const region = store.getters['FinancialModule/getChoosenProperty'].region;
    const country = store.getters['FinancialModule/getChoosenProperty'].country;
    const params = ref<any>({
        ...props.saleResult,
    });

    const salaireOptions: Array<any> = [
        {
            label: '100.00 €',
            value: 1,
        },
        {
            label: '125.00 €',
            value: 2,
        },
        {
            label: '150.00 €',
            value: 3,
        },
        {
            label: '200.00 €',
            value: 4,
        },
        {
            label: '300.00 €',
            value: 5,
        },
    ];

    const regionElt = computed(() => {
        switch (country) {
            case 'Belgique':
                switch (region) {
                    case 'Bruxelles':
                    case 'Bruxelles-Capitale':
                        return flandreElement.value;
                        // return bruxelleElement.value;
                    case 'Région Wallonne':
                        return walloniaElt.value;
                    case 'Vlaams Gewest':
                        return flandreElement.value;
                }
                break;
            case 'Luxembourg':
                return luxembourgElement;
        }
    });

    watch(
        () => saleResultData,
        (v) => {
            console.log('resultdata = ', saleResultData);
        },
        { immediate: true, deep: true }
    );

    async function handleChange(value: any) {
        // Convertit les valeurs en float
        Object.keys(value).forEach((key) => {
            if (typeof value[key] === 'string') {
                value[key] = parseFloat(value[key]);
            }
        });

        params.value = {
            ...params.value,
            ...value,
        };
        const { id, ...newParams } = params.value;
        try {
            const { data } = await Financial.postNewSale(newParams);
            saleResultData.value = data;
        } catch (error) {
            console.error(error);
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/style/calcul_sale.scss';
</style>
