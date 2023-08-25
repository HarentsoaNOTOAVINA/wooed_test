<template>
    <div class="bike__container">
        <div v-for="(item, index) in dataBikes" :key="index">
            <template v-if="item.country === props.country">
                <Paragraphe type="bold">
                    {{ item.path.name }}
                </Paragraphe>
                <div
                    v-if="item.path.link"
                    @click="handleClick(item.path.link)"
                    class="bike__items"
                >
                    <div class="bike__content">
                        <Icon icon-name="SaveAs" />
                        <span>Acceder au site</span>
                    </div>
                    <Icon icon-name="ArrowNext" />
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { ref } from 'vue';
    import { dataFindBikes, itemsFindBike } from './data';

    const breadcrumbListsData = [
        {
            url: '/mobilite',
            label: 'Mobilité',
        },
        {
            label: 'Vélos',
            url: '/velos',
        },
        {
            label: 'Enregistrer',
        },
    ];

    const props = defineProps({
        country: {
            type: String,
        },
    });

    const dataBikes = ref<itemsFindBike[]>(dataFindBikes);

    const handleClick = function (link: any) {
        (window as any).open(link, '_blank');
    };
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .bike {
        &__container {
            @apply flex flex-col gap-y-[18px];
        }
        &__items {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            cursor: pointer;
            @apply bg-white text-grayIcon flex items-center justify-between p-[16px] border border-gray rounded-[4px];
            @include hoverButtonDark;
        }
        &__content {
            @apply flex items-center gap-x-[16px];
        }
    }
</style>
