<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import RadioButton from '@/components/Common/RadioButton/RadioButton.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import moment from 'moment';
    import { useStore } from 'vuex';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref } from 'vue';

    const options = [
        {
            id : 0,
            value: true,
            label: 'Je suis d’accord',
            checkedNumber: true,
        }, 
        {
            id : 1,
            value: false,
            label: 'Je suis contre',
            checkedNumber: true,
        },
        {
            value: 'Faire un contre proposition',
            label: 'Faire un contre proposition',
            checkedNumber: false,
        },
    ];

    const store = useStore();
    const loading = ref<boolean>(false)
    const props = defineProps({
        publication : {
            type : Object,
            default : {}
        }
    });

    function handleDate(date : Date){
        return moment(date).format("D MMMM YYYY");
    }
    
    function handleHour(date : Date){
        return moment(date).format('LTS')
    }

    async function handleVote(e : any, post : number){
        await store.dispatch('CommunityModule/voteParty',{post, isFor : e.target.value})
    }

    async function handleValidateParty(itemId : any, status : number){
        loading.value = true;
        await store.dispatch('CommunityModule/validateParty', {id : itemId, status })
        .then(res => {
            
        }).finally(() => {
            loading.value = false;
        })
    }

</script>

<template>
    <div class="festival">
        <div class="festival__title--wrap">
            <Title
                type="h4"
                :label="'Je souhaite organiser une fête le ' + handleDate(publication.party.date) +'.'"
                weight="bold"
                class="festival__title-name"
            />
            <div class="festival__address">
                <Icon icon-name="Map" />
                <span>{{publication.party.place}}</span>
            </div>
        </div>
        <div class="festival__container--wrap">
            <div class="festival__container" v-if="publication.party.status === 'In progress'">
                <RadioButton
                    :element="options"
                    class="radioElementClass"
                    name="radioButtonGroupCheck"
                    @get-radio-input="handleVote($event, publication.id)"
                    :type-action="publication.type"
                    :vote="publication.party.votes"
                />
                <div class="festival__button--wrap">
                    <Button class="festival__button--cancel" @click="handleValidateParty(publication.id, 0)">
                        Annuler la fête
                    </Button>
                    <Button @click="handleValidateParty(publication.id, 1)"> 
                        <LoadingButton size="xs" v-if="loading"/>
                        <span v-else>Valider la fête</span> 
                    </Button>
                </div>
            </div>
            <div class="festival__container" v-else-if="publication.party.status === 'Accepted'">
                <div class="festival__valid">
                    <Paragraphe>
                        <strong>
                            Rendez-vous du fête de quartier le {{handleDate(publication.party.date)}}
                        </strong>
                    </Paragraphe>
                    <span
                        >Lieu :
                        <strong> {{publication.party.place}} </strong>  
                    </span>
                    <span
                        >Heure :
                        <strong> {{handleHour(publication.party.hour)}} </strong>
                    </span>
                </div>
            </div>
        </div>
        <div class="festival__date-limit">
            <span> Fin de vote : </span>
            <strong> {{handleDate(publication.party.dateCloture)}} </strong>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .festival {
        @apply flex flex-col gap-y-[18px];
        &__title--wrap {
            @apply flex flex-col gap-y-[6px];
        }
        &__title-name {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            @apply text-grayIcon;
        }
        &__container--wrap {
            background: url('@/static/images/bg-party.png');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center -20px;
            min-height: 266px;
            @apply p-[18px] rounded-[4px] flex flex-col justify-center;
        }
        &__container {
            max-width: 442px;
            @apply mx-auto w-full;
            &:deep() {
                .ant-radio-wrapper {
                    @apply bg-white;
                }
                .ant-radio-wrapper-checked {
                    @apply bg-primary;

                }
            }
        }
        &__date-limit {
            @apply text-grayIcon;
            strong {
                @apply font-[600];
            }
        }
        &__address {
            @apply flex gap-x-[14px] text-grayBlack;
            .icon {
                @apply items-start mt-[2px];
                &:deep() {
                    svg {
                        @apply w-auto h-[18px];
                        path {
                            @apply fill-grayBlack;
                        }
                    }
                }
            }
        }
        &__button--wrap {
            @apply flex justify-end mt-[18px] gap-x-[14px];
        }
        &__button--cancel {
            &:deep() {
                button {
                    @apply bg-white text-primary;
                }
            }
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
    }
</style>
