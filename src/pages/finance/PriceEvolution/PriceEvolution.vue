<template>
    <div class="price-evolution">
        <finance-card label-title="Evolution du prix">
            <div class="price-evolution__content">
                <!-- <div class="price-evolution__content--empty">
                    <a-empty description="Pas d'etude possible sur ce bien" />
                </div> -->
                <div class="price-evolution__content--has-result">
                    <a-table :dataSource="[priceEvolutionDatas]" :columns="columns" />
                </div>
            </div>
        </finance-card>
    </div>
</template>
<script lang="ts" setup>
    import FinanceCard from '../components/FinanceCard/FinanceCard.vue';
    import { Empty as AEmpty, Table as ATable } from 'ant-design-vue';
    import { onMounted, ref } from 'vue';
    import FinancialService from '@/services/FinancialService';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const priceEvolutionDatas = ref<any>({});
    const columns = ref<any[]>([
        {
            title: 'Année',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Prix(€)',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Evolution(%)',
            dataIndex: 'evolution',
            key: 'evolution',
        },
    ]);

    onMounted(() => {
        fetchPriceEvolution();
        console.log("price evolution:",priceEvolutionDatas.value);
        
    });

    async function fetchPriceEvolution() {
        // const data = await FinancialService.getPriceEvolution({
        //     theProperty: route.params.id,
        // });
        // console.log(data);
        const raw = [
            {
                titre: 'Achat appartement 2 pièces 29  m²',
                prix: '229 000 €',
                surface: '29 m²',
                nbPiece: '2',
                nbChambre: '0',
                nbEtage: '0',
                superficieTerrain: '0',
                dateConst: '0',
            },
            {
                titre: 'Achat appartement 4 pièces 92  m²',
                prix: '598 000 €',
                surface: '92 m²',
                nbPiece: '4',
                nbChambre: '3',
                nbEtage: '0',
                superficieTerrain: '0',
                dateConst: '0',
            },
            [
                {
                    titre: 'Achat appartement 7 pièces 201  m²',
                    prix: '798 000 €',
                    surface: '201 m²',
                    nbPiece: '7',
                    nbChambre: '5',
                    nbEtage: '0',
                    superficieTerrain: '250 m² de terrain',
                    dateConst: 'Construit en 2015',
                },
            ],
        ];
        priceEvolutionDatas.value = extractData(raw);
        console.log(priceEvolutionDatas.value);
    }

    function extractData(data: any[]) {
        /**
         * check if main array data contains other array of obj
         * if contains extract the obj end spread with other
         */
        const _formateText = (rawTxt: string): number =>
            +rawTxt.replace(/[^\d]/g, '');
        const mappedData: number[] = data.map((item) =>
            Array.isArray(item) && !!item[0]
                ? _formateText(item[0].prix) / _formateText(item[0].surface)
                : _formateText(item.prix) / _formateText(item.surface)
        );
        return averageCalculation(mappedData);
    }

    function averageCalculation(list: number[]): {
        price: number | string;
        year: number;
        evolution: number;
    } {
        return {
            price: (list.reduce((acc, curr) => acc + curr, 0) / list.length).toFixed(2),
            year: 2022,
            evolution: 0,
        };
    }
</script>
<style lang="scss" scoped>
    .price-evolution {
        @apply w-full;
        &__content {
            @apply h-[inherit];
            &--empty {
                @apply h-[inherit] flex items-center justify-center;
            }
        }
    }
</style>
