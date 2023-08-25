<script lang="ts" setup>
import { consumerMenu } from "@/pages/finance/MenuConsumer/data";
import P from "@/components/Common/Paragraphe/Paragraphe.vue";
import Arrow from '@/components/Icon/ArrowNext.vue'
import ElectricConsumer from "@/pages/finance/ElectricConsumer/ElectricConsumer.vue";
import GazConsumer from "@/pages/finance/GazConsumer/GazConsumer.vue";
import WaterConsumer from "@/pages/finance/WaterConsumer/WaterConsumer.vue";
import Tank from "@/pages/finance/Tank/Tank.vue";

const emit = defineEmits(['component'])


function handleClick(item : any){
    switch (item.name) {
        case "water":
            emit('component', WaterConsumer)
            break;
        case "electric":
            emit('component', ElectricConsumer)
            break;
        case "gaz":
            emit('component', GazConsumer)
            break;
        case "citerne":
            emit('component', Tank)
            break;
        
        default:
            break;
    }
}

</script>

<template>
    <div class="consumer__container">
            <P class="consumer__title">Consommation</P>
            <hr class="consumer__divider">
            <div class="consumer__content">
                <div class="consumer__item-container" v-for="item in consumerMenu" :key="item.id" @click="handleClick(item)">
                    <div class="consumer__item">
                        <component :is="item.icon" />
                        <P>{{item.label}}</P>
                    </div>
                    <Arrow />
                </div>
            </div>
    </div>
</template>

<style lang="scss" scoped>
    .consumer{
        &__container{
            @apply bg-white rounded-[8px] p-[18px] flex flex-col gap-[18px] min-h-[100vh_-_20px];
        }

        &__content{
            @apply flex flex-col gap-[16px];
        }

        &__item-container{
            border: 1px solid #F2F2F2;
            @apply rounded-[4px] py-[18px] px-[18px] flex justify-between cursor-pointer;
        }

        &__item{
            @apply flex gap-[10px];
        }

        &__title{
            color: var(--color-gray-icon);
            font-weight: 600;
            @apply text-[16px] ;
        }
        &__divider{
            color:#F2F2F2;
        }
    }
</style>