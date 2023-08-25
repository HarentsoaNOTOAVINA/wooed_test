<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import moment from 'moment';
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import Modal from '@/components/Display/Modal/Modal.vue';
import PublicationServiceHelp from '../AddPublication/PublicationServiceHelp.vue';
import { notification } from "ant-design-vue";

    // const serviceRequestData = [
    //     {
    //         icon: 'RepaireService',
    //         label: 'ity test',
    //     },
    //     {
    //         icon: 'CalendarFill',
    //         label: '2022-03-01',
    //     },
    //     {
    //         icon: 'TimeRounded',
    //         label: '14/34/51 à 21/35/18',
    //     },
    //     {
    //         icon: 'MapMarker',
    //         label: 'Rotterdam, Pays-Bas',
    //     },
    //     {
    //         icon: 'PriceTag',
    //         label: '741200',
    //     },
    // ];

    const interestedServiceRequestData = [
        {
            name: 'Lady',
            interested: [
                {
                    icon: 'Mail',
                    label: 'kary@mailinator.com',
                },
                {
                    icon: 'Phone',
                    label: '0345833243',
                },
                {
                    icon: 'MapMarker',
                    label: 'Adana, Reşatbey, Seyhan/Adana, Turquie',
                },
            ],
        },
        {
            name: 'Lady',
            interested: [
                {
                    icon: 'Mail',
                    label: 'kary@mailinator.com',
                },
                {
                    icon: 'Phone',
                    label: '0345833243',
                },
                {
                    icon: 'MapMarker',
                    label: 'Adana, Reşatbey, Seyhan/Adana, Turquie',
                },
            ],
        },
    ];

    interface IAction{
        id : number,
        name : string,
        label : string
    }

    const actionButton : IAction[] = [
        {
            id : 0,
            name : "interested",
            label : 'Intéressé(e)'
        },
        {
            id : 1,
            name : "proposition",
            label : "Faire une contre proposition"
        }
    ]

    const props = defineProps({
        publication : {
            type : Object,
            default : {}
        }
    })
    const store = useStore();
    const loadAccepted = ref<boolean>(false);
    const laodInterest = ref<boolean>(false);
    const paramsContre = ref<any>({})
    const isShowModal = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const userConnectedId = computed(() => store.getters['UserModule/getUserDetails'].id)

    watch(() => paramsContre.value, (value : any) => {
        store.dispatch('CommunityModule/getDetailsPublication', value)
    }, {immediate : true, deep : true})

    function handleDate(date : Date){
        return moment(date).format("D MMMM YYYY");
    }
    
    function handleHour(date : Date){
        return moment(date).format('LTS')
    }
 
    async function handleAction(btnItem : any, itemId :any){
        paramsContre.value = {
            ...paramsContre.value,
            post : itemId,
            isOk : false
        }
        switch (btnItem.id) {
            case 0:
                console.log("Interressé");
                laodInterest.value= true
                await store.dispatch('CommunityModule/responseServcie',{post : itemId, isOk : true})
                .then(res => {
                notification['success']({
                        message : "Succèss",
                        description : "Vous êtes intéressé"
                    })
                }).catch((err) => {
                    notification['error']({
                        message : "Erreur",
                        description : "Une erreur s'est produite"
                    })
                }).finally(() => {
                    laodInterest.value = false;
                })
                break;
            
            case 1:
                console.log("Contre proposition\n", paramsContre.value);
                handleShowModal();
                break;

            default:
                break;
        }
    }

    async function handleAccepted(idPost : number, idResponse : number){
        console.log(`Accepted\n ${idPost} ,  ${idResponse}`);
        loadAccepted.value = true;
        await store.dispatch('CommunityModule/accepteResponse', {post : idPost, response : idResponse});
        loadAccepted.value = false;
    }

    function handleShowModal(){
        if(isShowModal.value){
            store.dispatch('CommunityModule/getDetailsPublication', paramsContre.value)
        }
        isShowModal.value = !isShowModal.value;
    }

    async function handleDoProposition(){
        console.log('param\n', paramsContre.value);
        loading.value = true;
        await store.dispatch('CommunityModule/contreProposition')
        .then(res => {
            isShowModal.value = false;
            notification['success']({
                message : "Succèss",
                description : "Contre proposition envoyé"
            })
        }).catch((err) => {
            notification['error']({
                message : "Erreur",
                description : "Une erreur s'est produite"
            })
        }).finally(() => {
            loading.value = false;
        })
        
    }

