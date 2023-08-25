<template>
    <div class="confirmation-visite confirmation-visite__container" v-if="props.data.visitingHours">
        <div 
            class="confirmation-visite__item"
            v-for="(item, index) in  props.data.visitingHours" 
            :key="index"
        >
            <div class="confirmation-visite__item-header">
                <P class="confirmation-visite__item-title">Semaine <span>{{ item.weekNumber }}</span></P>
                <hr class="confirmation-visite__divider">
            </div>
            
            <div class="confirmation-visite__item-content">
                <P>Jours</P>
                <P>
                    <span v-for="(day, idDay) in item.availabilityDay" :key="idDay">
                        {{ day }} 
                        <span v-if="idDay !== item.availabilityDay.length-1">, </span>
                    </span>
                </P>
            </div>
            <div class="confirmation-visite__item-content">
                <P>Heure de début</P>
                <P>{{ item.availabilityHourMin }}</P>
            </div>
            <div class="confirmation-visite__item-content">
                <P>Heure de Fin</P>
                <P>{{ item.availabilityHourMax }}</P>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';

const props = defineProps({
    data : {
        type : Object,
        default : () => {}
    }
});

</script>

<style lang='scss' scoped>
.confirmation-visite{
    &__container{
        @apply flex flex-col gap-[10px];
    }

    &__item{
        background-color: var(--color-gray);
        @apply p-[10px] rounded-[8px] flex flex-col gap-[5px];
    }

    &__item-header{
        @apply flex flex-col gap-[10px];
    }

    &__item-content{
        @apply w-full;
    }

    &__divider{
        @apply text-white;
    }

    &__item-title{
        @apply text-slate-400 font-semibold;
    }

    &__item-content{
        @apply flex justify-between;
    }
}
</style>