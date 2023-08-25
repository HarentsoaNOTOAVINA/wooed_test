<template>
    <div class="invoice__container">
        <div class="invoice__add">
            <span class="invoice__add-label">Liste des factures</span>
        </div>
        <div v-if="isLoadInvoicesList" class="loading-container">
            <Loader />
        </div>
        <div v-else class="invoice__table-container">
            <template v-if="invoicesList.length">
                <table class="invoice__table">
                    <thead class="invoice__table-head">
                        <tr class="invoice__table-head-row">
                            <th>ID</th>
                            <th>Facture(s)</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody class="invoice__table-body">
                        <tr
                            v-for="(item, index) in invoicesList"
                            :key="index"
                            class="invoice__table-row"
                        >
                            <td>
                                <span> {{ item.id }} </span>
                            </td>
                            <td>
                                <div class="files__container">
                                    <a
                                        :href="item.path"
                                        class="files__download"
                                        title=""
                                        target="_blank"
                                    >
                                        <Icon icon-name="AdobeReaderIcon" />
                                        <span class="files__button">{{
                                            item.file
                                        }}</span>
                                    </a>
                                </div>
                            </td>
                            <td>
                                <div class="moreButton">
                                    <MoreOption
                                        :option-items="[
                                            {
                                                name: url,
                                                label: 'Contester la facture',
                                            },
                                            {
                                                name: url,
                                                label: 'Demander un plan de paiement',
                                            },
                                        ]"
                                        @on-action="handleRedirect"
                                    >
                                        <template #buttonIcon>
                                            <Icon icon-name="MoreVertical" />
                                        </template>
                                    </MoreOption>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div
                    v-for="(item, index) in invoicesList"
                    :key="index"
                    class="invoice__table-row invoice__table-row--mobile"
                >
                    <div>
                        <div class="files__container">
                            <a
                                :href="item.path"
                                class="files__download"
                                target="_blank"
                            >
                                <Icon icon-name="AdobeReaderIcon" />
                                <span class="files__button">{{
                                    item.file
                                }}</span>
                            </a>
                        </div>
                        <div class="moreInfo">
                            <span> ID : {{ item.id }} </span>
                        </div>
                    </div>
                    <MoreOption
                        :option-items="[
                            {
                                name: url,
                                label: 'Contester la facture',
                            },
                            {
                                name: url,
                                label: 'Demander un plan de paiement',
                            },
                        ]"
                        @on-action="handleRedirect"
                    >
                        <template #buttonIcon>
                            <Icon icon-name="MoreVertical" />
                        </template>
                    </MoreOption>
                </div>
            </template>
            <div v-else>
                <hr class="text-gray mb-[40px]" />
                <a-empty description="Pas de factures enregistrées"></a-empty>
                <hr class="text-gray my-[40px]" />
            </div>
        </div>

        <Paragraphe class="invoice__numberAccount">
            Le numéro de compte bancaire de Luminus (LOGO) est BE76 3350 5545
            9895 (BIC : BBRUBEBB)
        </Paragraphe>
        <Collapse ghost expand-icon-position="right" class="invoice__collapse">
            <Panel
                v-for="(item, index) in dataCollapse"
                :key="index"
                class="invoice__collapse-panel"
                :header="item.headerTitle"
            >
                <div class="invoice__collapse-content">
                    <a
                        v-for="(content, index) in item.panelContent"
                        :key="index"
                        :href="content.url"
                        target="_blank"
                        class="invoice__collapse-item"
                        rel="noopener noreferrer"
                    >
                        {{ content.label }}
                    </a>
                </div>
            </Panel>
        </Collapse>
    </div>
</template>

