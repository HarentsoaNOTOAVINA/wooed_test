<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import { formatDateFr, formatHourFr } from "@/utils/date/format";
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { notification } from "ant-design-vue";
  

    const guestListData = [
        {
            name: 'RAKOTONRINA Harinjaka',
            address: 'Ambohimanarina, Tananarive, Madagascar',
            phone: 123456,
        },
        {
            name: 'RAKOTONRINA Harinjaka',
            address: 'Ambohimanarina, Tananarive, Madagascar',
            phone: 123456,
        },
        {
            name: 'RAKOTONRINA Harinjaka',
            address: 'Ambohimanarina, Tananarive, Madagascar',
            phone: 123456,
        },
        {
            name: 'RAKOTONRINA Harinjaka',
            address: 'Ambohimanarina, Tananarive, Madagascar',
            phone: 123456,
        },
    ];

    const props = defineProps({
        publication : {
            type : Object,
            default : {}
        }
    })

    const store = useStore();
    const loading = ref<boolean>(false);

    async function handlePresent(pubId : any, status : any){
        console.log("I am present\n", pubId);
        loading.value = true
        await store.dispatch('CommunityModule/houseWarningPresent', {post : pubId})
        .then(() => {
            if(!status){
                notification['success']({
                    message : "Succès",
                    description : "Vous êtes maintenant dans la liste de présent"
                })
            }else{
                notification['success']({
                    message : "Succès",
                    description : "Vous n'êtes plus sur la liste"
                })
            }
        }).catch(err => {
            console.error(err);
            
            notification['error']({
                message : "Erreur",
                description : "Une erreur s'est produite, veuillez le réessayer plus tard"
            })

        }).finally(() => {
            loading.value = false;
        })
    }
 
</script>

<template>
    <div class="houseWarming">
        <div class="houseWarming__container">
            <div class="houseWarming__item">
                <div class="houseWarming__valid">
                    <Paragraphe>
                        <strong>
                            Pendaison de crémaillère le {{formatDateFr(publication.houseWarming.date)}}
                        </strong>
                    </Paragraphe>
                    <span
                        >Lieu :
                        <strong> {{publication.houseWarming.place ?? 'N/A'}}</strong>
                    </span>
                    <span
                        >Heure :
                        <strong> {{formatHourFr(publication.houseWarming.hour) }} </strong>
                    </span>
                    <Button @click="handlePresent(publication.id, publication.houseWarming.isPresent)" v-if="!publication.houseWarming.isPresent"> 
                        <LoadingButton size="xs" v-if="loading" />
                        Je serai présent 
                    </Button>
                    <div class="" v-else>
                        <Paragraphe>Vous êtes déjà sur la liste</Paragraphe>
                        <Button @click="handlePresent(publication.id, publication.houseWarming.isPresent)" type-button="border"> 
                            <LoadingButton size="xs" v-if="loading" theme="dark" />
                            Annuler
                        </Button>
                    </div>

                    <!-- <Button> Annuler ma présent </Button> -->
                </div>
            </div>
            <Card class="houseWarming__lists--container">
                <div class="houseWarming__head--list">
                    <Title
                        type="h4"
                        label="List des invités"
                        weight="600"
                        class="houseWarming__head--title"
                    />
                    <hr class="__hr" />
                </div>
                <div class="houseWarming__lists">
                    <div
                        v-for="(item, index) in publication.houseWarming.presents"
                        :key="index"
                        class="houseWarming__list--item"
                    >
                        <div class="houseWarming__list--content__info">
                            <Icon icon-name="Profile" />
                            <span class="font-[600]">
                                {{ item.name }}
                            </span>
                        </div>
                        <div class="houseWarming__list--content__info">
                            <Icon icon-name="MapMarker" />
                            <span>{{ item.address ?? 'N/A' }}</span>
                        </div>
                        <div class="houseWarming__list--content__info">
                            <Icon icon-name="Phone" />
                            <span>{{ item.telephone ?? 'N/A' }}</span>
                        </div>
                    </div>
                </div>  
            </Card>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import '@/style.scss';
    .houseWarming {
        @apply flex flex-col gap-y-[18px];
        &__container {
            background: url('@/static/images/bg-party.png');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center -20px;
            height: 375px;
            @apply flex items-center p-[18px] rounded-[4px];
        }
        &__item {
            @apply mx-auto w-full flex items-center h-full;
            &:deep() {
                .ant-radio-wrapper {
                    @apply bg-white;
                }
            }
        }
        &__lists--container {
            @apply w-full h-full;
        }
        &__valid {
            @apply flex flex-col items-center text-center gap-y-[4px];
            span {
                @apply text-grayBlack text-[12px];
                strong {
                    @apply text-black;
                }
            }
        }
        &__head--list {
            @apply w-full flex flex-col gap-y-[9px];
        }
        &__head--title {
            @apply text-grayIcon;
        }
        &__lists {
            height: calc(100% - 32px);
            @apply flex flex-col overflow-y-auto px-[14px] -mx-[14px] pt-[10px] gap-y-[4px];
            @include scrollbar;
        }
        &__list--item {
            @apply flex flex-col bg-gray p-[4px] rounded-[4px] gap-y-[4px];
        }
        &__list--content__info {
            @apply flex gap-x-[4px];
            span {
                line-height: 1.1;
            }
            &:deep() {
                .icon {
                    @apply items-start mt-[4px];
                }
                svg {
                    @apply w-[14px] h-[14px];
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
