<template>
    <div class="preview">
        <!-- CHAMP -->
        <ChartField :sale-result="saleResult" v-if="!isCredit" />

        <ChartCreditField :credit-result="creditResult" v-else />

        <Paragraphe class="preview__simple__body__elt mt-[10px] total"
            ><span class="preview__simple__body__elt__label"
                >Total général</span
            >
            <span class="preview__simple__body__elt__amount" v-if="!isCredit"
                >
                <span>{{
                    separatorHandleFloat(
                        (
                            (saleResult?.provision as number)
                        ).toFixed(2) as string
                    )
                }}</span>
                <sup>€</sup></span
            >
            <span class="preview__simple__body__elt__amount" v-else
                ><span>{{
                    separatorHandleFloat(
                        creditResult?.provision.toFixed(2) as string
                    )
                }}</span>
                <sup>€</sup></span
            >
        </Paragraphe>
        <!-- <div class="chart-actions" v-if="!isCredit">
            <Button
                :class="currentGraphSet === 'all' ? 'light' : undefined"
                @click="assignGraph('all')"
                >Tous</Button
            >
            <Button
                :class="currentGraphSet === 'tax' ? 'light' : undefined"
                @click="assignGraph('tax')"
                >Tax</Button
            >
            <Button
                :class="currentGraphSet === 'fees' ? 'light' : undefined"
                @click="assignGraph('fees')"
                >Frais</Button
            >
        </div>
        <div class="chart-actions" v-else>
            <Button
                :class="currentGraphSet === 'all' ? 'light' : undefined"
                @click="assignCreditGraph('all')"
                >Tous</Button
            >
            <Button
                :class="currentGraphSet === 'tax' ? 'light' : undefined"
                @click="assignCreditGraph('tax')"
                >Tax</Button
            >
            <Button
                :class="currentGraphSet === 'fees' ? 'light' : undefined"
                @click="assignCreditGraph('fees')"
                >Frais</Button
            >
        </div> -->

        <!-- GRAPH -->
        <!-- <div class="preview__chart-view">
            <ChartGraph :chart-data="chartData" :height="300" :width="200" />
        </div> -->
    </div>
