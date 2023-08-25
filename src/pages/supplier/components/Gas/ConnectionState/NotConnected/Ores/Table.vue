<template>
    <div class="fluvius-table">
        <table>
            <thead>
                <tr>
                    <th>TYPE DE RACCORDEMENT</th>
                    <th>COÛT</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in (ORES as any)" :key="item.id">
                    <td>
                        {{ item.connectionType }}
                    </td>
                    <td class="no-pad">
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        v-for="(elem, i) in item.titles"
                                        :key="i"
                                    >
                                        {{ elem }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="item.id === 1">
                                    <tr
                                        v-for="subElem in item.cost"
                                        :key="subElem.id"
                                    >
                                        <td>
                                            {{ subElem.hourlyFlow }}
                                        </td>
                                        <td>
                                            {{ subElem.counterType }}
                                        </td>
                                        <td>
                                            {{ subElem.maxPressure }}
                                        </td>
                                        <td>
                                            {{ subElem.typicalConduct }}
                                        </td>
                                        <td>{{ subElem.price }} €</td>
                                        <td>{{ subElem.relaxOneLine }} €</td>
                                    </tr>
                                </template>
                                <template v-if="item.id === 2">
                                    <tr
                                        v-for="subElem in item.cost"
                                        :key="subElem.id"
                                    >
                                        <td>
                                            {{ subElem.hourlyFlow }}
                                        </td>
                                        <td>
                                            {{ subElem.counterType }}
                                        </td>
                                        <td>
                                            {{ subElem.boxOrMiniCabin }}
                                        </td>
                                        <td>{{ subElem.conduct }}</td>
                                        <td>{{ subElem.BP212598mbar1 }} €</td>
                                        <td>{{ subElem.MP49bar1 }} €</td>
                                        <td>{{ subElem.BP212598mbar2 }} €</td>
                                        <td>{{ subElem.MP49bar2 }} €</td>
                                        <td>{{ subElem.box }} €</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts" setup>
    import { ORES } from '../connection-request.data';
</script>
<style lang="scss" scoped>
    .fluvius-table {
        table {
            @apply border-collapse w-full;
        }
        td,
        th {
            @apply border border-gray;
        }
        th {
            @apply p-[10px] text-[var(--color-primary)] text-left;
        }
        td:not(.no-pad) {
            @apply p-[10px];
        }
    }
</style>
