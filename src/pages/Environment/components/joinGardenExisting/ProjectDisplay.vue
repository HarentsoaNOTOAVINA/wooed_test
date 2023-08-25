<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" :button="true" class="projectDisplay">
            <div class="projectDisplay__container">
                <Title type="h3" label="Présentation du projet" class="projectDisplay__title" />
                <hr class="__hr" />
                <ProjectDisplayItems />
            </div>
            <template #buttonFooter>
                <div class="projectDisplay__nav-buttons">
                    <Button type-button="border" class="btn-foot" @click="handleNavigation(Actor)">
                        Précedent
                    </Button>
                    <Button type-button="secondary" class="btn-foot" @click="handleNavigation(RequestInformation)">
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
import ProjectDisplayItems from '@/pages/Environment/components/collectiveGardenComponents/ProjectDisplayItems.vue';
import Actor from '@/pages/Environment/components/joinGardenExisting/Actor.vue';
import RequestInformation from '@/pages/Environment/components/joinGardenExisting/RequestInformation.vue';
import Button from '@/components/Common/Button/Button.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();

const currentProperty = route.params.id;

const breadcrumbListsData = [
    {
        label: 'Jardin collectif',
        url: `/environnement/${currentProperty}/jardin-collectif`
    },
    {
        label: 'Joindre un jardin collective existant',
    },
];

function handleNavigation(value: any) {
    store.commit("CollectiveGardenModule/updateActiveDisplay", value);
}
</script>

<style lang="scss" scoped>
.projectDisplay {
    &__container {
        @apply flex flex-col gap-[14px] mb-[18px];
    }

    &__title {
        @apply text-[14px] text-primary font-[600] leading-[17px];
    }

    &__subtitle {
        @apply text-[14px] text-secondary font-[600] leading-[17px];
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
