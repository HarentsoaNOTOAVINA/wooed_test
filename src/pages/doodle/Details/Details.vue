<template>
    <div class="details details__container">
        <Loader v-if="loading"/>
        <div class="details__content" v-else-if="survey">
            <div class="details__header">
                <div class="details__header-container">
                    <div class="details__header-title">
                        <BackButton @click="onBack" />
                        <Paragraphe class="details__title">
                            Details du sondage  
                            <span class="details__subtitle"> &nbsp;{{ survey.title }}</span>
                        </Paragraphe>
                    </div>
                    <Button 
                        type-button="primary" 
                        @click="showModalHandler"
                        v-if="userEmail === survey.author.email"
                    >
                        <Icon icon-name="Invite" />
                        Inviter
                    </Button>
                </div>
                <hr class="details__divider">
            </div>
            <div class="details__body">

                <div class="details__base-container">
                    <div class="details__base-header">
                        <Paragraphe class="details__base-title">Information de base</Paragraphe>
                        <hr class="details__divider">
                    </div>
                    <div class="details__base-content">
                        <div class="details__base-user">
                            <a-avatar size="large">
                                <template #icon>
                                        <Icon icon-name="User" />
                                </template>
                            </a-avatar>
                            <div class="details__base-user-info">
                                <Paragraphe class="details__base-user-name">{{  survey.author.name }} {{  survey.author.firstname }}</Paragraphe>
                                <Paragraphe class="details__base-user-role">Auteur</Paragraphe>
                            </div>
                        </div>
                        <hr class="details__divider-white">
                        <div class="details__base-info">
                            <div class="details__base-info-item">
                                <Paragraphe class="details__base-text">Date de création</Paragraphe>
                                <Paragraphe class="details__base-text">{{ formatDateFr(survey.created) }}</Paragraphe>
                            </div>
                            <div class="details__base-info-item">
                                <Paragraphe class="details__base-text">Lieu</Paragraphe>
                                <Paragraphe class="details__base-text">{{ survey.place }}</Paragraphe>
                            </div>
                            <div class="details__base-info-description">
                                <Paragraphe class="details__base-text">Descritpion</Paragraphe>
                                <Paragraphe class="details__description">{{ survey.description }}</Paragraphe>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="details__participants">
                    <div class="details__participants-header">
                        <Paragraphe class="details__horaire-title">Liste des participants</Paragraphe>
                        <hr class="details-divider">
                    </div>

                    <div class="details__participants-content">
                        <div 
                            class="details__participants-item"
                            v-for="(item, index) in survey.participants" :key="index"
                        >
                            <div class="details__participants-item-content">
                                <Paragraphe>Nom</Paragraphe>
                                <Paragraphe>{{ item.name }}</Paragraphe>
                            </div>
                            <hr class="details__divider-white">
                            <div class="details__participants-item-content">
                                <Paragraphe>E-mail</Paragraphe>
                                <Paragraphe>{{ item.email }}</Paragraphe>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="details__horaire-container">
                    <div class="details__horaire-header">
                        <Paragraphe class="details__horaire-title">Horaire suggeré</Paragraphe>
                        <hr class="details__divider">
                    </div>

                    <div class="details__horaire-content">
                        <Checkbox 
                            :data="survey"
                            @select-date="voteDateHandler"
                            @open-modal-list="showListHandler"
                        />
                    </div>
                </div>
            </div>
        </div>


        <Modal
            :is-show-modal="isShowModal"
            @on-back="showModalHandler"
            title="Invitation"
        >
            <template #content>
                <Loader v-if="!listUser" />
                <div class="" v-else>
                    <Select 
                        name="invitation"
                        mode="multiple"
                        :options="listUser"
                        @change-select="handleSelect($event, survey.id)"
                        label="Veuillez selectionner les invités"
                    />

                    <div class="details__modal-footer">
                        <Button type-button="border" @click="handleInvite">
                            <LoadingButton size="xs" v-if="loadingInvitation" theme="dark" />
                            Inviter
                        </Button>
                    </div>
                </div>
            </template>
        </Modal>


        <Modal
            :is-show-modal="isShowModalListUser"
            @on-back="handleShowModal"
            title="Participants qui ont votés sur cette date."
        >
            <template #content>
                <Loader v-if="loadingGetList" />
                <a-empty 
                    v-else-if="listParticipantsVoted.length <= 0"
                    description="Personne n'a encore votés."
                />
                <div class="" v-else>
                    <div class="details__participants-content">
                        <div 
                            class="details__participants-item"
                            v-for="(item, index) in listParticipantsVoted" :key="index"
                        >
                            <div class="details__participants-item-content">
                                <Paragraphe>Nom</Paragraphe>
                                <Paragraphe>{{ item.author.name }}</Paragraphe>
                            </div>
                            <hr class="details__divider-white">
                            <div class="details__participants-item-content">
                                <Paragraphe>E-mail</Paragraphe>
                                <Paragraphe>{{ item.author.email }}</Paragraphe>
                            </div>
                        </div>
                    </div>


                </div>
            </template>
        </Modal>
    </div>
