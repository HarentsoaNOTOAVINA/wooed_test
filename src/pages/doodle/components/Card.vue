<template>
    <CardWrapper class="card">
        <div class="card__header">
            <LoadingButton 
                size="xs" 
                theme="dark" 
                v-if="props.loadingDelete && (idToDelete === props.survey.id)"
            />
            <a-popconfirm
                v-else
                @confirm="handleDelete(props.survey.id)"
                ok-text="Oui"
                cancel-text="Non"
                title="Voulez-vous vraiment supprimer ce sondage ?"
            >
                <Delete  
                />
            </a-popconfirm>
        </div>
        <div class="card__title">
            <Paragraphe>{{ props.survey.title }}</Paragraphe>
        </div>

        <div class="card__body">
            <div class="card__item">
                <Icon icon-name="Profile" />
                <Paragraphe class="">
                    {{props.survey.author.firstname}} {{ props.survey.author.name }} 
                    <span class="card__subtitle">(Auteur)</span>
                </Paragraphe>
            </div>
            <div class="card__item">
                <Icon icon-name="CalendarDate" />
                <Paragraphew>
                    {{ formatDateFr(props.survey.created) }}
                    <span class="card__subtitle">(Date de création)</span>
                </Paragraphew>
            </div>

            <div class="card__info-container">
                <Icon icon-name="InfoIcon"/>
                <Paragraphe class="card__info">Aller dans le détails pour voir les dates et heures du rendez-vous.</Paragraphe>
            </div>

            <div class="card__action">
                <Button type-button="secondary" @click="clickHandler(props.survey.id)">Details</Button>
            </div>
        </div>
    </CardWrapper>
</template>

<script lang='ts' setup>
import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import Delete from '@/components/Icon/deleteRoudedBG.vue';
import Icon from '@/components/Common/Icon/Icon.vue';
import { formatDateFr } from '@/utils/date/format';
import Button from '@/components/Common/Button/Button.vue';
import { ref, watch } from "vue";
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import {Popconfirm as APopconfirm } from "ant-design-vue";

const props = defineProps({
    survey : {
        type : Object,
        default : () => {}
    },
    loadingDelete : {
        type : Boolean,
        default : false
    }
})

const emit = defineEmits(['onClick', 'onDelete']);
const idToDelete = ref<any>(null);

watch(() => props.loadingDelete, (value) => {
    if(!value){
        idToDelete.value = null;
    }
}, {immediate : true, deep : true})

function handleDelete(id : number | string){
    emit('onDelete', id);
    idToDelete.value = id;
}

function clickHandler(id : number | string){
    emit('onClick', id);
}

</script>

<style lang='scss' scoped>
.card{
    &:deep(){
        .card__wrapper{
            @apply max-h-[200px] p-[10px];
        }
    }
    &__title{
        background-color: var(--color-gray);
        @apply w-full rounded-[8px] py-[20px] flex justify-center items-center font-semibold;
    }

    &__header{
        @apply flex justify-end mb-[10px];

        &:deep(){
            svg{
                @apply cursor-pointer;
            }
        }
    }
    &__body{
        @apply w-full mt-[20px];
    }

    &__subtitle{
        @apply italic text-[12px];
    }

    &__item{
        @apply flex gap-[10px] my-[10px];
    }

    &__info{
        color : var(--color-primary);
        @apply italic text-[12px] ;
    }

    &__info-container{
        @apply flex gap-[10px] my-[20px];
    }

    &:deep(){
        .button__secondary{
            @apply w-full font-light;
        }
    }

}
</style>