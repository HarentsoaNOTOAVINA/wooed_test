<script lang="ts" setup>
import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
import { formatDateFr } from '@/utils/date/format';
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import { Tag as ATag, Popconfirm as APopconfirm } from "ant-design-vue";
import CalendarDate from '@/components/Icon/CalendarDate.vue';
import Button from '@/components/Common/Button/Button.vue';
import deleteRoudedBG from '@/components/Icon/deleteRoudedBG.vue';
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import { ref } from "vue";


const props = defineProps({
    data : {
        type : Object,
        required : true
    },

    loading : {
        type : Boolean,
        default : false
    }
})

const emit = defineEmits(['onDelete', 'onDetails']);
const idToDelete = ref<any>();


function onClickDelete( id : number | string){
    emit('onDelete', id);
    idToDelete.value = id;
}

function onClickProcedure(id : number | string){
    emit('onDetails', id);
}

</script>

<template>
    <CardWrapper 
                class="prime-card prime-card__card-item"
            >
                <div class="prime-card__card-header">
                    <div class="prime-card__status">
                        <a-tag color="warning" v-if="!data.status">En cours</a-tag>
                        <a-tag color="success" v-else>Fini</a-tag>
                    </div>
                    <a-popconfirm
                        title="Voulez-vous vraiment supprimer ce procédure ?"
                        ok-text="Oui"
                        cancel-text="Non"
                        @confirm="onClickDelete(data.id)"
                    >
                        <LoadingButton size="xs" v-if="loading && idToDelete === data.id" theme="dark" />
                        <deleteRoudedBG class="prime-card__delete" v-else />
                    </a-popconfirm>
                </div>
                <div class="prime-card__card-content">
                    <P class="prime-card__title">{{ data.prime.name }}</P>
                    <div class="prime-card__date-container">
                        <div class="prime-card__date">
                            <CalendarDate />
                            <P>{{ formatDateFr(data.created) }}</P>
                            <P class="prime-card__date-info">(Date de début)</P>
                        </div>
                        <div class="prime-card__date">
                            <CalendarDate />
                            <P>{{ formatDateFr(data.updated) }}</P>
                            <P class="prime-card__date-info">(Date de mis à jour)</P>
                        </div>
                        <div class="prime-card__footer">
                            <Button 
                                type-button="secondary" 
                                class="prime-card__btn"
                                @click="onClickProcedure(data.id)"
                            >
                                Voir la procédure
                            </Button>
                        </div>
                    </div>
                </div>
            </CardWrapper>
</template>

<style lang="scss" scoped>
.prime-card{
    
    
    &__card-item{
        @apply min-h-[200px] flex flex-col gap-[10px];
    }

    &__card-header{
        @apply flex justify-between;
    }

    &__card-content{
        @apply flex flex-col h-[100%] justify-between gap-[10px];
    }
    

    &__status{

    }
    
    &__title{
        background-color: var(--color-gray);
        @apply font-semibold text-center py-[20px] h-[100%] rounded-[8px];
    }
    &__date{
        @apply flex gap-[10px]
    }

    &__date-container{
        @apply flex flex-col gap-[10px];
    }

    &__date-info{
        @apply text-[12px] italic font-thin;
    }

    &__footer{
        @apply flex justify-center mt-[10px];
    }

    &__delete{
        @apply cursor-pointer outline-none;
    }

    &:deep(){
        .button__secondary{
            @apply font-light w-[100%];
        }

        .ant-tag{
            @apply w-[80px] text-center rounded-xl;
        }
    }

    &__btn{
        @apply w-[100%];
    }

}
</style>