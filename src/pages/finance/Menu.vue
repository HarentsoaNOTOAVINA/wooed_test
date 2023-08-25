<script setup lang="ts">
import MenuConsumer from "@/pages/finance/MenuConsumer/MenuConsumer.vue";
import ElectricConsumer from "@/pages/finance/ElectricConsumer/ElectricConsumer.vue";
import GazConsumer from "@/pages/finance/GazConsumer/GazConsumer.vue";
import WaterConsumer from "@/pages/finance/WaterConsumer/WaterConsumer.vue";
import Tank from "@/pages/finance/Tank/Tank.vue";

import Consumer from "@/pages/finance/Consumer/Consumer.vue";
import CleaningGardening from "./CleaningGardening/CleaningGardening.vue";
</script>
<template>
    <div class="finance__container">
        <!-- <div>Test test</div> -->
        <div class="finance__menu">
            Menu
        </div>
        <!-- <div class="finance__content">
            <Consumer />
        </div> -->
        <div class="finance__content">
            <CleaningGardening />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .finance{
        &__container{
            @apply container flex gap-[10px];
        }
        &__menu{
            @apply hidden md:flex;
        }
        &__content{
            @apply flex-1;
        }
    }
</style>
