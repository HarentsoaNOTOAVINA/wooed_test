<script lang="ts" setup>
import Home from "@/components/Icon/Home.vue";
import P from "@/components/Common/Paragraphe/Paragraphe.vue";
import Icon from "@/components/Common/Icon/Icon.vue";

const props = defineProps({
    data : {
        type : Object,
        required : true
    }
})

const emit = defineEmits(['click'])

function handleClick(){
    emit('click', props.data);
}

</script>

<template>
    <div class="menu-item__container" @click="handleClick">
        <Icon :icon-name="props.data.icon" />
        <P>{{props.data.label}}</P> 
    </div>
</template>

<style lang="scss" scoped>
.menu-item{
    &__container{
        @apply border w-[100%] border-slate-400 rounded-[8px] bg-white p-[14px] cursor-pointer flex gap-[20px] items-center transition-all;
        @screen md {
            @apply w-auto p-[20px];
        }
        &:hover {
            @apply bg-primary text-white font-[600] transition-all;
        }
    }
}
</style>