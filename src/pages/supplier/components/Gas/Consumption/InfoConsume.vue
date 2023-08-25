<template>
    <div class="infoConso__container">
        <div class="infoConso__table">
            <div class="infoConso__table-header">
                <span> INFORMATION SUR MA CONSOMMATION </span>
            </div>
            <hr class="__hr" />
            <table>
                <tbody>
                    <tr class="infoConso__table-row">
                        <td>
                            <span> Type de consommation </span>
                        </td>
                        <td>
                            <span> {{ consumptionDetails.type }} </span>
                        </td>
                    </tr>
                    <tr class="infoConso__table-row">
                        <td>
                            <span> Type de forfait </span>
                        </td>
                        <td>
                            <span> {{ consumptionDetails.rateType }} </span>
                        </td>
                    </tr>
                    <tr class="infoConso__table-row">
                        <td>
                            <span> Consommation annuelle </span>
                        </td>
                        <td>
                            <span>
                                {{
                                    separatorHandleFloat(
                                        consumptionDetails.consumptionAnnual
                                    )
                                }}
                                m<sup>3</sup>/kwh
                            </span>
                        </td>
                    </tr>
                    <tr class="infoConso__table-row">
                        <td>
                            <span> Coût de la consommation </span>
                        </td>
                        <td>
                            <span>
                                {{
                                    separatorHandleFloat(
                                        consumptionDetails.consumptionCost.toFixed(
                                            2
                                        )
                                    )
                                }}
                                €
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted } from 'vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';

    const props = defineProps<{
        consumptionDetails: any;
    }>();

    onMounted(() => {
        console.log(props.consumptionDetails, 'PROPS');
    });
</script>

<style lang="scss" scoped>
    .infoConso {
        &__container {
            @apply flex flex-col gap-[18px];
        }
        &__table {
            @apply bg-gray flex flex-col gap-[18px] p-[18px] rounded-[8px];
            .__hr {
                @apply text-white;
            }
            &-header {
                @apply uppercase;
            }
            &-row {
                td {
                    @apply pb-[8px];
                }
                td:last-child {
                    @apply font-[600] text-right pb-0;
                }
            }
        }
    }
</style>
