<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" :button="true" class="document">
            <div class="document__container">
                <Title type="h3" label="Document" class="document__title" />
                <hr class="__hr" />
                <div class="document__items">
                    <div class="document__pdf">
                        <PdfViewer :button-label="'Valider'" :pdf-url="pdfPath" @save="handlePdfFile" />
                    </div>
                    <div class="info-list">
                        <div>
                            <span class="text-black">
                                Il est obligatoirement accompagné des documents
                                suivants :
                            </span>
                            <ul class="list-disc pl-[20px]">
                                <li>
                                    une photocopie recto/verso de la carte
                                    d'identité ;
                                </li>
                                <li>un certificat de résidence.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <template #buttonFooter>
                <div class="document__nav-buttons">
                    <Button type-button="border" class="btn-foot" @click="handleNavigation(ProjectDisplay)">
                        Précedent
                    </Button>
                    <Button type-button="secondary" class="btn-foot" @click="handleNavigation(Action)">
                        Suivant
                    </Button>
                </div>
            </template>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
import Title from '@/components/Common/Title/Title.vue';
import MainCard from '@/components/Display/MainCard/MainCard.vue';
import Action from '@/pages/Environment/components/myCollectiveGarden/Action.vue';
import ProjectDisplay from '@/pages/Environment/components/myCollectiveGarden/ProjectDisplay.vue';
import Button from '@/components/Common/Button/Button.vue';
import PdfViewer from "@/components/Display/pdfViewer/pdfViewerContainer.vue";
import { shallowRef } from 'vue';

import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();

const pdfPath = `${window.location.origin}/pdfImmo/toSearch/environment/attributionParcelle/Reglement-JARDINS-BIOLOGIQUES-FR.pdf`; // TODO: update this pdfPath Once Nix finished work on it

const breadcrumbListsData = [
    {
        label: 'Jardin collectif',
        url: `/environnement/${route.params.id}/jardin-collectif`
    },
    {
        label: 'Mes jardin collectifs',
    },
];

function handleNavigation(value: any) {
    store.commit("CollectiveGardenModule/updateActiveDisplay", shallowRef(value))
}

function handlePdfFile(value: any) {
    console.error(value); // TODO: update after working on line 57 comment
}
</script>

<style lang="scss" scoped>
.document {
    &__container {
        @apply flex flex-col gap-[14px] mb-[18px];
    }

    &__title {
        @apply text-[14px] text-primary font-[600] leading-[17px];
    }

    &__items {
        @apply flex flex-col gap-[14px];

        .info-list {
            @apply bg-gray text-grayIcon rounded-[8px] p-[18px] flex flex-col gap-[24px];
        }
    }

    &__nav-buttons {
        @apply w-full flex justify-end gap-x-4;

        .btn-foot {
            @apply w-1/2 font-semibold rounded-full my-2 py-1;

            @screen md {
                @apply w-auto;
            }
        }
    }
}

.__hr {
    @apply text-gray w-full;
}
</style>
