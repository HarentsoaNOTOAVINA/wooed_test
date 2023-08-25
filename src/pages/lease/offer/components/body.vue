<template>
    <div class="body-container">
        <component
            :is="props.component"
            :offers="offers"
        />

    </div>
</template>
<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import Sent from "./sent.vue";
import {watch, ref, reactive} from 'vue';

const offers = ref<any[]>([]);

const props = defineProps({
    component: {
        type: Object,
        default : Sent
    },
    offers : {
        type : Array,
        default : () => []
    }
})

watch(() => props.offers, (newVal) => {
    offers.value = newVal;
});
</script>
<style lang="scss" scoped>
.body{
    &-container{
        @apply w-full mt-2 bg-white flex-col p-3 ;
        border-radius : 8px;
        color: var(--color-gray-icon);

        .list{
            &-container{
                @apply w-full flex flex-col;
            }
            &-item{
               @apply w-full flex justify-between;
               &-content{
                @apply w-2/3;
               }
               &-action{
                @apply w-1/3;
               }
            }
        }

    }
    &-header{
        color: var(--color-gray-icon);
    }

}
@screen md{
    .body{
        &-container{
            //@apply w-[70%] mt-2 bg-white flex-col p-2 justify-between;
            @apply w-full mt-2 bg-white flex-col p-2 justify-between;
            border-radius : 8px;
            .list{
                &-container{
                    @apply w-full flex flex-col;
                }
                &-item{
                   @apply w-full flex justify-between;
                   &-content{
                    @apply w-2/3;
                   }
                   &-action{
                    @apply w-1/3;
                   }
                }
            }
    
        }
        &-header{
    
        }
    
    } 
}
</style>