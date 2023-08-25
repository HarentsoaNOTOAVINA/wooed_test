<template>
    <div class="pv-result">
        <div class="pv-result-fr" v-if="country === 'France'">
            <Check size="sm" />
            <Paragraphe class="pv-result-fr__content">
                Pour la vente de votre bien, le montant de l’impôt dû au titre
                de la plus-value immobilière est estimé à
                <strong>{{
                    separatorHandleFloat((+(pvResult.tax as any)).toFixed(2))
                }} €</strong
                > . * Il s’agit d’une estimation du montant final, lequel sera
                déterminé par votre notaire. Il ne tient pas compte des droits
                dus au titre des prélèvements sociaux.
            </Paragraphe>
        </div>
        <template v-else>
            <div v-for="(item, index) in plusValueData" :key="index">
                <div class="pv-result__item">
                    <span>{{ item.label }}</span>
                    <span
                        >{{
                            separatorHandleFloat(
                                (+(item.value as any)).toFixed(2)
                            )
                        }}
                        €</span
                    >
                </div>

                <div class="pv-result__item__child" v-if="item.taxData">
                    <div
                        class="pv-result__item__child__elt"
                        v-for="(tax, index) in item.taxData"
                        :key="index"
                    >
                        <span>{{ tax.name }}</span>
                        <span
                            >{{
                                separatorHandleFloat(
                                    (+(tax.value as any)).toFixed(2)
                                )
                            }}
                            €</span
                        >
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';
    import { ref } from 'vue';
    import Check from '@/components/Icon/Check.vue';

    const props = defineProps<{
        pvResult?: any;
        country?: string;
    }>();
    const plusValueData = ref([
        {
            label: 'Prix de revente',
            value: props.pvResult.resellPrice,
        },
        {
            label: 'Taxation sur les plus values',
            value: props.pvResult.tax,
            taxData: [
                {
                    name: '- Prix de revente',
                    value: props.pvResult.resellPrice,
                },
                // {
                //     name: "- Prix d'achat de bien aliénés",
                //     value: props.pvResult.price,
                // },
                // {
                //     name: '- Frais afférents à cette acquisition',
                //     value: props.pvResult.computeRetainer,
                // },
                {
                    name: '- Montant prévisionnel des travaux',
                    value: props.pvResult.workPrice,
                },
                {
                    name: '- Prix de construction hors TVA',
                    value: props.pvResult.buildPrice,
                },
                {
                    name: "- Commission de l'agence immobilière",
                    value: props.pvResult.agency,
                },
                // {
                //     name: '- Extra pour no habbackResult',
                //     value: props.pvResult.notHabitationPropreExtra,
                // },
                {
                    name: '- MONTANT IMPOSABLE',
                    value: props.pvResult.taxableIncome,
                },
                {
                    name: '- Impôt dû',
                    value: props.pvResult.tax,
                },
            ],
        },

        // {
        //     label: "Prix d'achat des biens Aliénés",
        //     value: props.pvResult.price,
        // },
        // {
        //     label: 'Frais afférent à cette acquisition',
        //     value: props.pvResult.computeRetainer,
        // },
        {
            label: 'Prix de la construction hors TVA',
            value: props.pvResult.buildPrice,
        },
        {
            label: 'Montant prévisionnel des travaux',
            value: props.pvResult.workPrice,
        },
        // {
        //     label: "Frais de mainlevee de l'hypotheque",
        //     value: props.pvResult.mainLevee,
        // },
        {
            label: 'Frais de delivrance',
            value: props.pvResult.deliveryFee,
        },
        {
            label: 'Frais de Redaction du compromis de vent',
            value: props.pvResult.writingFee,
        },
        {
            label: 'Indemnite de remploi',
            value: props.pvResult.indemniteRemploi,
        },
        {
            label: "Commission de l'agence immobilière",
            value: props.pvResult.agencyFee,
        },
        {
            label: 'FRAIS DE PUBLICITE',
            value: props.pvResult.addFee,
        },
        {
            label: '+Si revente dans les 2ans',
            value: props.pvResult.reselBonus,
        },
        {
            label: 'BENEFICE NET',
            value: props.pvResult.income,
        },
    ]);
</script>
<style lang="scss" scoped>
    .pv-result {
        @apply mt-[10px];
        &__item {
            @apply p-[10px] flex justify-between border-b border-solid border-b-[var(--color-gray)];
            span:first-child {
                @apply font-semibold;
            }
            span:last-child {
                @apply text-[var(--color-primary)];
            }
            &__child {
                @apply py-[20px] pl-[20px];
                &__elt {
                    @apply flex justify-between;
                    span {
                        @apply text-[var(--color-stroke-gray)];
                    }
                }
            }
        }
        &-fr {
            &__content {
                @apply text-[#FFF] text-center;
            }
            @apply text-justify bg-[var(--color-secondary)] p-[10px] rounded-[8px] flex justify-center flex-col items-center;
            strong {
                @apply text-[var(--color-primary)]
            }
        }
    }
</style>
