<template>
    <div>
        <Title
            type="h3"
            :label="`Charge ${typeRender}`"
            :weight="400"
            class="coproperty__items--title"
        />
        <hr class="__hr" />
        <div
            v-for="(item) in factureList"
            :key="item.id"
            class="coproperty__items"
        >
            <div class="coproperty__form-item-wrap">
                <div class="upload__container">
                    <label>
                        <span> Facture {{ item.id + 1 }} </span>
                        <button
                            v-if="factureList.length > 1"
                            @click="
                                () => {
                                    onDeleteFactureItem(item.id);
                                }
                            "
                        >
                            <deleteRoudedBG class="del-icon" />
                        </button>
                    </label>
                    <UploadImage
                        name="invoiceFile"
                        @uploadSingle="
                            ($event) => {
                                handleAddFile($event, item.id);
                            }
                        "
                    />
                </div>
                <div class="coproperty__field-wrap">
                    <div class="coproperty__form-item-wrap">
                        <label>
                            <span> Prochaine échéance </span>
                        </label>
                        <InputDate
                            @handleDateFormat="
                                ($event) => {
                                    handleChangeDate($event, item.id);
                                }
                            "
                            name="Expiration1"
                            class="coproperty__form-item"
                        />
                    </div>
                    <div class="coproperty__form-item-wrap">
                        <label>
                            <span> Montant prévisionnel </span>
                        </label>
                        <Input
                            unity="€"
                            placeholder="000"
                            class="coproperty__form-item"
                            nameInput="amount"
                            @input="
                                ($event) => {
                                    handleInput($event, item.id);
                                }
                            "
                            inputType="number"
                        />
                    </div>
                </div>
                <!-- <CheckBox
                        label="M’envoyer une alerte 1 an avant l’échéance"
                        class="coproperty__form-item"
                    /> -->
            </div>
        </div>
        <div class="coproperty__add-facture-btn flex justify-center">
            <Button @click="onAddFatcture">
                <AddIcon /> Facture {{ typeRender }}</Button
            >
        </div>
        <div class="coproperty__items coproperty__amount">
            <Paragraphe class="coproperty__amount-content">
                Montant annuel est :
            </Paragraphe>
            <span class="coproperty__amount-value"> {{totalAmount.toLocaleString() || 0}}€ </span>
        </div>
        <hr class="__hr" />
    </div>
</template>
<script lang="ts" setup>
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import AddIcon from '@/components/Icon/AddIcon.vue';
    import deleteRoudedBG from '@/components/Icon/deleteRoudedBG.vue';
    import Title from '@/components/Common/Title/Title.vue';

    import { computed } from 'vue';

    const totalAmount = computed(() => 
        props.factureList.reduce(
            (cum: number, curr: TypesData) => +curr.amount + cum,
            0
        )
    );

    const props = defineProps<{
        type: string;
        factureList: Array<TypesData>;
    }>();

    const emit = defineEmits<{
        (fn: 'on-add-facture', v: string): void;
        (fn: 'on-delete-facture', v: { id: number; type: string }): void;
        (
            fn: 'on-field-changed',
            v: {
                id: number;
                value: object;
                type: string;
            }
        ): void;
    }>();

    const typeRender = computed(() => {
        switch (props.type) {
            case 'ordinary':
                return 'ordinaire';
            case 'extraordinary':
                return 'extra-ordinaire';
        }
    });

    function onAddFatcture() {
        emit('on-add-facture', props.type);
    }
    function onDeleteFactureItem(id: number) {
        emit('on-delete-facture', { id, type: props.type });
    }

    function handleInput(evt: any, id: number) {
        emit('on-field-changed', { id, value: evt, type: props.type });
    }

    function handleChangeDate(evt: any, id: number) {
        const parsedDate = Object.values(evt)[0] as Date
        emit('on-field-changed', {
            id,
            value: {date: parsedDate},
            type: props.type,
        });
    }

    function handleAddFile(evt: any, id: number) {
        emit('on-field-changed', {
            id,
            value: { invoiceFile: evt },
            type: props.type,
        });
    }
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .coproperty {
        &__add-facture-btn {
            :deep() {
                button {
                    @apply flex gap-[10px] items-center;
                }
            }
        }
        &__container {
            @apply h-full;
        }

        &__items {
            @apply mt-[14px];
            @screen md {
                @apply mt-[18px];
            }
        }
        &__items--title {
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            @apply text-primary mb-[14px] mt-[14px];
            @screen md {
                @apply mb-[18px] ml-[24px] mt-[18px];
            }
        }
        &__title {
            @apply text-[14px] text-grayIcon;
            @screen md {
                @apply text-[16px];
            }
        }
        &__field-wrap {
            @apply grid grid-cols-1;
            @screen lg {
                @apply grid-cols-2 gap-[24px];
            }
        }
        &__button {
            @apply mb-[18px];
        }
        &__content {
            @apply font-semibold text-[14px] text-grayIcon mb-[18px];
            @screen md {
                @apply text-[16px];
            }
        }
        &__form-item-wrap {
            label {
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                @apply text-black mb-[14px] flex items-center gap-x-[12px];
                @screen md {
                    @apply mb-[18px];
                }
                &:deep() {
                    svg {
                        @apply w-[18px] h-[18px] cursor-pointer;
                        &:hover path {
                            @apply transition-all;
                            &:first-child {
                                @apply fill-white;
                            }
                            &:last-child {
                                @apply fill-primary;
                            }
                        }
                    }
                }
            }
            &:deep() {
                .custom-input__label-icon,
                .date__label {
                    @apply hidden;
                }
                .switch {
                    label {
                        @apply hidden;
                    }
                }
            }
        }
        &__form-item {
            gap: inherit !important;
            @apply mb-[14px];
            @screen md {
                @apply mb-[18px];
            }
        }
        &__amount {
            @apply flex flex-wrap items-center justify-between p-[14px] bg-gray text-grayIcon mb-[14px];
            @screen md {
                @apply p-[24px] mb-[18px];
            }
        }
        &__amount-content {
            @apply text-[14px] font-semibold;
        }
        &__amount-value {
            @apply block text-[14px] font-semibold;
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.5s;
        max-height: 300px;
    }
    .fadeHeight-enter,
    .fadeHeight-leave-to {
        opacity: 0;
        max-height: 0px;
        @apply overflow-y-hidden;
    }

    .label__flex {
        @apply flex gap-x-[14px];
        .coproperty__form-item {
            min-width: 100px;
        }
    }

    .upload__container {
        :deep() {
            .del-icon {
                height: 32px;
                width: 32px;
            }
        }
        @apply my-[6px];
        @screen md {
            @apply my-[10px];
        }
        label {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            @apply text-black mb-[14px] flex items-center gap-x-[12px];
            @screen md {
                @apply mt-[18px];
            }
        }
    }
</style>
