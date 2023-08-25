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
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Droit d'enregistrement</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    creditResultData?.registrationRight
                                        ? separatorHandleFloat(
                                              creditResultData?.registrationRight.toFixed(
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
                                label="Annexe"
                                name="annexe"
                                @handleCheck="handleChange"
                            />
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    creditResultData?.annexeResult
                                        ? separatorHandleFloat(
                                              creditResultData?.annexeResult.toFixed(
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
                        label="Droits d'inscription hypothécaire"
                        weight="600"
                    />
                    <div class="preview__simple__body__section--multiple">
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Droits d'inscription hypothécaire</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    creditResultData?.registrationRightHypotecaire
                                        ? separatorHandleFloat(
                                              creditResultData?.registrationRightHypotecaire.toFixed(
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
                        label="Salaire d'inscription hypothécaire"
                        weight="600"
                    />
                    <div class="preview__simple__body__section--multiple">
                        <CheckBox
                            :return-boolean="true"
                            label="Inscription dans un second bureau"
                            @handleCheck="handleChange"
                            name="registrationInASecondOffice"
                        />
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Salaire d'inscription hypothécaire</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    creditResultData?.registrationSalaryHypotecaire
                                        ? separatorHandleFloat(
                                              creditResultData?.registrationSalaryHypotecaire.toFixed(
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
                                    creditResultData?.honoraire
                                        ? separatorHandleFloat(
                                              creditResultData?.honoraire.toFixed(
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
                            <CheckBox
                                :return-boolean="true"
                                label="Prêt social"
                                @handleCheck="handleChange"
                                name="prSocial"
                            />
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
                                    creditResultData?.miscellaneousCosts
                                        ? separatorHandleFloat(
                                              creditResultData?.miscellaneousCosts.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <CheckBox
                            :return-boolean="true"
                            label="Opération accéssoire"
                            @handleCheck="handleChange"
                            name="accessoryOperation"
                        />
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
                                    creditResultData?.writingRate
                                        ? separatorHandleFloat(
                                              creditResultData?.writingRate.toFixed(
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
                                    creditResultData?.eRegistration
                                        ? separatorHandleFloat(
                                              creditResultData?.eRegistration.toFixed(
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
                                    creditResultData?.hypotecaire
                                        ? separatorHandleFloat(
                                              creditResultData?.hypotecaire.toFixed(
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
                                    creditResultData?.hypoSearchResult
                                        ? separatorHandleFloat(
                                              creditResultData?.hypoSearchResult.toFixed(
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
                                label="Rech. Hypo. post act"
                                name="rechHypo"
                                @handleCheck="handleChange"
                            />
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    creditResultData?.rechHypoResult
                                        ? separatorHandleFloat(
                                              creditResultData?.rechHypoResult.toFixed(
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
                                label="2ème bien mis en hypothèques, frais/vacations"
                                name="secondPropertiesInHypotec"
                                @handleCheck="handleChange"
                            />
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    creditResultData?.secondPropertiesInHypotecResult
                                        ? separatorHandleFloat(
                                              creditResultData?.secondPropertiesInHypotecResult.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            ></Paragraphe
                        >
                        <!-- Opération isolé - MODAL -->
                        <Paragraphe class="preview__simple__body__elt"
                            ><span class="preview__simple__body__elt__label"
                                >Total</span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    creditResultData?.totalDebours
                                        ? separatorHandleFloat(
                                              creditResultData?.totalDebours.toFixed(
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
                                    creditResultData?.taxableBasis
                                        ? separatorHandleFloat(
                                              creditResultData?.taxableBasis.toFixed(
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
                                    creditResultData?.tva
                                        ? separatorHandleFloat(
                                              creditResultData?.tva.toFixed(
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
                                    creditResultData?.provision
                                        ? separatorHandleFloat(
                                              creditResultData?.provision.toFixed(
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
                                    creditResultData?.interventionFundNotorial
                                        ? separatorHandleFloat(
                                              creditResultData?.interventionFundNotorial.toFixed(
                                                  2
                                              ) as string
                                          )
                                        : 0
                                }}</span>
                                <span>€</span></span
                            >
                            <span class="preview__simple__body__elt__amount"
                                ><span>{{
                                    creditResultData?.valuePercent
                                        ? separatorHandleFloat(
                                              creditResultData?.valuePercent.toFixed(
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
    import { onMounted, PropType, ref } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Financial from '@/services/FinancialService';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    const props = defineProps({
        creditResult: {
            type: Object as PropType<TypeCreditResult>,
        },
    });
    const creditResultData = ref<any>({ ...props.creditResult });

    const params = ref<any>({
        ...props.creditResult,
    });

    onMounted(() => {
        console.log(props.creditResult);
    });

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
            const { data } = await Financial.postNewCredit(newParams);
            creditResultData.value = data;
        } catch (error) {
            console.error(error);
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/style/calcul_sale.scss';
</style>
