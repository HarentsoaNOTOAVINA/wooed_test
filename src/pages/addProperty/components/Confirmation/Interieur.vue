<template>
    <div class="confirmation-inside  confirmation-inside__container"
    v-if="props.data.roomcount || props.data.bedroomcount || props.data.bathroomcount"
    >
        <div class="confirmation-inside__content">
            <div class="confirmation-inside__item" v-if="props.data.roomcount">
                <Icon icon-name="Room" />
                <P>{{ props.data.roomcount }}</P>
            </div>
            <div class="confirmation-inside__item" v-if="props.data.bedroomcount">
                <Icon icon-name="BedRoom" />
                <P>{{ props.data.bedroomcount }}</P>
            </div>
            <div class="confirmation-inside__item" v-if="props.data.bathroomcount">
                <Icon icon-name="Bath" />
                <P>{{ props.data.bathroomcount }}</P>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import Icon from '@/components/Common/Icon/Icon.vue'; 
import P from '@/components/Common/Paragraphe/Paragraphe.vue';


const props = defineProps({
    data : {
        type : Object,
        default : () => {}
    }
})

</script>

<style lang='scss' scoped>

.confirmation-inside{
    &__container{
        background-color: var(--color-gray);
        @apply p-[10px] rounded-[8px] flex flex-col gap-[10px];
    }

    &__content{
        @apply flex gap-[30px] flex-wrap;
    }

    &__item{
        @apply flex gap-[5px] items-center;
    }
}
</style>