</script>

<template>
    <div class="serviceRequest">
        <Paragraphe class="serviceRequest__title">
            Demande de service
        </Paragraphe>
        <ul class="serviceRequest__info">
            <!-- {{publication.author.id}}
            {{userConnectedId}} -->
            <!-- <li
                v-for="(item, index) in serviceRequestData"
                :key="index"
                class="serviceRequest__info--item"
            >
                <Icon :icon-name="item.icon" />
                <span> {{ item.label }} </span>
            </li> -->
            <li
                class="serviceRequest__info--item"
            >
                <Icon icon-name="RepaireService" />
                <span>{{publication.content}}</span>
            </li>
            <li
                class="serviceRequest__info--item"
            >
                <Icon icon-name="CalendarFill" />
                <span>{{handleDate(publication.service.date)}}</span>
            </li>
            <li
                class="serviceRequest__info--item"
            >
                <Icon icon-name="TimeRounded" />
                <span>
                    {{handleHour(publication.service.startTime)}} à {{handleHour(publication.service.endTime)}}
                </span>
            </li>
            <li
                class="serviceRequest__info--item"
            >
                <Icon icon-name="MapMarker" />
                <span>{{publication.service.address}}</span>
            </li>
            <li
                class="serviceRequest__info--item"
            >
                <Icon icon-name="PriceTag" />
                <span>{{publication.service.price}} €</span>
            </li>
        </ul>
        <div class="serviceRequest__container--wrap" v-if="publication.service.status === 'Concluded' && userConnectedId === publication.author.id">
            <div v-for="(accept, idAccept) in publication.service.responses" :key="idAccept">
                <div v-if="accept.status === 'Accepted'" class="serviceRequest__accepted-container">
                    <Paragraphe>Vous avez accepté l'offre de <span class="serviceRequest__title-name">{{accept.author.name}}</span>. Veuillez le contacter.</Paragraphe>
                    <ul class="">
                        <li
                            class="serviceRequest__info--item"
                        >
                            <Icon icon-name="Mail" />
                            <span> {{accept.author.email}} </span>
                        </li>
                        <li
                            class="serviceRequest__info--item"
                        >
                            <Icon icon-name="Phone" />
                            <span> {{accept.author.telephone ?? 'N/A'}} </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="serviceRequest__content" v-else-if="publication.service.status !== 'Concluded'">
            <div class="serviceRequest__container--wrap" v-if="userConnectedId === publication.author.id">
                <label class="serviceRequest__title--label">{{publication.service.responses.length}} intéréssé(e)</label>
                <div class="serviceRequest__container">
                    <Card
                        v-for="(item, index) in publication.service.responses"
                        :key="index"
                    >
                        <div class="serviceRequest__info--wrap">
                            <Paragraphe>
                                <span> {{ item.author.name }} </span>
                                est intéressé(e) à cette service
                            </Paragraphe>
                            <ul class="serviceRequest__info">
                                <li
                                    class="serviceRequest__info--item"
                                >
                                    <Icon icon-name="Mail" />
                                    <span> {{item.author.email}} </span>
                                </li>
                                <li
                                    class="serviceRequest__info--item"
                                >
                                    <Icon icon-name="Phone" />
                                    <span> {{item.author.telephone ?? 'N/A'}} </span>
                                </li>
                                <li
                                    class="serviceRequest__info--item"
                                >
                                    <Icon icon-name="MapMarker" />
                                    <span>{{item.author.address}}</span>
                                </li>
                            </ul>

                            <ul class="serviceRequest__info">
                                <hr>
                                <li>Proposition</li>
                                <li
                                    class="serviceRequest__info--item"
                                    v-if="item.date && (item.date !== publication.service.date)"
                                >
                                    <Icon icon-name="CalendarFill" />
                                    <span>{{handleDate(item.date)}}</span>
                                </li>
                                <li
                                    class="serviceRequest__info--item"
                                    v-if="(item.startTime || item.endTime) && ((item.startTime !== publication.service.startTime) || (item.endTime !== publication.service.endTime))"
                                >
                                    <Icon icon-name="TimeRounded" />
                                    <span>{{handleHour(item.startTime)}} à {{handleHour(item.endTime)}}</span>
                                </li>
                                <li
                                    class="serviceRequest__info--item"
                                    v-if="item.price && (item.price !== publication.service.price)"
                                >
                                    <Icon icon-name="PriceTag" />
                                    <span>{{item.price}} €</span>
                                </li>

                            </ul>


                        </div>
                        <div class="serviceRequest__button">
                            <Button 
                                type-button="secondary"
                                @click="handleAccepted(publication.id, item.id)"
                            > 
                                <LoadingButton size="xs" v-if="loadAccepted"/>
                                Accepter 
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
            
        </div>
        <div class="serviceRequest__btn-footer-container" v-if="userConnectedId !== publication.author.id">
            <Button 
                class="serviceRequest__btn-footer" 
                type-button="gray" 
                v-for="(itemAction, idAction) in actionButton" :key="idAction"
                @click="handleAction(itemAction, publication.id)"
            >
                <LoadingButton size="xs" theme="dark" v-if="itemAction.id === 0 && loadAccepted" />
                {{itemAction.label}}
            </Button>
        </div>
        <Modal
            :is-show-modal="isShowModal"
            @on-back="handleShowModal"
            title="Contre-proposition"
        >
            <template #content>
                <PublicationServiceHelp
                    :contre="true"
                />
                <div class="serviceRequest__modal-button">
                        <Button typeButton="secondary" @click="handleDoProposition">
                            <LoadingButton size="xs" v-if="loading"/>
                            Publier
                        </Button>
                </div>
            </template>
        </Modal>
    </div>
