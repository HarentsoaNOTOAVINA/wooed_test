<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Progress from '@/components/Common/ProgressCircle/ProgressCircle.vue';
import { onMounted, ref, watch } from 'vue';

const emit = defineEmits<{
    (e: 'on-click-detail-agreement'): void;
    }>();
    
    const props = defineProps({
        compromisList : {
            type : Object,
            required : true
        },
        accepted : {
            type : Boolean,
            default : false
        },
        dateRest : {
            type : Number
        }
    })
    const value = ref<number>(0); 

    onMounted(() => {

    })

    function calculatePercent(){

    }

    function handleClickedAgrement() {
        console.log('details Agrement clicked');
        emit('on-click-detail-agreement');
    }

    function calculateStatus(nb : number){
        return "exception"
    }

</script>

<template>
    <div class="menu__offer" :class="props.accepted ? '' : 'menu__disabled'">
        <div class="" v-if="props.accepted">
            <Progress 
                v-if="props.dateRest" 
                :percent="(+props.dateRest*100)/30"  
                :format="'Compromis de vente ('+ props.compromisList?.length +')'"
                status="exception"
                />
            
            <div>
                <Paragraph class="menu__offer-status"> En attente de signature <i><br>Fini dans {{props.dateRest}} jour{{props.dateRest && props.dateRest > 1 ? 's' : ''}}</i></Paragraph>
            </div>
        </div>
        <div class="" v-else>
            <div class="menu__disabled--title" >
                <Paragraph class="menu__disabled--title-text">Compromis de vente</Paragraph> 
            </div>
            
            <div class="" >
                <Paragraph class="menu__offer-status"> Aucun </Paragraph>
            </div>
        </div>
        <Button 
            typeButton="border" 
            @on-click="handleClickedAgrement"
            :disabled="!props.accepted"
        > 
            Détail 
        </Button>
    </div>
</template>

<style scoped lang="scss">
    .menu {
        &__offer {
            @apply flex-col items-center justify-around h-[445px]  ;
            display: flex !important;

            &:deep(button) {
                @apply flex items-center justify-center h-[42px] text-sm w-[110px] font-medium py-[6px] px-[20px] ;
            }

            @screen md{
                @apply w-[237px] justify-around rounded-lg h-[296px] ;
                border: 2px solid var(--color-primary);
            }
        }

        &__disabled{
            background: var(--color-stroke-gray);
        }

        &__disabled--title{
            @apply flex items-center justify-center w-[108px] h-[108px] rounded-full ;
            background-color: var(--color-primary);
        }

        &__disabled--title-text{
            color: #FFF;
            @apply text-center font-bold;
        }
        

        &__offer-status{
            @screen md{
                @apply flex flex-col items-center ;
            }
        }

        &__offer-title {
            @apply flex items-center justify-center w-[108px] h-[108px] rounded-full ;
            background-color: var(--color-gray);
        }
    }
</style>
