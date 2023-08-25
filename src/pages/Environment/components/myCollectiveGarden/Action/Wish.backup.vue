<template>
    <div class="wish">
        <Title
            type="h3"
            label="Je souhaite que l’action envisagée fasse l’objet d’une consultation préalable"
            class="wish__title"
        />
        <hr class="__hr" />
        <div class="wish__items">
            <Title
                type="h3"
                label="Sélectionner les parties qui participeront à la consultation"
                class="wish__subtitle"
            />
            <hr class="__hr" />
            <div class="wish__items-checkbox">
                <CheckBox
                    v-for="(item, index) in checkboxData"
                    :key="index"
                    :name="item.name"
                    :label="item.label"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { ref } from 'vue';

    interface ItemsData {
        label: string;
        name: string;
    }

    const checkboxData = ref<ItemsData[]>([
        {
            label: 'Initiateurs',
            name: 'initiateurs',
        },
        {
            label: 'Porteurs',
            name: 'porteurs',
        },
        {
            label: 'Animateurs',
            name: 'animateurs',
        },
        {
            label: 'Participants',
            name: 'participants',
        },
    ]);
</script>

<style lang="scss" scoped>
    .wish {
        @apply flex flex-col gap-[14px];
        &__title {
            @apply text-[14px] text-secondary font-[600] leading-[17px];
        }
        &__subtitle {
            @apply text-[14px] text-black font-[600] leading-[17px];
        }
        &__items {
            @apply flex flex-col gap-[14px];
        }
        &__items-checkbox {
            @apply flex flex-col gap-[14px];
            &:deep() {
                .ant-checkbox-wrapper {
                    @apply text-black;
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