</template>
<style lang="scss" scoped>
    @import '@/style.scss';
    .serviceRequest {
        &__title {
            @apply text-grayIcon;
        }
        @apply flex flex-col gap-y-[18px];
        &__info {
            @apply flex flex-col gap-y-[6px];
        }
        &__info--item {
            @apply flex items-start gap-x-[10px];
            .icon {
                @apply mt-[1px];
            }
            span {
                @apply font-[600];
            }
        }
        &__title--label {
            @apply uppercase;
        }
        &__container--wrap {
            @apply flex flex-col rounded-[14px] bg-gray p-[14px] gap-y-[18px];
        }
        &__container {
            max-height: 216px;
            @apply overflow-y-auto grid grid-cols-1 gap-[14px];
            @include scrollbar;
            @screen sm {
                @apply grid grid-cols-2;
            }
            .paragraphe__normal {
                @apply mb-[9px];
            }
        }
        .card-container {
            @apply flex flex-col justify-between;
        }
        &__button {
            @apply flex justify-end mt-[18px];
        }

        &__btn-footer-container{
            @apply flex gap-[8px];
        }

        &__btn-footer{
            @apply flex-1;
        }

        &:deep(){
            .button__gray{
                @apply font-light flex-1 w-[100%];
            }
        }

        &__content{
            @apply flex flex-col gap-[10px];
        }

        &__title-name{
            @apply font-bold;
        }

        &__accepted-container{
            @apply flex flex-col gap-[10px];
        }

        &__modal-button {
            @apply flex justify-end mt-[15px];
        }
    }
</style>
