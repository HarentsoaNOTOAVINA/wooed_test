<script lang="ts" setup>
import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
import P from '@/components/Common/Paragraphe/Paragraphe.vue'
import Icon from '@/components/Common/Icon/Icon.vue';
import { Popconfirm as APopconfirm } from "ant-design-vue";
import { ref } from "vue";
import { formatDateFr } from "@/utils/date/format";
import Button from '@/components/Common/Button/Button.vue';
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import { width } from 'dom7';


const props = defineProps({
    type : {
        type : String,
        default : "Type de camera",
    },
    declarationDate : {
        type : String,
        default : null
    },
    filePath : {
        type : String,
        default : null
    },
    declared : {
        type : Boolean,
        default : false
    },
    id : {
        type : Number,
        required : true
    },
    loadingDelete : {
        type : Boolean,
        default : false
    },
    loadingDeclare : {
        type : Boolean,
        default : false
    },
    typeSecurity : {
        type : String,
        default : 'camera'
    },
    urlRedirection : {
        type : String,
        required : true
    }
});

const emit = defineEmits(['onDelete', 'onDeclare']);
const base_uri = ref<string>(import.meta.env.VITE_API_ROOT_URL);
const idToDelete = ref<number>(0);
const idToDclare = ref<number>(4);

function onDelete(idItem : number){
    emit('onDelete', idItem);
    idToDelete.value = idItem

}
function navigateDeclare(){
    console.log("declaration");
    window.open(props.urlRedirection, '_blank');
}

function handleDeclare(idItem : number){
    emit('onDeclare', idItem);
    idToDclare.value = idItem;
}

</script>

<template>
    <CardWrapper class="card-security card-security__container">
        <div class="card-security__header">
            <P class="card-security__title">{{ props.type }}</P>
           
            <a-popconfirm 
                title="Voulez-vous vraiment supprimer ce caméra?"
                ok-text="Oui"
                cancel-text="Non"
                @confirm="onDelete(props.id)"
            >
                <Icon icon-name="Trash" v-if="!loadingDelete || (idToDelete !== props.id)" class="card-security__deleteIcon" />
            </a-popconfirm>
            <LoadingButton size="xs" theme="dark" v-if="loadingDelete && (idToDelete === props.id)" />
        </div>

        <div class="card-security__body">
            <figure class="card-security__figure">
                <img v-if="props.typeSecurity === 'camera'" src="@/assets/camera.svg" alt="camera" class="card-security__img">
                <img v-if="props.typeSecurity === 'alarm'" src="@/assets/alarm.png" alt="camera" class="card-security__img">
            </figure>
            <!-- <div class="card-security__content" v-if="props.filePath"> -->
            <div class="card-security__content">
                <a class="card-security__file" :href="props.filePath">
                    <Icon icon-name="Files" />
                    <P class="card-security__file-name">Fichier</P>
                </a>

                <div class="card-security__declaration" v-if="props.declarationDate">
                    <Icon icon-name="Calendre" />
                    <P class="card-security__declaration-text">{{ formatDateFr(props.declarationDate) }} <span class="card-security__declaration-date">(date de déclaration)</span></P>
                </div>
            </div>
        </div>

        <div class="card-security__footer" >
            <Button
                type-button="secondary" 
                class="card-security__my-btn"
                width="100%"
                @click="navigateDeclare"
                v-if="!props.declarationDate"
            >
                Déclarer
            </Button>
            <Button 
                class="card-security__my-btn"
                width="100%"
                type-button="border"
                @click="handleDeclare(props.id)"
                v-if="!props.declarationDate"
            >
                <LoadingButton theme="dark"  size="xs" v-if="loadingDeclare && (idToDclare === props.id)" />
                <span v-if="!loadingDeclare || (idToDclare !== props.id)">Déjà déclaré</span>
            </Button>
            <!-- <div class="card-security__declaration-action" v-if="!props.declarationDate">
                <P>Faire une déclaration ?</P>
                <a class="card-security__link" :href="urlRedirection" target="_blank">Cliquer ici.</a>
            </div> -->
        </div>
    </CardWrapper>
</template>

<style lang="scss" scoped>
.card-security{
    &__container{
        @apply w-[275px] flex flex-col gap-[20px];
    }

    &__title{
        color: var(--color-primary);
        @apply font-semibold;
    }

    &__header{
        @apply flex justify-between items-center;
    }

    &__body{
        @apply flex flex-col gap-[10px];
    }

 
    &__figure{
        @apply w-[100%] h-[150px] flex justify-center;
    }

    &__img{
        @apply h-[100%];
    }

    &__deleteIcon{
        @apply cursor-pointer;
    }

    &__content{
        @apply flex flex-col gap-[10px];
    }

    &__file{
        @apply flex items-center gap-[10px] ;
    }
    &__file-name{
        @apply flex items-center h-[100%];
    }

    &:deep(){
        .ant-typography{
            @apply mb-0;
        }
    }

    &__declaration{
        @apply flex items-center gap-[10px];
    }

    &__link{
        @apply text-blue-800 cursor-pointer hover:underline;
    }

    &__declaration-action{
        @apply flex justify-between;
    }

    &__footer{
        @apply flex gap-[10px];
    }

    &__my-btn{
        @apply flex-1;
    }
    &__my-btn > button{
        @apply leading-[17px] px-[10px];
    }
    &:deep(){
        button{
            @apply px-[10px] font-normal;
        } 
    }

    &__declaration-date{
        @apply italic text-[12px];
    }

    &__declaration-text{
        @apply w-[100%];
    }

}
</style>