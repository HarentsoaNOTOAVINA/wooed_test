<template>
    <div class="invoice">
        <AddInvoice @get-incomming-invoice="getIncommingInvoice" />
        <hr class="__hr" />
        <SendInvoiceByApp />
        <div class="info">
            <Paragraphe
                >Le numéro de compte bancaire de Luminus (LOGO) est
                <b>BEBE86ZZZ0237679494</b></Paragraphe
            >
        </div>
    </div>
</template>
<script lang="ts" setup>
    import SupplierServices from '@/services/supplierService';
    import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
    import AddInvoice from './AddInvoice.vue';
    import SendInvoiceByApp from './SendInvoiceByApp.vue';

    const route = useRoute();
    const store = useStore(); 

    const isLoadInvoicesList = ref<boolean>(false);
    const invoicesList = ref<any[]>([]);

    onMounted(() => {
        getInvoicesList();
    });

    async function getInvoicesList() {
        isLoadInvoicesList.value = true;
        try {
            const { data } = await SupplierServices.getBill({
                theProperty: route.params.id,
                energyType: store.getters['SupplierModule/getEnergyType'],
            });
            invoicesList.value = data;
        } catch (e) {
            console.error(e, 'ERROR');
        } finally {
            isLoadInvoicesList.value = false;
        }
    }

    function getIncommingInvoice(data: any) {
        invoicesList.value = data;
    }

    function handleRedirect(link: string) {
        window.open(link, '_blank');
    }
</script>
<style lang="scss" scoped>
    .invoice {
        @apply flex flex-col gap-[18px];
        .info {
            @apply rounded-[8px];
            border: 0.5px solid var(--color-gray);
            padding: 12px;
        }
        &__table {
            border-collapse: separate;
            border-spacing: 0 18px;
            @apply w-full hidden;
            @screen md {
                @apply inline-table;
            }
            &-container {
                @apply flex flex-col gap-[14px];
                @screen md {
                    @apply -my-[18px] gap-[14px];
                }
            }
            &-head {
                @apply text-left text-primary;
                th {
                    @apply px-[12px];
                }
                th:last-child {
                    @apply text-right;
                }
                tr {
                    @apply shadow-none;
                }
            }
            &-body {
                td {
                    @apply p-[12px];
                }
                td:first-child {
                    @apply font-[600];
                }
                td:last-child {
                    @apply flex items-center justify-end;
                }
            }
            &-row {
                box-shadow: inset 0 0px 1px var(--color-stroke-gray);
                @apply rounded-[8px];
                &--mobile {
                    @apply relative justify-between items-center flex flex-row p-[8px] w-full;
                    @screen md {
                        @apply hidden;
                    }
                    .moreInfo {
                        @apply flex flex-col gap-[4px] text-grayIcon pl-[26px];
                        span {
                            @apply block text-[10px];
                            &:last-child {
                                @apply flex items-center gap-[2px];
                                &:deep() {
                                    svg {
                                        @apply w-[12px] h-[12px];
                                    }
                                }
                            }
                        }
                    }
                    .moreButton {
                        @apply absolute top-[8px] right-0 p-0;
                    }
                    .files__container {
                        &:deep() {
                            svg {
                                @apply w-[18px] h-[18px];
                            }
                        }
                    }
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
