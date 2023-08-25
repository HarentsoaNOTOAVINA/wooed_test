<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" :button="true" class="actor">
            <div class="actor__container">
                <Title type="h3" label="Acteurs" class="actor__title" />
                <hr class="__hr" />
                <ActorItems :cardData="garden.actors" />
            </div>
            <template #buttonFooter>
                <div class="actor__nav-buttons">
                    <Button type-button="border" class="btn-foot" @click="handleNavigation(Pitch)">
                        Précedent
                    </Button>
                    <Button type-button="secondary" class="btn-foot" @click="handleNavigation(ProjectDisplay)">
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
import Button from '@/components/Common/Button/Button.vue';
import Pitch from '@/pages/Environment/components/Pitch.vue';
import ProjectDisplay from '@/pages/Environment/components/joinGardenExisting/ProjectDisplay.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ActorItems from '@/pages/Environment/components/collectiveGardenComponents/ActorItems.vue';

const route = useRoute();
const store = useStore();

const currentProperty = route.params.id

const breadcrumbListsData = [
    {
        label: 'Jardin collectif',
        url: `/environnement/${currentProperty}/jardin-collectif`
    },
    {
        label: 'Joindre un jardin collective existant',
    },
];

const garden = computed(() => store.getters["CollectiveGardenModule/getSelectedGarden"]);

function handleNavigation(value: any) {
    store.commit("CollectiveGardenModule/updateActiveDisplay", value);
}
</script>

<style lang="scss" scoped>
.actor {
    &__container {
        @apply flex flex-col gap-[14px] mb-[18px];
    }

    &__title {
        @apply text-[14px] text-primary font-[600] leading-[17px];
    }

    &__items {
        @apply grid grid-cols-1 gap-[14px];

        @screen sm {
            @apply grid-cols-2;
        }

        @screen md {
            @apply grid-cols-1;
        }

        @screen lg {
            @apply grid-cols-2;
        }

        &-card {
            @apply flex flex-col gap-[14px];
        }
    }

    &__item {
        @apply flex flex-col gap-[14px];

        &-wrap {
            @apply flex gap-[14px];
        }

        &-label {
            @apply text-strokeGray flex items-center gap-[5px];

            span {
                @apply whitespace-nowrap min-w-[60px];

                @media (max-width: 400px) {
                    @apply hidden;
                }
            }
        }
    }

    &__slider-btn {
        @apply w-full flex justify-end gap-x-[10px];
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
