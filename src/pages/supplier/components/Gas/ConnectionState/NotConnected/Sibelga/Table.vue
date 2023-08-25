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
                <tr v-for="elem in SIBELGA" :key="elem.id">
                    <td>{{ elem.connectionType }}</td>
                    <td v-if="elem.id === 1">
                        {{ elem.cost }} €
                    </td>
                    <td class="no-pad" v-if="elem.id === 2">
                        <table
                            v-for="(subElem, index) in elem.cost"
                            :key="index"
                        >
                            <tr
                                v-for="(
                                    subSubElem, subSubIndex
                                ) in subElem.subConnectionType"
                                :key="subSubIndex"
                            >
                                <td>{{ subSubElem.type }}</td>
                                <td>{{ subSubElem.cost }} €</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts" setup>
    import { SIBELGA } from '../connection-request.data';
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
