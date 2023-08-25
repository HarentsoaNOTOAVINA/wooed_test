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
                    label="Je n'ai plus de gaz: que faire?"
                    class="supplier-work__head-title"
                />

                <hr class="__hr" />

                <div class="supplier-work__items">
                    <SupplierNameInfo />

                    <div class="supplier-work__item-text">
                        <div>
                            <Paragraphe class="text-info"
                                >Votre compteur de gaz se trouve à l'extérieur
                                (coffret) ou dans un local commun
                                (appartements)</Paragraphe
                            >
                            <Paragraphe class="text-info"
                                >Vous avez plusieurs appareils au gaz
                                naturel</Paragraphe
                            >
                        </div>
                        <ul>
                            <li>
                                Si c'est le cas, fermez le robinet de l'ensemble
                                de vos appareils avant de rouvrir celui de votre
                                compteur de gaz. Ensuite, vous pouvez remettre
                                l'ensemble de vos appareils en service
                            </li>
                            <li>
                                Si non, votre appareil s'est peut-être éteint
                                (il suffit alors de le remettre en service) ou
                                il est peut-être en panne
                                <span
                                    ><a
                                        href="https://www.ores.be/faq/fr?sec=pannes-et-interruptions&cat=plus-d-electricite-ou-de-gaz&sub=coupure-de-courant-ou-de-gaz&q=je-n-ai-plus-de-gaz-que-faire"
                                        >(contactez votre chauffagiste )</a
                                    ></span
                                >
                            </li>
                        </ul>
                        <Paragraphe
                            >Si l'un d'eux ne fonctionne pas, vérifiez si les
                            autres (cuisinière, chaudière, chauffe-eau,
                            chauffage individuel) fonctionnent Si oui, votre
                            appareil s'est peut-être éteint (il suffit alors de
                            le remettre en service) ou il est peut-être en
                            panne. Si non, fermez le robinet de l'ensemble de
                            vos appareils au gaz et fermez aussi le robinet de
                            votre compteur de gaz. Appelez le
                            <span>078/78.78.00</span></Paragraphe
                        >
                    </div>
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
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import SupplierNameInfo from '../../SupplierNameInfo.vue';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },
        {
            label: 'Gaz',
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
        &__item-text {
            @apply flex flex-col gap-[18px] mb-[18px];
            .text-info {
                color: var(--color-primary);
                font-weight: 500;
            }
            span {
                color: var(--color-primary);
                font-weight: 500;
            }
            ul {
                list-style-type: disc;
                list-style-position: inside;
            }
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
</style>
