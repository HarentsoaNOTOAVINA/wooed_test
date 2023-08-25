<template>
    <div class="projectDisplay__items">
        <Card class="projectDisplay__item">
            <Title type="h4" label="Emplacement" class="projectDisplay__subtitle" />
            <hr class="__hr" />
            <div class="projectDisplay__item-content">
                <label>Superficie</label>
                <span>{{ garden.document.landArea }} m2</span>
            </div>
            <div class="projectDisplay__item-wrapper">
                <Title type="h4" label="Accès" class="projectDisplay__title" />
                <hr class="__hr" />
                <Paragraphe>
                    <span>
                        {{ garden.document.vegetableGardenAccess }}
                    </span>
                </Paragraphe>
            </div>
            <div class="projectDisplay__item-wrapper">
                <Title type="h4" label="Statut environnemental de la parcelle" class="projectDisplay__title" />
                <hr class="__hr" />
                <div class="projectDisplay__content">
                    <div class="content-wrap">
                        <span class="font-[600]">Le bien se situe {{ garden.document.vegetableGardenLocation }}</span>
                        <span class="category">Catégorie 0 (cf supra)</span>
                    </div>
                </div>
            </div>
        </Card>
        <Card class="projectDisplay__item">
            <Title type="h4" label="Objectifs du projet" class="projectDisplay__subtitle" />
            <hr class="__hr" />
            <div class="projectDisplay__item-content">
                <span 
                    v-for="(aim, index) in garden.document.projectsObjectives" 
                    :key="index"
                    class="projectDisplay__objective"
                >
                    {{ aim }}
                </span>
            </div>
        </Card>
        <Card class="projectDisplay__item">
            <Title type="h4" label="Type de gestion" class="projectDisplay__subtitle" />
            <hr class="__hr" />
            <div class="projectDisplay__item-content">
                <label v-if="garden.type === 'collective-gardens'">Parcelles collectives</label>
                <label v-else-if="garden.type === 'individual-gardens'">Parcelles individuelles</label>
            </div>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import Title from '@/components/Common/Title/Title.vue';
import Card from '@/components/Display/Card/Card.vue';

import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const garden = computed(() => store.getters["CollectiveGardenModule/getSelectedGarden"]);

</script>

<style lang="scss" scoped>
.projectDisplay {
    &__title {
        @apply text-[14px] text-primary font-[600] leading-[17px];
    }

    &__subtitle {
        @apply text-[14px] text-secondary font-[600] leading-[17px];
    }

    &__items {
        @apply flex flex-col gap-[14px] rounded-[8px] bg-gray px-[14px] py-[12px];
    }

    &__item {
        @apply flex flex-col gap-[14px];

        &-content {
            @apply flex flex-col gap-[10px];

            label {
                @apply font-[600];
            }

            span {
                @apply px-[14px] py-[10px] bg-gray rounded-[4px] text-[12px] text-grayIcon;
            }
        }

        &-wrapper {
            @apply flex flex-col gap-[14px];
        }

        .paragraphe__normal {
            @apply flex flex-col gap-[8px] font-[600];
        }

        &:deep() {

            .custom-input__fields,
            .custom-select__wrapper {
                @apply mb-0;
            }

            .date__space {
                gap: 0 !important;
            }

            .date__label {
                @apply mb-[10px];
            }

            label {
                @apply font-[600] text-black;
            }
        }
    }

    &__content {
        @apply p-[14px] bg-gray rounded-[8px];

        .content-wrap {
            @apply flex flex-wrap items-center justify-between gap-[14px];
        }

        .category {
            @apply block px-[14px] py-[10px] rounded-[4px] bg-white text-primary;
        }
    }

    &__objective {
        @apply inline-block;
    }
}

.__hr {
    @apply text-gray w-full;
}
</style>
