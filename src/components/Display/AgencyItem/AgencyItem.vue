<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Map from '@/components/Icon/Map.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { PropType } from 'vue';
    interface agencyType {
        id: number;
        logo: string;
        name: string;
        personalNumber: number;
        address: string;
    }

    defineProps({
        agencyData: {
            type: Object as PropType<agencyType>,
            required: true,
        },
    });
</script>
<template>
    <div class="agency-item">
        <figure class="agency-item__left">
            <img
                src="@/static/images/bg-suggestion-card.png"
                alt="agency logo"
            />
        </figure>
        <div class="agency-item__right">
            <div class="header">
                <Title type="h4" :label="agencyData.name" weight="bold" />
                <Button
                    @on-click="$emit('on-choose-agency', agencyData)"
                    typeButton="primary"
                    width="66px"
                    htmlType="button"
                >
                    Voir plus
                </Button>
            </div>
            <Paragraphe>
                Nombre de personnel:
                <span>{{ agencyData.personalNumber }}</span>
            </Paragraphe>
            <div class="address">
                <Map fill="#606060" />
                <Paragraphe>
                    {{ agencyData.address }}
                </Paragraphe>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .agency-item {
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
        @apply flex gap-[14px] p-[14px] rounded-[8px] pl-0;
        &__left {
            @apply min-w-[75px] w-[75px] h-[75px];
            img {
                @apply w-full h-full rounded-[4px];
            }
        }
        &__right {
            @apply flex flex-col w-full gap-[10px];
            .header {
                @apply flex justify-between;
                &:deep() {
                    div {
                        button {
                            @apply p-0 font-normal text-[12px];
                        }
                    }
                }
            }
            .address {
                @apply flex gap-1 items-center;
                &:deep() {
                    p {
                        @apply font-normal text-[12px] sm:text-[14px];
                        line-height: 16px;
                        color: var(--color-primary);
                    }
                }
                svg {
                    color: #606060;
                }
            }
            span {
                font-weight: bold;
            }
        }
    }
</style>
