<template>
    <div class="communityCard__section">
        <Card class="communityCard__container">
            <div class="communityCard__head-items">
                <Title
                    class="communityCard__title"
                    :label="labelTitle"
                    type="h2"
                    weight="600"
                />
            </div>
            <hr class="__hr" />
            <div :class="[button === true ? 'communityCard__items-wrap-btn' : 'communityCard__items-wrap']">
                <slot />
            </div>
            <div v-if="(button === true)" :class="[fieldRequired === true ? 'communityCard__fielRequired' : '']" class="communityCard__btn-foot">
                <span v-if="fieldRequired === true" class="communityCard__fielRequired--content">(*) champ obligatoire</span>
                <Button 
                    type-button="secondary" 
                    class="btn-foot"  
                    :disabled="disableSubmitButton"
                    @on-click="handleClick"
                >
                    <span>
                        <LoadingButton 
                            size="xs"
                            v-if="props.loading"
                        />
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
            default: true
        },
        loading : {
            type : Boolean,
            default : false
        }
    });

    const emit = defineEmits(['onClick'])

    function handleClick(){
        emit('onClick')
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .communityCard {
        &__section {
            @apply container mt-[18px];
            @screen md {
                height: calc(100vh - 94px);
                @apply flex-1;
            }
        }
        &__container {
            @apply h-full w-full p-[18px];
        }
        &__head-items {
            @apply hidden;
            & + .__hr {
                @apply hidden;
            }
            @screen md {
                @apply flex justify-between mt-0 mb-[18px];
                & + .__hr {
                    @apply block;
                }
            }
        }
        &__items-wrap {
            @screen md {
                @apply px-[14px] -mx-[14px] pt-[18px];
                height: calc(100vh - 174px);
                @apply overflow-y-auto;
                @include scrollbar;
            }
        }
        &__items-wrap-btn {
            @screen md {
                @apply px-[14px] -mx-[14px] pt-[18px];
                height: calc(100vh - 250px);
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
            @apply flex justify-end mt-10;
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
    }

    .__hr {
        @apply text-gray w-full;
    }
</style>
