<template>
    <CardWrapper class="cardResource">
        <Title type="h4" :label="data.title" class="cardResource__title" />
        <hr class="__hr" />
        <div v-for="(item, index) in data.cardItem" :key="index" class="cardResource__content">               
                
            <div class="cardResource__content-wrap">
                <div class="cardResource__content-item">
                    <label v-if="item.labelField">{{
                        item.labelField
                    }}</label>
                    <div v-if="data.select" class="select-input">
                        <Select 
                            :mode="data.select.mode" 
                            name="category" 
                            placeholder="Select"
                            :options="data.select.options" 
                            @change-select="handleChange" 
                        />
                    </div>
                    <Input 
                        v-else 
                        nameInput="category" 
                        placeholder="" 
                        @input="handleChange" 
                    />
                </div>
                <div v-if="data.inputField" class="cardResource__content-item" />
                <div v-if="data.inputField" class="cardResource__content-item">
                    <label>Désignation</label>
                    <Input 
                        nameInput="name"
                        @input="handleChange" 
                    />
                </div>
                <div class="cardResource__content-item">
                    <label>Quantité</label>
                    <Input 
                        nameInput="quantity" 
                        placeholder="00" 
                        inputType="number"
                        @input="handleChange" 
                    />
                </div>
            </div>
            <div class="cardResource__form-upload">
                <label>
                    <span class="font-[600]"> Documents </span>
                </label>
                <UploadImage name="fileList" :needBase64="false" @upload-file-list="handleUpload" />
            </div>
        </div>
        <hr class="__hr" />
        <div class="cardResource__button">
            <Button type-button="secondary" class="cardResource__button-add" @click="handleNew">

                Nouveau
            </Button>
            <Button type-button="secondary" class="cardResource__button-valid" @click="submitForm">
                <!-- <LoadingButton size="xs" /> -->
                Valider
            </Button>
        </div>
        <Modal :is-show-modal="warnUser.value" @on-back="handleWarning('cancel')" :width="screenType >= 1024 ? '800' : '520'"
            title="Attention">
            <template #content>
                <div class="text-center">
                    Les données sur ce formulaire ne sont pas encore enregistrés
                    <br>
                    <br>
                    <strong>Souhaitez-vous continuer?</strong>
                </div>
                <div class="modal__btn-container">
                    <Button type-button="primary-cancel" @click="handleWarning('cancel')">
                        Annullé
                    </Button>
                    <Button type-button="primary" @click="handleWarning('confirm')">
                        Confirmé
                    </Button>
                </div>
            </template>
        </Modal>
    </CardWrapper>
</template>

<script lang="ts" setup>
import Button from '@/components/Common/Button/Button.vue';
import Input from '@/components/Common/Input/Input.vue';
import Select from '@/components/Common/Select/Select.vue';
import Title from '@/components/Common/Title/Title.vue';
import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
import Modal from '@/components/Display/Modal/Modal.vue';
import LoadingButton from '@/components/Icon/LoadingButton.vue';

import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

const screenType = ref<number>(screen.width);

const store = useStore();

interface ItemsData {
    id?: number | string;
    name?: string | any;
}

interface IwarnData {
    value?: boolean,
    idx?: number
}
const numberDefault = ref<number>(0);
const itemsData = ref<ItemsData[]>([{}]);
const props = defineProps({
    data: {
        type: Object,
        default: {},
    },
});

const warnUser : IwarnData = computed(() => store.getters["CollectiveGardenModule/getWarning"]);

const rows = { minRows: 6, maxRows: 10 };


function handleNew() {
    store.dispatch("CollectiveGardenModule/checkResource", { type: props.data.type });
}

function handleWarning(value: string) {
    if (value === 'confirm') {
        let warnUser : IwarnData = store.getters["CollectiveGardenModule/getWarning"];
        store.commit("CollectiveGardenModule/removeCurrentResource", warnUser.idx);
    }
    store.commit("CollectiveGardenModule/updateWarningStatus", false);
}

function handleChange(value: any) {
    let payload = { ...{ type: props.data.type }, ...value };
    store.dispatch("CollectiveGardenModule/setResourceData", payload);
}

function handleUpload(value: any) {
    let payload: any[] = [];
    if (value.length) value.forEach((element: any) => payload.push({ file: element }));
    handleChange({ documents: payload })
}

async function submitForm(value: any) {
    await store.dispatch("CollectiveGardenModule/postProjectResources", { type: props.data.type });
}
</script>

<style lang="scss" scoped>
.cardResource {
    @apply flex flex-col gap-[18px] p-[14px];

    &__title {
        @apply text-[14px] text-secondary font-[600] leading-[17px];
    }

    &__subtitle {
        @apply text-[14px] text-primary font-[600] leading-[17px];
    }

    &__content {
        @apply flex flex-col gap-[14px];

        @screen md {
            @apply gap-[18px];
        }

        &-wrap {
            @apply grid grid-cols-1 gap-[14px];

            @screen lg {
                @apply grid-cols-2;
            }
        }

        &-item {
            @apply flex flex-col gap-[10px];
        }

        &:deep() {
            .custom-select__wrapper {
                @apply mb-0;
            }

            .custom-input__fields {
                @apply mb-0;
            }

            label {
                @apply text-[14px] text-black font-[600] leading-[17px];
            }
        }
    }

    &__form-upload {
        @apply flex flex-col gap-[10px];

        &:deep() {
            &>span {
                @apply flex flex-col gap-[10px];
            }
        }
    }

    &__button {
        @apply flex justify-between gap-[10px] w-full;

        &:deep() {

            &>div,
            button {
                @apply w-full;
            }

            .cardResource__button-add {
                button {
                    @apply bg-gray border-gray border-solid border-[1px] text-primary;
                }
            }

            .cardResource__button-valid {
                button {
                    @apply border-primary bg-primary;
                }
            }

            @screen sm {
                @apply justify-end;

                &>div,
                button {
                    @apply w-auto;
                }
            }
        }
    }
}

.modal {
    &__btn-container {
        @apply flex gap-x-[18px] justify-center py-4;
    }
}

.__hr {
    @apply text-gray;

    &--white {
        @apply text-white;
    }
}

.ant-select-selection-item-content {
    &:deep() {
        @apply my-4;
    }
}

.ant-select-selection-overflow-item {
    &:deep() {
        height: min-content;
    }
}

.ant-select-multiple .ant-select-selection-item {
    &:deep() {
        @apply my-4;
        width: min-content;
    }
}
</style>
