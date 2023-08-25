<template>
    <div>
        <MainCard
            :button="false"
            :dataBreadcrumbs="breadcrumbListsData"
            :borderBottom="true"
            class="supplier-work"
        >
            <div class="supplier-work__container">
                <Title
                    type="h2"
                    weight="600"
                    label="Interruption de courant"
                    class="supplier-work__head-title"
                />
                <hr class="__hr" />
                <SupplierNameInfo />
                <div class="supplier-work__items">
                    <Alert class="report-alert">
                        Une alerte vous sera envoyée en cas d’interruption
                        programmée de courant
                    </Alert>
                    <div class="link">
                        <RoundLink /><a
                            href="https://www.fluvius.be/nl/meer-weten/stroomonderbrekingen"
                            >Poursuivre le lien</a
                        >
                    </div>
                </div>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import SupplierNameInfo from '../../SupplierNameInfo.vue';
    import RoundLink from '@/components/Icon/RoundLink.vue';
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },
        {
            label: 'Eléctricité',
        },
        {
            label: 'Travaux relatifs au compteur',
        },
    ];
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
            display: flex;
            flex-direction: column;
            // align-items: center;
            gap: 18px;
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
    .report-alert {
        width: 100%;
        span {
            font-weight: 600;
        }
    }
    .link {
        @apply flex gap-[18px] items-center;
        a {
            color: var(--color-primary);
        }
    }
</style>
