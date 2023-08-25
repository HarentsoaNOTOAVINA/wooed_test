<template>
    <table
        v-for="(item, index) in relativeWork.provider[supplier]"
        :key="index"
        class="tabs__mobile"
    >
        <tr>
            <td colspan="100%">
                <Title
                    type="h4"
                    weight="600"
                    label="Type de travaux"
                    class="title"
                />
            </td>
        </tr>
        <tr>
            <td colspan="100%">
                <div class="title-btn-mobile">
                    <Paragraphe class="title-btn__text">{{
                        item.type
                    }}</Paragraphe>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="100%">
                <Title type="h6" weight="600" label="Cout" class="title" />
            </td>
        </tr>
        <tr>
            <td
                colspan="1"
                v-for="title in item.titles"
                :key="title"
                class="tabs__title"
            >
                <Title
                    type="h4s"
                    weight="600"
                    :label="title"
                    class="element-title"
                />
            </td>
        </tr>
        <template v-if="supplier === 'ORES'">
                <tr v-for="(cost, costIdx) in item.cost" :key="costIdx">
                    <template v-if="item.id === 1">
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.hourlyFlow }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.counterType }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.maxPressure }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.typicalConduct }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Operation
                                :caracteristic-work="item.type"
                                :cost-work="cost.price"
                                :has-selected-work="hasSelectedWork"
                                :is-load-work="isLoadWork"
                                :idx="costIdx"
                                :is-active-work="
                                    isActiveWork({
                                        costWork: cost.price,
                                        caracteristicWork: item.type,
                                        idx: costIdx,
                                    })
                                "
                                @on-chose-work="(choseWork as any)"
                            />
                        </td>
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.counterType }}</Paragraphe>
                        </td>
                    </template>
                    <template v-else-if="item.id === 2">
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.hourlyFlow }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.counterType }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.boxOrMiniCabin }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.conduct }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Operation
                                :caracteristicWork="item.type"
                                :cost-work="cost.BP212598mbar1"
                                :has-selected-work="hasSelectedWork"
                                :is-load-work="isLoadWork"
                                :idx="costIdx"
                                :is-active-work="
                                    isActiveWork({
                                        costWork: cost.BP212598mbar1,
                                        caracteristicWork: item.type,
                                        idx: costIdx,
                                    })
                                "
                                @on-chose-work="(choseWork as any)"
                            />
                        </td>
                        <td class="tabs__value">
                            <Operation
                                :cost-work="cost.MP49bar1"
                                :caracteristicWork="item.type"
                                :has-selected-work="hasSelectedWork"
                                :is-load-work="isLoadWork"
                                :idx="costIdx"
                                :is-active-work="
                                    isActiveWork({
                                        costWork: cost.MP49bar1,
                                        caracteristicWork: item.type,
                                        idx: costIdx,
                                    })
                                "
                                @on-chose-work="(choseWork as any)"
                            />
                        </td>
                        <td class="tabs__value">
                            <Operation
                                :cost-work="cost.BP212598mbar2"
                                :caracteristicWork="item.type"
                                :has-selected-work="hasSelectedWork"
                                :is-load-work="isLoadWork"
                                :idx="costIdx"
                                :is-active-work="
                                    isActiveWork({
                                        costWork: cost.BP212598mbar2,
                                        caracteristicWork: item.type,
                                        idx: costIdx,
                                    })
                                "
                                @on-chose-work="(choseWork as any)"
                            />
                        </td>
                        <td class="tabs__value">
                            <Operation
                                :cost-work="cost.MP49bar2"
                                :caracteristicWork="item.type"
                                :has-selected-work="hasSelectedWork"
                                :is-load-work="isLoadWork"
                                :idx="costIdx"
                                :is-active-work="
                                    isActiveWork({
                                        costWork: cost.MP49bar2,
                                        caracteristicWork: item.type,
                                        idx: costIdx,
                                    })
                                "
                                @on-chose-work="(choseWork as any)"
                            />
                        </td>
                        <td class="tabs__value">
                            <Operation
                                :cost-work="cost.box"
                                :caracteristicWork="item.type"
                                :has-selected-work="hasSelectedWork"
                                :is-load-work="isLoadWork"
                                :idx="costIdx"
                                :is-active-work="
                                    isActiveWork({
                                        costWork: cost.box,
                                        caracteristicWork: item.type,
                                        idx: costIdx,
                                    })
                                "
                                @on-chose-work="(choseWork as any)"
                            />
                        </td>
                    </template>
                    <template v-else-if="item.id === 3">
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.hourlyFlow }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.counterType }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.boxOrMiniCabin }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Paragraphe>{{ cost.conduct }}</Paragraphe>
                        </td>
                        <td class="tabs__value">
                            <Operation
                                :cost-work="cost.BP212598mbar1"
                                :caracteristicWork="item.type"
                                :has-selected-work="hasSelectedWork"
                                :is-load-work="isLoadWork"
                                :idx="costIdx"
                                :is-active-work="
                                    isActiveWork({
                                        costWork: cost.BP212598mbar1,
                                        caracteristicWork: item.type,
                                        idx: costIdx,
                                    })
                                "
                                @on-chose-work="(choseWork as any)"
                            />
                        </td>
                        <td class="tabs__value">
                            <Operation
                                :cost-work="cost.MP49bar"
                                :caracteristicWork="item.type"
                                :has-selected-work="hasSelectedWork"
                                :is-load-work="isLoadWork"
                                :idx="costIdx"
                                :is-active-work="
                                    isActiveWork({
                                        costWork: cost.MP49bar,
                                        caracteristicWork: item.type,
                                        idx: costIdx,
                                    })
                                "
                                @on-chose-work="(choseWork as any)"
                            />
                        </td>
                        <td class="tabs__value">
                            <Operation
                                :cost-work="cost.box"
                                :caracteristicWork="item.type"
                                :has-selected-work="hasSelectedWork"
                                :is-load-work="isLoadWork"
                                :idx="costIdx"
                                :is-active-work="
                                    isActiveWork({
                                        costWork: cost.MP49bar,
                                        caracteristicWork: item.type,
                                        idx: costIdx,
                                    })
                                "
                                @on-chose-work="(choseWork as any)"
                            />
                        </td>
                    </template>
                </tr>
            </template>
            <template v-else>
                <tr>
                    <td class="tabs__value">
                        <Operation
                            :cost-work="item.cost"
                            :caracteristicWork="item.type"
                            :has-selected-work="hasSelectedWork"
                            :is-load-work="isLoadWork"
                            :is-active-work="
                                isActiveWork({
                                    costWork: item.cost,
                                    caracteristicWork: item.type,
                                })
                            "
                            @on-chose-work="(choseWork as any)"
                        />
                    </td>
                </tr>
            </template>
    </table>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Operation from '../../Operation.vue';

    const props = defineProps<{
        choseWork: Function;
        hasSelectedWork: boolean;
        isLoadWork: boolean;
        supplier: string;
        relativeWork: any;
        subWork: string;
        workChose: any;
    }>();
    function isActiveWork(work: {
        costWork?: number;
        caracteristicWork?: string;
        typeWork?: string;
        typeSubwork?: string;
        idx?: number;
    }) {
        return (
            props.workChose.costWork === work.costWork &&
            props.workChose.caracteristicWork === work.caracteristicWork &&
            // props.workChose.typeWork === props.workType &&
            props.workChose.typeSubwork === props.subWork &&
            props.workChose.idx === work.idx
        );
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/style/supplier.scss';
</style>