</template>
<script lang="ts" setup>
    import { ref, PropType, onMounted } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';
    import Button from '@/components/Common/Button/Button.vue';
    import ChartGraph from './ChartGraph.vue';
    import ChartField from './ChartField.vue';
    import ChartCreditField from './ChartCreditField.vue';

    // SALE
    const totalityFeesChartView = ref<Array<Array<number | string>>>([]);
    const totalityAllChartView = ref<Array<Array<number | string>>>([]);
    const totalityTaxChartView = ref<Array<Array<number | string>>>([]);

    // CREDIT
    const totalityFeesCreditChartView = ref<Array<Array<number | string>>>([]);
    const totalityAllCreditChartView = ref<Array<Array<number | string>>>([]);
    const totalityTaxCreditChartView = ref<Array<Array<number | string>>>([]);
    const graphAmount = ref<Array<number>>([]);
    const graphLabel = ref<Array<string>>([]);
    const currentGraphSet = ref<string>('all');
    const chartData = ref<any>({
        labels: [],
        datasets: [
            {
                backgroundColor: [
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16',
                    '#AE1B16',
                    '#fe2a16',
                    '#ccc',
                    '#0000000',
                ],
                data: [],
            },
        ],
    });

    const props = defineProps({
        isCredit: {
            type: Boolean,
            default: false,
        },
        saleResult: {
            type: Object as PropType<TypesSaleResult>,
        },
        creditResult: {
            type: Object as PropType<TypeCreditResult>,
            // type: Object as PropType<TypeCreditResult>,
        },
    });

    onMounted(() => {
        // if (!props.isCredit) {
        //     updateChartData();
        // } else {
        //     updateCreditChartData();
        // }
    });

    // function updateCreditChartData() {
    //     totalityFeesCreditChartView.value = [
    //         [
    //             props.creditResult?.computeWritingFee as any,
    //             `Frais de droit d'ecriture`,
    //         ],
    //         [props.creditResult?.computeOfficeFee as any, `Frais de bureau`],
    //         [props.creditResult?.computeERegistration as any, `E-Registration`],
    //         [
    //             props.creditResult?.computeRegistrationFee as any,
    //             `Frais d'enregistrement`,
    //         ],
    //         [
    //             props.creditResult?.computeAnnexeRegistration as any,
    //             `Enregistrement annexe`,
    //         ],
    //         [props.creditResult?.computeOtherFees as any, `Autre frais`],
    //         [
    //             props.creditResult?.hypothequeSubscription as any,
    //             "Frais d'inscription hypothécaire",
    //         ],
    //     ];
    //     totalityTaxCreditChartView.value = [
    //         [props.creditResult?.computeTax as any, 'Tax'],
    //         [
    //             props.creditResult?.computeTaxableFee as any,
    //             'Base Taxable , soumise à TVAC',
    //         ],
    //         [props.creditResult?.totalGrand as any, 'Total de subvention'],
    //         [props.creditResult?.totalBill as any, 'Facture TVAC'],
    //     ];
    //     const totalityFeesAmount = totalityFeesCreditChartView.value.reduce(
    //         (cum: number, curr: Array<any>) => (cum + curr[0]) as number,
    //         0
    //     );
    //     totalityAllCreditChartView.value = [
    //         [
    //             props.creditResult?.computeRegistrationFee
    //                 ? +(
    //                       props.creditResult?.computeRegistrationFee as any
    //                   ).toFixed(2)
    //                 : 0,
    //             `E-Registration`,
    //         ],
    //         [
    //             props.creditResult?.computeWritingFee
    //                 ? +(props.creditResult?.computeWritingFee as any).toFixed(2)
    //                 : 0,
    //             `Frais de droit d'ecriture`,
    //         ],
    //         [
    //             +totalityFeesAmount.toFixed(2),
    //             `Frais de dossier et frais admnistratifs`,
    //         ],
    //     ];
    //     assignCreditGraph();
    // }

    function assignCreditGraph(type: string = 'all') {
        currentGraphSet.value = type;
        switch (type) {
            case 'all':
                graphAmount.value = [
                    ...totalityAllCreditChartView.value.map((item) => item[0]),
                ] as number[];
                graphLabel.value = [
                    ...totalityAllCreditChartView.value.map((item) => item[1]),
                ] as string[];
                break;
            case 'tax':
                graphAmount.value = [
                    ...totalityTaxCreditChartView.value.map((item) => item[0]),
                ] as number[];
                graphLabel.value = [
                    ...totalityTaxCreditChartView.value.map((item) => item[1]),
                ] as string[];
                break;
            case 'fees':
                graphAmount.value = [
                    ...totalityFeesCreditChartView.value.map((item) => item[0]),
                ] as number[];
                graphLabel.value = [
                    ...totalityFeesCreditChartView.value.map((item) => item[1]),
                ] as string[];
                break;
        }
        chartData.value.labels = [...graphLabel.value];
        chartData.value.datasets[0].data = [...graphAmount.value];
    }

    // function updateChartData() {
    //     totalityFeesChartView.value = [
    //         [props.saleResult?.writingFee as any, `Frais de droit d'ecriture`],
    //         [props.saleResult?.notaryFee as any, `Frais notaire`],
    //         [props.saleResult?.loanOfficeFee as any, `Frais de bureau de prêt`],
    //         [
    //             props.saleResult?.mortgageTranscriptionFee as any,
    //             `Frais de transcription hypothécaire`,
    //         ],
    //         [props.saleResult?.eRegistration as any, `E-Registration`],
    //         [
    //             props.saleResult?.registrationFee as any,
    //             `Frais d'enregistrement`,
    //         ],
    //         // [props.saleResult?.registrationRate as any],
    //         [
    //             props.saleResult?.registrationAnnexe as any,
    //             `Enregistrement annexe`,
    //         ],
    //         [props.saleResult?.officeFee as any, `Frais de bureau`],
    //         [props.saleResult?.otherFee as any, `Autre frais`],
    //     ];
    //     totalityTaxChartView.value = [
    //         [props.saleResult?.tax as any, 'Tax'],
    //         [
    //             props.saleResult?.taxableFee as any,
    //             'Base Taxable , soumise à TVAC',
    //         ],
    //         [props.saleResult?.invoiceTVAC as any, 'Facture TVA'],
    //         [
    //             props.saleResult?.landRegistrationTax as any,
    //             `Taxe d'enregistrement foncier`,
    //         ],
    //         [props.saleResult?.tva as any, `TVA 21%`],
    //     ];
    //     const totalityFeesAmount = totalityFeesChartView.value.reduce(
    //         (cum: number, curr: Array<any>) => (cum + curr[0]) as number,
    //         0
    //     );
    //     totalityAllChartView.value = [
    //         [
    //             props.saleResult?.eRegistration
    //                 ? +(props.saleResult?.eRegistration as any).toFixed(2)
    //                 : 0,
    //             `E-Registration`,
    //         ],
    //         [
    //             props.saleResult?.writingFee
    //                 ? +(props.saleResult?.writingFee as any).toFixed(2)
    //                 : 0,
    //             `Frais de droit d'ecriture`,
    //         ],
    //         [
    //             +totalityFeesAmount.toFixed(2),
    //             `Frais de dossier et frais admnistratifs`,
    //         ],
    //         [props.saleResult?.tva as any, `TVA 21%`],
    //     ];
    //     assignGraph();
    // }

    // function assignGraph(type: string = 'all') {
    //     currentGraphSet.value = type;
    //     switch (type) {
    //         case 'all':
    //             graphAmount.value = [
    //                 ...totalityAllChartView.value.map((item) => item[0]),
    //             ] as number[];
    //             graphLabel.value = [
    //                 ...totalityAllChartView.value.map((item) => item[1]),
    //             ] as string[];
    //             break;
    //         case 'tax':
    //             graphAmount.value = [
    //                 ...totalityTaxChartView.value.map((item) => item[0]),
    //             ] as number[];
    //             graphLabel.value = [
    //                 ...totalityTaxChartView.value.map((item) => item[1]),
    //             ] as string[];
    //             break;
    //         case 'fees':
    //             graphAmount.value = [
    //                 ...totalityFeesChartView.value.map((item) => item[0]),
    //             ] as number[];
    //             graphLabel.value = [
    //                 ...totalityFeesChartView.value.map((item) => item[1]),
    //             ] as string[];
    //             break;
    //     }
    //     chartData.value.labels = [...graphLabel.value];
    //     chartData.value.datasets[0].data = [...graphAmount.value];
    // }
</script>
<style lang="scss" scoped>
    @import '@/assets/style/calcul_sale.scss';
</style>
