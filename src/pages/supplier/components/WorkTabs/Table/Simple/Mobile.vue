<template>
    <div>
        <table
            v-for="(item, index) in relativeWork.provider[supplier]"
            :key="index"
            class="tabs__mobile"
        >
            <thead>
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
            </thead>
            <tbody>
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
                <template v-if="supplier === 'ORES'">
                <template v-if="item.id === 1">
                    <tr v-for="subType in item.subType" :key="subType">
                        <td class="tabs__value-key">
                            <Paragraphe>
                                {{ subType.name }}
                            </Paragraphe>
                        </td>
                        <td class="tabs__value" style="width: 15%">
                            <Operation
                                :cost-work="subType.cost"
                                :caracteristicWork="item.type"
                                :has-selected-work="hasSelectedWork"
                                :is-load-work="isLoadWork"
                                :is-active-work="
                                    isActiveWork({
                                        costWork: subType.cost,
                                        caracteristicWork: item.type,
                                    })
                                "
                                @on-chose-work="choseWork as any"
                            />
                        </td>
                    </tr>
                </template>
                <template v-else-if="item.id === 2">
                    <tr>
                        <td class="tabs_value" colspan="2">
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
                                @on-chose-work="choseWork as any"
                            />
                        </td>
                    </tr>
                </template>
                <template v-else-if="item.id === 3">
                    <tr>
                        <td class="p-0 no-pad">
                            <table>
                                <thead>
                                    <tr>
                                        <td
                                            v-for="(title, index) in item.column
                                                .titles"
                                            :key="index"
                                            class="text-[var(--color-primary)]"
                                        >
                                            {{ title }}
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(content, index) in item.column
                                            .contents"
                                        :key="index"
                                    >
                                        <td class="tabs__value">
                                            <Operation
                                                :cost-work="
                                                    content.BP212598mbar
                                                "
                                                :caracteristicWork="item.type"
                                                :has-selected-work="
                                                    hasSelectedWork
                                                "
                                                :is-load-work="isLoadWork"
                                                :is-active-work="
                                                    isActiveWork({
                                                        costWork:
                                                            content.BP212598mbar,
                                                        caracteristicWork:
                                                            item.type,
                                                    })
                                                "
                                                @on-chose-work="
                                                    choseWork as any
                                                "
                                            />
                                        </td>
                                        <td class="tabs__value">
                                            <Operation
                                                :cost-work="content.MP49bar"
                                                :caracteristicWork="item.type"
                                                :has-selected-work="
                                                    hasSelectedWork
                                                "
                                                :is-load-work="isLoadWork"
                                                :is-active-work="
                                                    isActiveWork({
                                                        costWork:
                                                            content.MP49bar,
                                                        caracteristicWork:
                                                            item.type,
                                                    })
                                                "
                                                @on-chose-work="
                                                    choseWork as any
                                                "
                                            />
                                        </td>
                                        <td class="tabs__value">
                                            <Operation
                                                :cost-work="content.box"
                                                :caracteristicWork="item.type"
                                                :has-selected-work="
                                                    hasSelectedWork
                                                "
                                                :is-load-work="isLoadWork"
                                                :is-active-work="
                                                    isActiveWork({
                                                        costWork: content.box,
                                                        caracteristicWork:
                                                            item.type,
                                                    })
                                                "
                                                @on-chose-work="
                                                    choseWork as any
                                                "
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </template>
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
            </tbody>
        </table>
    </div>
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
