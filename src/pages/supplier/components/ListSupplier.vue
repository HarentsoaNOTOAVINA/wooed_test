<template>
    <div class="listSupplier">
        <CardWrapper
            v-for="(item, index) in listSupplierData"
            :key="index"
            class="listSupplier__container"
        >
            <div class="listSupplier__head">
                <Title
                    type="h3"
                    :label="item.title"
                    class="listSupplier__title"
                />
                <Button @click="redirect(item.url)" type-button="gray"
                    >Souscrire
                </Button>
            </div>
            <hr class="__hr" />
            <div class="listSupplier__info-wrap">
                <div class="listSupplier__info" v-if="item.phone">
                    <Icon icon-name="InfoPhone" />
                    <div class="listSupplier__info-item">
                        <span class="listSupplier__info-title">
                            {{ item.phone }}
                        </span>
                    </div>
                </div>
                <div class="listSupplier__info" v-if="item.url">
                    <Icon icon-name="UrlIcon" />
                    <div class="listSupplier__info-item">
                        <span class="listSupplier__info-title">
                            {{ item.url }}
                        </span>
                    </div>
                </div>
                <div class="listSupplier__info" v-if="item.price">
                    <Icon icon-name="PriceTag" />
                    <div class="listSupplier__info-item">
                        <span class="listSupplier__info-title">
                            {{ item.price }}
                        </span>
                    </div>
                </div>
            </div>
        </CardWrapper>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import { PropType, ref } from 'vue';

    const props = defineProps({
        listSupplierData: {
            type: Array as PropType<any>,
        },
    });

    const emit = defineEmits(['handleOpenForm']);


    function redirect(url: string) {
        if (url && url.includes('@')) {
            emit('handleOpenForm', url);
        } else {
            window.open(`http://${url}`, '_blank');
        }
    }

</script>

<style lang="scss" scoped>
    .listSupplier {
        @apply grid grid-cols-1 gap-[14px];
        @screen sm {
            @apply grid-cols-2;
        }
        @screen md {
            @apply grid-cols-1;
        }
        @screen lg {
            @apply grid-cols-2 gap-[18px];
        }
        &__container {
            @apply flex flex-col gap-[14px];
        }
        &__head {
            @apply flex justify-between;
            &:deep() {
                .ant-ribbon-wrapper {
                    @apply flex items-center justify-between;
                }
                .ant-ribbon {
                    @apply static h-auto rounded-[14px] py-[4px] px-[8px];
                }
                .ant-ribbon-corner {
                    @apply hidden;
                }
                .ant-ribbon-text {
                    color: #ff9800;
                    @apply font-[600] text-[12px];
                }
            }
        }
        &__title {
            @apply text-[14px] font-[600] text-primary;
        }
        &__info {
            @apply flex items-center gap-x-[12px];
            &:deep() {
                svg {
                    @apply w-[18px] h-[18px];
                    path {
                        fill-opacity: 50%;
                        @apply fill-primary;
                    }
                }
            }
            &-wrap {
                @apply flex flex-col gap-[10px];
            }
            &-item {
                @apply flex flex-col gap-y-[5px];
            }
            &-title {
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                @apply inline-block text-grayIcon;
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
