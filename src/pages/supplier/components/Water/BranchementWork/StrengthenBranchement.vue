<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            :borderBottom="true"
            class="supplier-work"
        >
            <div class="supplier-work__container">
                <Title
                    type="h2"
                    weight="600"
                    label="Renforcer le branchement"
                    class="supplier-work__head-title"
                />

                <hr class="__hr" />

                <div class="supplier-work__items">
                    <div class="supplier-work__item-supplier">
                        <span class="font-[600]"
                            >Gestionnaire de réseau de distribution</span
                        >
                        <Button>{{ supplier }}</Button>
                    </div>
                    <!-- TABLEAU -->
                    <WaterTabs
                        :relativeWork="moveBranchementData"
                        :supplier="supplier"
                    />
                </div>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Download from '@/components/Icon/Download.vue';
    import { computed, onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import WaterTabs from '../WaterTabs.vue';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const props = defineProps<{
        relativeWorkConnection: any[];
        supplier: string;
    }>();

    const moveBranchementData = ref<any>(null);

    onMounted(() => {
        extractValue();
    });

    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },

        {
            label: 'Eau',
        },
        {
            label: 'Travaux relatifs au branchement',
        },
    ];

    function extractValue() {
        moveBranchementData.value = props.relativeWorkConnection
            .filter((item) => item.key === 'Renforcer le branchement')
            .at(-1);
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
    }

    .__hr {
        @apply text-gray w-full;
    }
</style>
