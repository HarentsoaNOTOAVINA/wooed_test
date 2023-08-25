<template>
    <div class="historyContent__items place-content-14px">
        <CardWrapper class="historyContent__card place-content-14px">
            <Title
                type="h3"
                :label="data.tabTitle + ' ' + years"
                class="historyContent__title"
            />
            <hr class="__hr" />
            <div class="place-content-14px">
                <div class="historyContent__content">
                    <ContentValue
                        label="Montant du loyer dû :"
                        :value="data.tabContent.rentDue"
                        unity="€"
                    />
                    <Input
                        v-if="!props.isRentPerMonthPaid"
                        label="Montant du loyer acquitté"
                        nameInput="amountPaid"
                        inputType="number"
                        placeholder="0"
                        unity="€"
                        @change="handlePrice"
                    />
                    <ContentValue
                        v-if="props.isRentPerMonthPaid"
                        label="Montant du loyer acquitté"
                        :value="data.tabContent.rentPaid"
                        unity="€"
                    />
                </div>
                <div class="historyContent__content">
                    <ContentValue
                        label="Montant de la provision pour charges dûe :"
                        :value="data.tabContent.provisionChargesDue"
                        unity="€"
                    />
                    <Input
                        v-if="!props.isRentPerMonthPaid"
                        label="Montant de la provision pour charges acquitté"
                        nameInput="provisionPaid"
                        inputType="number"
                        placeholder="0"
                        unity="€"
                        @change="handleProvision"
                    />
                    <ContentValue
                        v-if="props.isRentPerMonthPaid"
                        label="Montant de la provision pour charges acquitté"
                        :value="data.tabContent.provisionChargesPaid"
                        unity="€"
                    />
                </div>
                <div class="historyContent__content">
                    <ContentValue
                        label="Montant des charges acquittées réellement "
                    >
                        <RouterLink
                            :to="data.tabContent.link"
                            target="_blank"
                            class="flex items-center gap-[10px] text-primary"
                        >
                            <Icon icon-name="Link" class="mt-[4px]" />
                            <span>
                                Lien automatique avec partie copropriété
                            </span>
                        </RouterLink>
                    </ContentValue>
                    <ContentValue
                        v-if="props.restIsPositive"
                        label="Différence à acquitter par le locataire :"
                        :value="restToPaid"
                        unity="€"
                    />
                    <ContentValue
                        v-if="!props.restIsPositive"
                        label="Différence à rembourser au locataire :"
                        :value="restToPaid"
                        unity="€"
                    />
                </div>
                <div class="historyContent__button">
                    <a-popconfirm
                        title="Voulez-vous vraiment valider ?"
                        @cancel=""
                        @confirm="handlePaidRent"
                    >
                        <Button v-if="!props.isRentPerMonthPaid"
                            ><LoadingButton size="xs" v-if="isAddHistory" />
                            Valider
                        </Button>
                    </a-popconfirm>
                </div>
            </div>
        </CardWrapper>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import { Popconfirm as APopconfirm } from 'ant-design-vue';
    import ContentValue from '@/components/Display/ContentValue/ContentValue.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    const props = defineProps({
        data: {
            type: Object,
            default: {},
        },
        years: {
            type: String,
            default: '',
        },
        restIsPositive: {
            type: Boolean,
        },
        restToPaid: {
            type: null,
        },
        isAddHistory: {
            type: Boolean,
            default: false,
        },
        isRentPerMonthPaid: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits<{
        (e: 'handleRentPrice', v: any): void;
        (e: 'handleProvisionPrice', v: any): void;
        (e: 'handlePaidRent'): void;
    }>();

    function handlePrice(value: any) {
        emit('handleRentPrice', value);
    }

    function handleProvision(value: any) {
        emit('handleProvisionPrice', value);
    }

    function handlePaidRent() {
        emit('handlePaidRent');
    }
</script>

<style lang="scss" scoped>
    .historyContent {
        &__title {
            @apply font-[600] text-primary text-[14px];
        }
        &__content {
            @apply grid grid-cols-1 gap-[14px];
            @screen sm {
                @apply grid-cols-2;
            }
            @screen md {
                @apply grid-cols-1;
            }
            @screen lg {
                @apply grid-cols-2;
            }
            &:deep() {
                .contentValue {
                    @apply w-full;
                }
            }
        }
        &__button {
            @apply flex justify-end;
        }
    }
</style>
