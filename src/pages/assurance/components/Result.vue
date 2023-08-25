<template>
    <div class="care-result">
    <hr />
    <Title type="h4" label="Le prix de l'assurance" weight="bold" />
    <div class="price-container">
        <div class="care-price" v-for="(item) in data.company" :key="item">
            <Paragraphe type="title">{{item.company}}</Paragraphe>
            <Paragraphe type="price">{{item.insurance_per_month}} €</Paragraphe>
            <Paragraphe>Par mois ou {{item.insurance_per_year}} € /an</Paragraphe>
            <Paragraphe>{{item.home_insurance_for}}</Paragraphe>
            <li class="cover-list" v-for="(cover) in item.coverbasic" :key="cover">
                {{cover.label}}
            </li>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import Title from '@/components/Common/Title/Title.vue';

defineProps<{
    data : any;
}>();
</script>

<style lang="scss" scoped>
    .care-result {
        width: 85%;
        display: flex;
        flex-direction: column;
        gap: 18px;
        hr {
            color: var(--color-stroke-gray);
        }
    }
    .price-container {
        @apply mt-[10px] md:mt-[0px] grid md:grid-cols-3 sm:grid-cols-2 gap-4;
    }
    .care-price {
        display: flex;
        gap: 18px;
        flex-direction: column;
        border-radius: 8px;
        padding: 24px;
        background-color: #fff;
        hr {
            color: var(--color-stroke-gray);
        }
        &:deep() {
            .paragraphe {
                &__title {
                    font-size: 24px;
                    color: var(--color-primary);
                }
                &__price {
                    font-size: 28px;
                    font-weight: 600;
                    color: var(--color-secondary);
                }
            }
        }
    }
    .cover-list{
        list-style: circle;
    }
</style>