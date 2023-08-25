<template>
    <MainCard
        :button="true"
        :border-bottom="true"
        :dataBreadcrumbs="[{ label: title }]"
        class="addContainer"
    >
        <div class="addContainer__wrap">
            <slot />
        </div>
        <template #buttonFooter>
            <div class="footerCard">
                <span class="footerCard__required-label">
                    (<span class="text-red">*</span>) champ obligatoire
                </span>
                <div class="footerCard__btn" v-if="isBtn">
                    <Button
                        v-if="controlButton.stepCurrent > 1"
                        type-button="border"
                        @click="prev"
                    >
                        Precedent
                    </Button>
                    <!-- <a-popconfirm
                        title="Voulez-vous publié cette annonce ?"
                        @cancel=""
                        @confirm="handleFinish"
                    >
                    </a-popconfirm> -->
                    <Button
                        v-if="
                            controlButton.stepCurrent ===
                            controlButton.stepLength
                        "
                        type-button="secondary"
                        @click="finished"
                    >
                        <!-- <LoadingButton size="xs" v-if="loadingFinish" /> -->
                        Terminer
                    </Button>
                    <Button
                        v-else
                        type-button="secondary"
                        :disabled="false"
                        @click="next"
                    >
                        Suivant
                    </Button>
                </div>
            </div>
        </template>
    </MainCard>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { Popconfirm as APopconfirm, notification } from 'ant-design-vue';
    import { ref, defineComponent, inject, watch } from 'vue';

    const props = defineProps({
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
            default: {}
        },
        isBtn: {
            type: Boolean,
            default: true
        }
    });

    const title = ref<string>(props.titleLabel);

    const emit = defineEmits<{
        (event: 'onPrev'): void;
        (event: 'onNext'): void;
        (event: 'onFinished'): void;
    }>();

    function prev() {
        emit('onPrev');
    }

    function next() {
        emit('onNext');
    }

    function finished() {
        emit('onFinished');
    }

    // function handleFinish() {
    //     console.log('Confirmer');
    // }
</script>

<style lang="scss" scoped>
    .addContainer {
        &:deep() {
            .footerCard {
                @apply w-full flex items-center justify-between;
                &__btn {
                    @apply flex items-center gap-[14px];
                    button {
                        @apply min-w-[103px];
                    }
                }
            }
        }
        &__wrap {
            &:deep() {
                .custom-select__wrapper,
                .switch,
                .custom-input__label-icon,
                .ant-space-item {
                    & > label {
                        @apply font-[600] text-grayIcon;
                    }
                }
                .custom-select__wrapper {
                    @apply mb-0;
                }
            }
        }
    }
</style>
