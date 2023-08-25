<script setup lang="ts">
    import TransitionComponent from '@/components/Common/Transition/Transition.vue';
    import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import HistoryAgrement from './HistoryAgrement.vue';
    import PdfIcon from '@/components/Icon/Pdf.vue';
    import moment from 'moment';
    import { onMounted, ref } from 'vue';
    import { Store, useStore } from 'vuex';
    import Compromise from "@/pages/user-account/Menu/ClientCompromiseSign/ClientCompromiseSign.vue";

    const props = defineProps({
        compromisList : {
            type : Array,
        },
        title : {
            type : String,
            default : "Compromis"
        },
        idOffer : {
            type : Number
        }
    });

    const store : Store<any> = useStore();
        const emit = defineEmits(['on-change-cmp'])
        const compromis = ref<any>(props.compromisList)

    function changeDate(date : string){
        return moment(date).format('LL')
    }
    
    async function onClickCommenter(id : number){
        await store.dispatch('MakeOfferModule/getIdToGetHistory', 
        {
            idCompromis : id
        });
        emit('on-change-cmp', {
            label: 'Historique du document de la compromis ',
            value: HistoryAgrement,
            active: true,
        })
    }

    function signDoc(){
        console.log("sign");
        
        emit('on-change-cmp', {
            label: 'Compromise sign',
            value: Compromise,
            active: true,
        })
    }

    onMounted(() => {
        console.log(props.compromisList, 'compromisList');
    })

</script>

<template>
    <div class="offer__content">

        <div v-for="(item, idItem) in compromis" :key="idItem">
            <div class="offer__status">
                <div class="offer__status-online">
                    <div class="offer__status-title font-bold">
                        {{props.title}} {{idItem +1}}
                    </div>
                    <div :class="['offer__status-status signed ']">
                        {{item.status}}
                    </div>
                </div>  
                <div class="offer__status-content">
                    <Paragraph
                        >Dernier intervenant :
                        <span class="font-bold">{{item.lastDiscussionWithFile.user.name}} {{item.lastDiscussionWithFile.user.firstname}}</span></Paragraph
                    >
                    <Paragraph class="oneline"
                        >Date d’intervention :
                        <span class="font-bold">{{changeDate(item.created)}}</span>
                    </Paragraph>
                    <Paragraph class="oneline"
                        >Signe par le vendeur le :
                        <span class="font-bold"
                            >{{item.dateSignSeller ? item.dateSignSeller : "N/A"}} </span
                        ></Paragraph
                    >
                    <Paragraph class="oneline"
                        >Signe par l'acheteur le :
                        <span class="font-bold"
                            >{{item.dateSignClient ? item.dateSignClient : "N/A"}}</span
                        ></Paragraph
                    >
                    <Paragraph class="oneline pdf">
                        <PdfIcon />
                        <a :href="item.pathFile" class="offer__doc">Telecharger</a>
                        </Paragraph>
                </div>

                <div class="offer__status-action">
                    <Button typeButton="gray"
                     @click="onClickCommenter(item.id)"
                    > Historique </Button>
                    <Button typeButton="gray"> Commenter </Button>
                    <Button typeButton="gray" @click="signDoc"> Signer le document </Button>
                </div>
            </div>
        </div>
        <!-- <TransitionComponent>
            <div class="offer__status">
                <div class="offer__status-online">
                    <div class="offer__status-title font-bold">
                        Projet de compromis 2
                    </div>
                    <div :class="['offer__status-status signed ']">
                        uploaded
                    </div>
                </div>  
                <div class="offer__status-content">
                    <Paragraph
                        >Dernier intervenant :
                        <span class="font-bold">Jam</span></Paragraph
                    >
                    <Paragraph class="oneline"
                        >Date d’intervention :
                        <span class="font-bold">10 Novembre 2021</span>
                    </Paragraph>
                    <Paragraph class="oneline"
                        >Signe le :
                        <span class="font-bold"
                            >08 Novembre 2021 par Jean Benoit</span
                        ></Paragraph
                    >
                    <Paragraph class="oneline pdf">
                        <PdfIcon />
                        <span class="offer__doc">Telecharger</span></Paragraph
                    >
                </div>

                <div class="offer__status-action">
                    <Button typeButton="gray"> Historique </Button>
                    <Button typeButton="gray"> Commenter </Button>
                    <Button typeButton="gray"> Signer le document </Button>
                </div>
            </div>
        </TransitionComponent>

        <TransitionComponent>
            <div class="offer__status">
                <div class="offer__status-online">
                    <div class="offer__status-title font-bold">
                        Acte de vente 1
                    </div>
                    <div :class="['offer__status-status refused ']">
                        Acte de vente
                    </div>
                </div>

                <div class="offer__status-content">
                    <Paragraph
                        >Dernier intervenant :
                        <span class="font-bold">Jam</span></Paragraph
                    >
                    <Paragraph class="oneline"
                        >Date d’intervention :
                        <span class="font-bold">10 Novembre 2021</span>
                    </Paragraph>
                    <Paragraph class="oneline pdf">
                        <PdfIcon />
                        <span class="offer__doc">Telecharger</span></Paragraph
                    >
                </div>

                <div class="offer__status-action">
                    <Button
                        typeButton="secondary"
                        @on-click="
                            $emit('on-change-cmp', {
                                label: 'Historique du document de la compromis ',
                                value: HistoryAgrement,
                                active: true,
                            })
                        "
                    >
                        Historique
                    </Button>
                </div>
            </div>
        </TransitionComponent> -->
    </div>
</template>

<style scoped lang="scss">
    .offer {
        &__content {
            @apply mb-[10px];
        }
        &__status {
            @apply px-[24px] py-[18px] rounded-[4px] mb-[18px];
            border: 0.5px solid var(--color-stroke-gray);
        }

        &__status-online {
            @apply flex flex-row items-center justify-between;
        }

        &__status-content {
            @apply mt-2;
        }

        &__status-status {
            @apply px-[18px] py-[4px] rounded-[100px];
            background: var(--color-stroke-gray);
        }

        &__status-action {
            @apply max-w-[492px] flex flex-row items-center justify-start flex-wrap gap-[14px] mt-[24px];
        }
    }

    .pdf {
        @apply flex gap-[5px] cursor-pointer max-w-fit;
    }
    .oneline {
        @apply mt-3;
    }
    .accepted {
        background: var(--color-green);
    }
    .refused {
        color: var(--color-alert-str-rose);
        background: rgba(244, 67, 54, 0.2);
    }

    .signed {
        background: var(--color-stroke-gray);
    }
</style>
