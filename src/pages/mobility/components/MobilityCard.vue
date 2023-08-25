<template>
    <div class="mobilityCard__section">
        <Card class="mobilityCard__container">
            <div
                class="mobilityCard__head-items"
                :class="editIcon === true ? 'pr-[40px]' : ''"
            >
                <BreadCrumb :items="dataBreadcrumbs" />
                <Icon
                    v-if="editIcon === true"
                    icon-name="Edit"
                    class="mobilityCard__head-icon"
                />
            </div>
            <hr class="__hr" />
            <div
                :class="[
                    button === true
                        ? 'mobilityCard__items-wrap-btn'
                        : 'mobilityCard__items-wrap',
                ]"
            >
                <slot />
            </div>
            <div
                v-if="button === true"
                :class="[
                    fieldRequired === true ? 'mobilityCard__fielRequired' : '',
                ]"
                class="mobilityCard__btn-foot"
            >
                <span
                    v-if="fieldRequired === true"
                    class="mobilityCard__fielRequired--content"
                    >(*) champ obligatoire</span
                >
                <Button
                    type-button="secondary"
                    class="btn-foot"
                    :disabled="disableSubmitButton"
                    @click="handleClick"
                >
                    <span>
                        <LoadingButton size="xs" v-if="isLoading" />
                        {{ labelButton }}
                    </span>
                </Button>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref, watch } from 'vue';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';

    const breadcrumbLists = ref<Object>([]);
    const isLoading = ref<boolean>(false)

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
            default: '/mobilite',
        },
        backLabel: {
            type: String,
            default: 'Mobilité',
        },
        dataBreadcrumbs: {
            type: Array,
            default: [],
        },
        editIcon: {
            type: Boolean,
            default: false,
        },
    });
    
    watch(() => props.loading, (bool) => {
        isLoading.value = bool
    })

    const emit = defineEmits(['onClick']);

    function handleClick() {
        emit('onClick');
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .mobilityCard {
        &__section {
            max-width: 945px;
            @apply mx-auto my-[18px] px-[20px];
            @screen md {
                height: calc(100vh - 94px);
                @apply flex-1 mb-0;
            }
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
                height: calc(100vh - 215px);
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
            margin-top: 15px;
            @apply flex justify-end;
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
            &:deep() {
                svg {
                    @apply w-[14px] h-[14px];
                }
            }
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
</style>
