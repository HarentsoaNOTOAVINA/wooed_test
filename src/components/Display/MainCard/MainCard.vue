<template>
    <div class="mainCard">
        <Card class="mainCard__container">
            <div
                class="mainCard__head-items"
                :class="editIcon === true ? 'pr-[40px]' : ''"
            >
                <Icon
                    v-if="goBack"
                    icon-name="ArrowBack"
                    class="mainCard__head-icon go-back"
                    @click="goBackTo"
                />
                <!-- <BreadCrumb :items="dataBreadcrumbs" class="mainCard__breadcrumb" /> -->
                <BreadCrumb
                    :items="dataBreadcrumbs"
                    @handle-return="returnClick"
                    class="mainCard__breadcrumb"
                />
                <Icon
                    v-if="editIcon === true"
                    icon-name="Edit"
                    class="mainCard__head-icon"
                />
            </div>
            <hr class="__hr" />
            <div
                :class="[
                    button === true
                        ? 'mainCard__items-wrap-btn'
                        : 'mainCard__items-wrap',
                ]"
            >
                <slot />
            </div>
            <hr v-if="borderBottom === true" class="__hr" />
            <div
                v-if="button === true"
                :class="[
                    fieldRequired === true ? 'mainCard__fielRequired' : '',
                ]"
                class="mainCard__btn-foot"
            >
                <span
                    v-if="fieldRequired === true"
                    class="mainCard__fielRequired--content"
                    >(*) champ obligatoire</span
                >
                <template v-if="labelButton">
                    <Button
                        v-if="modal === false"
                        type-button="secondary"
                        class="btn-foot"
                        :disabled="disableSubmitButton"
                        @click="handleClick"
                    >
                        <span>
                            <LoadingButton size="xs" v-if="props.loading" />
                            {{ labelButton }}
                        </span>
                    </Button>
                    <Button
                        v-else
                        type-button="secondary"
                        class="btn-foot"
                        @click="buttonClick"
                    >
                        <span>
                            <LoadingButton size="xs" v-if="props.loading" />
                            {{ labelButton }}
                        </span>
                    </Button>
                </template>
                <slot name="buttonFooter" />
            </div>
        </Card>
        <Modal
            @on-back="showModal = false"
            :title="modalTitle"
            :is-show-modal="showModal"
        >
            <template #content>
                <slot name="modalContent" />
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
    import Card from '@/components/Display/Card/Card.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref, watch, watchEffect } from 'vue';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Modal from '../Modal/Modal.vue';

    const breadcrumbLists = ref<Object>([]);
    const showModal = ref<boolean>(false);

    const props = defineProps({
        labelTitle: {
            type: String,
            default: '',
        },
        button: {
            type: Boolean,
            default: false,
        },
        labelButton: {
            type: String,
            default: '',
        },
        fieldRequired: {
            type: Boolean,
            default: false,
        },
        disableSubmitButton: {
            type: Boolean,
            default: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        backLink: {
            type: String,
            default: '/',
        },
        backLabel: {
            type: String,
            default: 'Accueil',
        },
        dataBreadcrumbs: {
            type: Array,
            default: [],
        },
        editIcon: {
            type: Boolean,
            default: false,
        },
        borderBottom: {
            type: Boolean,
            default: false,
        },
        modal: {
            type: Boolean,
            default: false,
        },
        modalTitle: {
            type: String,
            default: '',
        },
        modalState: {
            type: Boolean,
            default: false,
            required: false,
        },
        goBack: {
            type: Boolean,
            default: false,
        }
    });

    const emit = defineEmits<{
        (event: 'onClick'): void;
        (event: 'on-emit-modal-state', value: boolean): void;
        (event: 'handleClickReturn', value: any): void;
        (event: 'go-back'): void;
    }>();

    watch(
        () => props.modalState,
        (v) => {
            showModal.value = v;
        },
        { immediate: true }
    );

    watch(
        () => showModal.value,
        (v) => {
            emit('on-emit-modal-state', v);
        },
        { immediate: true }
    );

    function handleClick() {
        emit('onClick');
    }

    const buttonClick = (value: object) => {
        showModal.value = true;
    };

    function returnClick(value: any) {
        emit('handleClickReturn', value);
    }
    
    function goBackTo() {
        emit('go-back');
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .mainCard {
        &:deep() {
            .custom-loader {
                @apply w-full bg-white;
            }
        }
        max-width: 945px;
        @apply mx-auto relative;
        @screen md {
            height: calc(100vh - 94px);
            @apply flex-1 mb-0;
        }
        &__container {
            @apply h-full w-full p-[14px];
            @screen md {
                @apply p-[18px];
            }
        }
        &__head-items {
            @apply relative flex justify-between mt-0 mb-[18px];
            &:deep() {
                .bread {
                    @apply p-0;
                }
            }

            @screen md {
            }
        }
        &__items-wrap {
            @apply pt-[14px];
            @screen md {
                @apply px-[14px] -mx-[14px] pt-[18px];
                height: calc(100vh - 174px);
                @apply overflow-y-auto;
                @include scrollbar;
            }
        }
        &__items-wrap-btn {
            @apply pt-[10px];
            @screen md {
                @apply px-[14px] -mx-[14px] pt-[18px];
                height: calc(100vh - 218px);
                @apply overflow-y-auto;
                @include scrollbar;
            }
        }
        &__title {
            @apply text-[14px] text-grayIcon;
            @screen md {
                @apply text-[16px];
            }
        }
        &__button {
            @apply mb-[18px];
        }
        &__btn-foot {
            @apply flex justify-end mt-[14px];
            .btn-foot {
                @apply w-full;
                @screen sm {
                    @apply w-auto;
                }
            }
            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
        &__fielRequired {
            @apply flex flex-col;
            @screen sm {
                @apply flex flex-row justify-between items-center;
            }
        }
        &__fielRequired--content {
            @apply block mb-[14px];
            @screen sm {
                @apply mb-[0];
            }
        }
        &__head-icon {
            @apply absolute right-0 top-[50%] -translate-y-[50%] bg-white w-[38px] h-[38px] rounded-full flex items-center justify-center cursor-pointer;
            @include hoverButtonDark;
            &.go-back {
                @apply static transform-none m-[-8px] mr-[4px];
            }
            &:deep() {
                svg {
                    @apply w-[14px] h-[14px];
                }
            }
        }
        &__breadcrumb{
            @apply w-full;
        }
        &:deep() {
            .bread {
                .ant-breadcrumb > span {
                    @apply text-grayIcon;
                }
                .ant-breadcrumb > span:last-child {
                    @apply font-[600];
                }
            }
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
</style>
