<template>
    <div class="infoModal__container">
        <div class="">
            <div
                class="content"
                v-for="item in currentSelectedEfficientBlding.child"
                :key="item.id"
            >
                <Paragraphe
                    ><span>maximaal E-peil bij nieuwbouw of gelijkgesteld</span
                    >: <strong>{{ item.max_1 }}</strong></Paragraphe
                >
                <Paragraphe
                    ><span
                        >maximaal E-peil na ingrijpende energetische
                        renovatie</span
                    >: <strong>{{ item.max_2 }}</strong></Paragraphe
                >
                <Paragraphe
                    ><span>Réduction</span>:
                    <strong>{{ item.reduction }}</strong></Paragraphe
                >
                <Paragraphe
                    ><span>Durée de la réduction</span>:
                    <strong>{{ item.duration }}</strong></Paragraphe
                >
                <div class="content__btn">
                    <Button @on-click="$emit('on-choose-eb', item)">Choisir</Button>
                </div>
                <hr />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    const props = defineProps<{
        currentSelectedEfficientBlding: {
            value: number | string;
            label: string;
            id: string;
            child?:
                | null
                | {
                      id: number;
                      max_1: string;
                      max_2: string;
                      reduction: string;
                      duration: string;
                      value: number;
                  }[];
        };
    }>();

    function hanldeClick(item: {
        id: number;
        max_1: string;
        max_2: string;
        reduction: string;
        duration: string;
        value: number;
    }) {

    }
</script>
<style lang="scss" scoped>
    .content {
        hr {
            border-color: var(--color-primary);
            @apply mt-[10px] mb-[20px];
        }
        &__btn {
            @apply w-full;
            text-align: end;
        }
    }
</style>
