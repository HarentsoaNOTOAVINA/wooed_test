<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            class="myConnection"
            labelButton="Raccordement à l'eau"
        >
            <div class="supplier-work__container">
                <Title
                    type="h2"
                    weight="600"
                    label="Mon raccordement"
                    class="supplier-work__head-title"
                />

                <hr class="__hr" />
                <Collapse
                    :onShowControlAgree="showControlAgree"
                    :collapseData="collapseData"
                    @set-component="setComponent"
                />
                <ControlAgree v-if="isShow" />
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import { computed, onMounted, ref, shallowRef } from 'vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Collapse from '@/components/Display/Collapse/Collapse.vue';
    import RunningWaterConnection from './RunningWaterConnection.vue';
    import NoWaterConnection from './NoWaterConnection.vue';
    import ControlAgree from './ControlAgree.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const isShow = ref<boolean>(false);

    const collapseData = [
        {
            title: 'Mon bien dispose d’un raccordement à l’eau courante',
            content: RunningWaterConnection,
        },
        {
            title: 'Mon bien ne dispose pas d’un raccordement à l’eau courante',
            content: NoWaterConnection,
        },
    ];
    const components = shallowRef<any>();

    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },

        {
            label: 'Eau',
        },
    ];

    function setComponent(index: any) {
        components.value = collapseData[index].content;
    }

    function showControlAgree(value: boolean) {
        isShow.value = value;
    }
</script>

<style lang="scss" scoped>
    .supplier-work {
        &__container {
            @apply flex flex-col gap-[18px] mb-[18px];
        }
        &__head-title {
            @apply text-[16px] text-grayIcon;
        }
        &__items {
            @apply flex flex-col gap-[18px];
            &--connection {
                @apply flex justify-between items-center;
            }
            &--consumption {
                @apply flex items-center gap-[4px] p-[7px] rounded-[4px] bg-gray text-primary cursor-pointer;
            }
        }
        &__item-supplier {
            @apply flex justify-between items-center px-[14px] py-[12px] rounded-[4px] bg-gray;
            &:deep() {
                button {
                    @apply text-[10px] px-[14px] py-[4px];
                }
            }
        }
        &__item-list {
            @apply flex flex-col gap-[18px];
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
    .map {
        height: 60vh;
        width: 100%;
    }
</style>
