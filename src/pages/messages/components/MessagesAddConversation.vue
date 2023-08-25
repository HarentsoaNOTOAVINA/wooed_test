<template>
    <Modal
        title="Nouveau message"
        :isShowModal="isShowModal"
        @onBack="$emit('close')"
    >
        <template #content>
            <div class="wrap-form-add">
                <SelectAutoComplet
                    placeholder="Ajouter nouveau discussion"
                    name="user"
                    :options="options"
                    :has-sub-title="false"
                    mb="15px"
                    @change-select="handleChangeSelect"
                >
                    <div v-for="item in options" :key="item.id">
                        {{ item.label }} <span>{{ item.mail }}</span>
                    </div>
                </SelectAutoComplet>
                <TextArea
                    label="Message"
                    placeholder="Ecrivez..."
                    name-input="content"
                    @handle-change="handleChange"
                />
                <div class="btn-add">
                    <Button
                        @on-click="$emit('close')"
                        type-button="primary-cancel"
                        >Annuler</Button
                    >
                    <Button @on-click="handleAddNewConversation"
                        ><LoadingButton size="xs" v-if="laoding" />
                        Envoyer</Button
                    >
                </div>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import SelectAutoComplet from '@/components/Common/SelectAutoComplet/SelectAutoComplet.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import store from '@/store';
    import { MessagesService } from '@/services/messageService';
    import { ref, watch, onBeforeMount } from 'vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    interface Options {
        value: string;
        label?: string;
        id?: any;
        mail?: string;
    }

    const props = defineProps({
        showModal: {
            type: Boolean,
            default: false,
        },
    });

    const isShowModal = ref<boolean>(props.showModal);
    const laoding = ref<boolean>(props.showModal);
    const params = ref<any>({});
    const options = ref<Array<Options>>([]);

    onBeforeMount(() => {
        getOptionValue();
    });

    watch(
        () => props.showModal,
        (bool) => {
            isShowModal.value = bool;
        },
        { immediate: true }
    );

    watch(
        () => store.getters['UserModule/getAllUser'],
        (value) => {
            if (isShowModal.value) getOptionValue();
        },
        { immediate: true }
    );

    const getOptionValue = function () {
        const optionsValue = store.getters['UserModule/getAllUser'];
        let newArray: Array<{
            value: string;
            label?: string;
            id: any;
            mail?: string;
        }> = [];

        if (optionsValue && optionsValue.length > 0) {
            optionsValue.forEach((element: any, key: any) => {
                newArray = [
                    ...newArray,
                    {
                        value: element.name + ' ' + element.email,
                        label: element.name,
                        id: element.id,
                        mail: element.email,
                    },
                ];
            });
            options.value = newArray;
        }
    };

    const handleChangeSelect = function (value: any, option: any) {
        params.value = {
            ...params.value,
            user: option.id,
        };
        console.log(params.value);
    };

    const handleChange = function (value: object) {
        params.value = {
            ...params.value,
            lastMessage: {
                ...value,
            },
        };
    };

    const handleAddNewConversation = async function () {
        console.log(params.value);
        try {
            laoding.value = true;
            await MessagesService.addNewConversation({
                participants: [
                    { user: store.getters['UserModule/getUserDetails'].id },
                    { user: params.value.user },
                ],
                lastMessage: params.value.lastMessage,
            });
        } catch (error) {
        } finally {
            laoding.value = false;
            isShowModal.value = false;
        }
    };
</script>

<style lang="scss" scoped>
    .btn-add {
        @apply flex justify-end gap-[10px] mt-[20px];
    }
    .wrap-form-add {
        &:deep {
            .ant-select-arrow {
                display: none;
            }
            .ant-select-single:not(.ant-select-customize-input)
                .ant-select-selector {
                @apply pl-[35px] relative;
                &:after {
                    content: 'A :';
                    position: absolute;
                    left: 11px;
                    height: 100%;
                    width: 25px;
                    @apply flex items-center;
                    visibility: visible;
                }
            }
            .ant-select-show-search.ant-select:not(.ant-select-customize-input)
                .ant-select-selector
                input {
                padding-left: 25px;
            }
        }
    }
</style>
