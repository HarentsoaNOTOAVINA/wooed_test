<template>
    <div class="fluvius-table">
        <table>
            <thead>
                <tr>
                    <th>TYPE DE RACCORDEMENT</th>
                    <th>COÛT</th>
                </tr>
            </thead>
            <tbody v-if="FLUVIUS">
                <tr v-for="item in FLUVIUS" :key="item.id">
                    <td>
                        {{ item.connectionType }}
                    </td>
                    <td>{{ item.cost }} €</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts" setup>
    import { FLUVIUS } from '../connection-request.data';
</script>
<style lang="scss" scoped>
    .fluvius-table {
        table {
            @apply border-collapse w-full;
        }
        td, th {
            @apply border border-gray;
        }
        th {
            @apply p-[10px] text-[var(--color-primary)] text-left;
        }
        td {
            @apply p-[10px];
        }
    }
</style>