<script lang="ts" setup>
        import Icon from '@/components/Common/Icon/Icon.vue';
        import Loader from '@/components/Common/Loader/Loader.vue';
        import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
        import MoreOption from '@/components/Display/MoreOption/MoreOption.vue';
        import { Collapse } from 'ant-design-vue';
        import { ref, onMounted, watch } from 'vue';
        import SupplierServices from '@/services/supplierService';
        import { Empty as AEmpty } from 'ant-design-vue';
    import { useRoute } from 'vue-router';
        const { Panel } = Collapse;

        const route = useRoute();

        const isLoadInvoicesList = ref<boolean>(false);
        const invoicesList = ref<any[]>([]);
        const url =
            'https://account.engie.be/auth/realms/BE_MS_Customers/protocol/openid-connect/auth?response_type=code&client_id=magnolia&redirect_uri=https%3A%2F%2Fwww.engie.be%2Ffr%2Fespace-client%2Ffactures-et-paiements%2Ffactures-paiements&state=bcb8137c-be0f-4b24-b1b4-3073a75f56c4&login=true&scope=openid';
        const dataCollapse = [
            {
                headerTitle: 'Mes factures sur Zoomit',
                panelContent: [
                    {
                        url,
                        label: 'J’ai un problème d’activation de « mon fournisseur de gaz » dans Zoomit',
                    },
                ],
            },
            {
                headerTitle: 'Mes factures par courriel',
                panelContent: [
                    {
                        url,
                        label: 'Modifier l’adresse mail pour l’envoi de mes factures digitales ',
                    },
                ],
            },
            {
                headerTitle: 'Domiciliations',
                panelContent: [
                    {
                        url,
                        label: 'Activer ou arrêter une domiciliation',
                    },
                    {
                        url,
                        label: 'Modifier le numéro de compte pour ma domiciliation ',
                    },
                ],
            },
        ];

        const props = defineProps<{
            incomingInvoice?: any;
            energyType: string;
            theProperty: number;
        }>();

        watch(
            () => props.incomingInvoice,
            (v) => {
                if (v) {
                    invoicesList.value = [...invoicesList.value, v];
                }
            },
            { immediate: true, deep: true }
        );

        onMounted(() => {
            getInvoicesList();
        });

        async function getInvoicesList() {
            isLoadInvoicesList.value = true;
            try {
                const { data } = await SupplierServices.getBill({
                    theProperty: route.params.id,
                    energyType: props.energyType,
                });
                invoicesList.value = data;
            } catch (e) {
                console.error(e, 'ERROR');
            } finally {
                isLoadInvoicesList.value = false;
            }
        }

        function handleRedirect(link: string) {
            window.open(link, '_blank');
        }
</script>

<style lang="scss" scoped>
    .invoice {
        &__container {
            @apply flex flex-col gap-[18px];
            .loading-container {
                @apply relative h-[300px];
                &:deep() {
                    .custom-loader {
                        @apply bg-white;
                    }
                }
            }
        }
        &__add {
            @apply flex items-center justify-between;
            &-label {
                @apply text-[19px] font-[600] text-grayIcon;
            }
            &-button {
                &:deep() {
                    button {
                        @apply flex items-center gap-[10px];
                    }
                    svg {
                        path {
                            @apply fill-white;
                        }
                    }
                }
            }
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
        &__numberAccount {
            @apply font-[600];
        }
        &__collapse {
            @apply flex flex-col gap-[14px];
            &:deep() {
                .ant-collapse-item {
                    .anticon {
                        transform: rotate(90deg) translateX(-50%);
                    }
                    &.ant-collapse-item-active {
                        .anticon {
                            transform: rotate(180deg) translateY(50%);
                        }
                    }
                    .ant-collapse-header {
                        @apply rounded-[8px] border-gray border-solid border-[1px] font-[600];
                    }
                }
                .ant-collapse-content {
                    width: calc(100% - 24px);
                    @apply relative float-right;
                    &::before {
                        content: '';
                        @apply absolute left-0 top-0 w-[1px] h-full bg-gray;
                    }
                }
            }
            &-content {
                @apply flex flex-col gap-[8px];
            }
            &-item {
                @apply text-primary text-[12px] font-[600];
                &:hover {
                    @apply text-grayIcon;
                }
            }
        }
    }
    .files {
        &__container {
            @apply flex flex-col gap-[8px] w-max;
        }
        &__download {
            @apply flex items-center gap-[8px] w-max text-grayIcon;
            &:hover {
                @apply text-primary;
            }
        }
        &__button {
            @apply text-[12px] font-[600];
            @screen md {
                @apply text-[14px];
            }
        }
    }
</style>