</template>

<script lang='ts' setup>
import { useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";
import store from "@/store";
import Loader from "@/components/Common/Loader/Loader.vue";
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";
import Button from "@/components/Common/Button/Button.vue";
import Icon from "@/components/Common/Icon/Icon.vue";
import { formatDateFr, formatHourFr } from "@/utils/date/format";
import BackButton from "@/components/Common/BackButton/BackButton.vue";
import router from "@/routes";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import { Avatar as AAvatar } from "ant-design-vue";
import Checkbox from '@/pages/doodle/components/Checkbox.vue'
import Modal from "@/components/Display/Modal/Modal.vue";
import Select from "@/components/Common/Select/Select.vue";
import { notification, Empty as AEmpty } from "ant-design-vue";
import LoadingButton from "@/components/Icon/LoadingButton.vue";


onMounted(() => {
    getDetailsSurvey();
})

const routes = useRoute();
const survey = ref<any>(null);
const loading = ref<boolean>(false);
const checked = ref<any>([]);
const isShowModal = ref<boolean>(false);
const laoadingUser = ref<boolean>(false);
const listUser = ref<any>(null)
const params = ref<any>({
    redirectLink : `/survey/${routes.params.id}`,
    pollId : survey.id,
    participants : []
});
const invitation = ref<any>(null);
const loadingInvitation = ref<boolean>(false);
const userEmail = computed(() => store.getters['UserModule/getUserDetails']['email']);
const loadingVote = ref<boolean>(false);
const isShowModalListUser = ref<boolean>(false);
const loadingGetList = ref<boolean>(false);
const listParticipantsVoted = ref<any>([]);



async function getDetailsSurvey(){
    loading.value = true;
    try {
        survey.value = await store.dispatch('SurveyModule/getDetailsSurvey', routes.params.id);
    } catch (err) {
        
    }finally{
        loading.value = false;
    }
}

function onBack(){
    router.back();
}

function showModalHandler(){
    isShowModal.value = !isShowModal.value;
    if(isShowModal.value){
        getListUser();
    }

}

async function getListUser(){
    try {
        laoadingUser.value = true;
        listUser.value = await store.dispatch('SurveyModule/getListEmail');

    } catch (error) {
        console.log("Erreur lors de la recuperation de tous les utilisateurs\n", error);
        
    }finally{
        laoadingUser.value = false;
    }
}

function handleSelect(item : any, pollId : number){
    invitation.value = Object.values(item as Object)[0];
    params.value = {
        ...params.value,
        pollId
    }   
}

async function handleInvite(){
    console.log("participants\n", Object.values(invitation.value));
    params.value.participants = [];
    Object.values(invitation.value).forEach((item : any) => {
        params.value.participants = [
            ...params.value.participants,
            {
                name : JSON.parse(item)['name'],
                email : JSON.parse(item)['email']
            }
        ]
        
    });
    try {
        loadingInvitation.value = true;
        const data = await store.dispatch('SurveyModule/inviteParticipant', params.value);
        console.log("datatatataata\n", data.participants);
        survey.value = {
            ...survey.value,
            participants : data.participants
        }
        notification['success']({
            message : 'Succès',
            description : "Votre invitation a eté envoyer"
        })
    } catch (error) {
        notification['error']({
            message : "Erreur",
            description : "Une erreur s'est produite, veuillez réessayer!"
        })
        console.error(error);
        
    }finally{
        loadingInvitation.value = false;
        showModalHandler();
    }
}

async function voteDateHandler(idDate : number){
    const params : {date : number, redirectLink  : string} = {
        date : idDate,
        redirectLink : `/survey/${routes.params.id}`
    };

    try {
        loadingVote.value = true;
        const data = await store.dispatch('SurveyModule/voteSurvey', params);
        
    } catch (error) {
        console.log("Error\n", error);        
    }finally{
        loadingVote.value = false;

    }

}

function handleShowModal(){
    isShowModalListUser.value = !isShowModalListUser.value
}

function showListHandler(dataDate : any){
    console.table(dataDate);
    loadingGetList.value = true;
    handleShowModal();
    if(isShowModalListUser.value){
        listParticipantsVoted.value = dataDate.votes
    }
    loadingGetList.value = false;
}

</script>

<style lang='scss' scoped>
.details{
    &__container{
        @apply my-[10px] bg-white container rounded-[8px] min-h-[calc(100vh_-_100px)] p-[10px];
    }
    &__divider{
        @apply text-slate-300;
    }

    &__body{
        @apply flex flex-col gap-[10px]
    }

    &__header{
        @apply flex flex-col gap-[10px];
    }

    &__title{
        color: var(--color-gray-icon);
        @apply font-semibold flex flex-wrap items-center;
    }

    &__subtitle{
        @apply italic font-bold;
    }

    &__header-container{
        @apply flex justify-between
    }

    &:deep(){
        .button__primary{
            @apply w-[120px] flex gap-[10px] font-normal;
        }
        .button__secondary{
            @apply w-full font-normal
        }


        .ant-avatar{
            @apply flex justify-center items-center;
        }
    }

    &__header-title{
        @apply flex gap-[10px];
    }

    &__action{
        @apply my-[10px];
    }

    /**aaaaaaaaaaaaaa */

    &__body{
        @apply mt-[20px];
    }

    &__base-container{
        @apply border text-slate-300 p-[10px] rounded-[8px] flex flex-col gap-[10px];
    }

    &__base-header{
        @apply flex flex-col gap-[10px]
    }

    &__base-title{
        color: var(--color-gray-icon);
        @apply font-semibold;
    }

    &__base-content{
        background-color: var(--color-gray);
        @apply rounded-[8px] p-[10px] flex flex-col gap-[10px];
    }

    &__base-user{
        @apply flex gap-[10px];
    }

    &__base-user-info{
        @apply flex flex-col;
    }
    &__base-user-name{
        @apply font-semibold text-slate-600;
    }

    &__base-user-role{
        @apply font-thin text-slate-600;
    }

    &__divider-white{
        @apply text-white;
    }

    &__base-info-item{
        @apply w-full flex justify-between;
    }

    &__base-info{
        @apply flex flex-col gap-[8px];
    }

    &__description{
        @apply bg-white rounded-[8px] p-[10px] w-full mt-[5px] text-slate-800;
    }

    &__base-text{
        @apply font-normal text-slate-600;
    }

    &__horaire-container{
        @apply border rounded-[8px] p-[10px] text-slate-300;
    }

    &__horaire-header{
        @apply flex flex-col gap-[10px];
    }

    &__horaire-title{
        
        color: var(--color-gray-icon);
        @apply font-semibold;
    }

    &__horaire-content{
        @apply w-full flex flex-col gap-[10px] mt-[10px];
    }

    &__modal-footer{
        @apply w-full flex justify-end;

        &:deep(){
            
            .button__border{
                @apply font-normal w-[120px];
            }
        }
    }

    /**Participants */
    &__participants{
        @apply border rounded-[8px] text-slate-300 p-[10px] flex flex-col gap-[10px];
    }

    &__participants-header{
        @apply flex flex-col gap-[10px];
    }

    &__participants-content{
        @apply flex flex-col gap-[10px]
    }

    &__participants-item{
        background-color: var(--color-gray);
        @apply rounded-[8px] p-[10px] text-slate-800 flex flex-col gap-[5px];
    }

    &__participants-item-content{
        @apply flex justify-between;
    }

}

</style>