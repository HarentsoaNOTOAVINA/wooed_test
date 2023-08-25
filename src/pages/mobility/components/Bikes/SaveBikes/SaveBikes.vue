<template>
    <div class="bike__container">
        <template v-for="(b, bIndex) in dataBikes"
                :key="bIndex">
                <template v-if="b.country === props.country">
                    <div v-for="(item, index) in b.paths"
                        :key="index">
                        <Paragraphe>{{item.information}}</Paragraphe>
                        <div
                            @click="handleClick(item.path)"
                            class="bike__items"
                            v-if="item.path"
                        >
                            <div class="bike__content">
                                <Icon icon-name="SaveAs" />
                                <span>{{ item.name }}</span>
                            </div>
                            <Icon icon-name="ArrowNext" />
                        </div>
                    </div>
                </template>
        </template>
    </div>
</template>
<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { ref } from 'vue';
    import { dataMenu, menuItems } from './data';

    const dataBikes = ref<menuItems[]>(dataMenu);

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

    const handleClick = function(link: any) {
      (window as any).open(link, '_blank')
    }
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
            margin-top: 10px;
            @apply bg-white text-grayIcon flex items-center justify-between p-[16px] border border-gray rounded-[4px];
            @include hoverButtonDark;
        }
        &__content {
            @apply flex items-center gap-x-[16px];
        }
    }
</style>
