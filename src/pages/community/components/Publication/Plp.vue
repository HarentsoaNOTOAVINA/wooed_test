<script lang="ts" setup>
import { formatDateFr, formatHourFr } from "@/utils/date/format";
import { diffDate } from "@/utils/date/diffDate";
import Title from '@/components/Common/Title/Title.vue';
import RadioButton from '@/components/Common/RadioButton/RadioButton.vue';
import Icon from '@/components/Common/Icon/Icon.vue';
import Button from '@/components/Common/Button/Button.vue';
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import { useStore } from "vuex";
import LoadingButton from "@/components/Icon/LoadingButton.vue";
import File from "@/components/Icon/File.vue";
import { ref, computed } from "vue";


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
    ];


const props = defineProps({
    publication : {
        type : Object,
        default : {}
    }
});
const store = useStore();
const loadingVote = ref<boolean>(false);
const base_uri = ref<string>(import.meta.env.VITE_API_ROOT_URL);
const loadingSend = ref<boolean>(false);
const userId = computed(() => store.getters['UserModule/getUserDetails'].id);

async function handleVote(e : any, id : number){
    console.table({isFor : e.target.value, post : id});
    loadingVote.value = true;
    await store.dispatch('CommunityModule/votePlp', {isFor : e.target.value, post : id})
    loadingVote.value = false;
}

async function handleSend(idPost : number){

    loadingSend.value = true;
    console.log("send the email\n", idPost);

    await store.dispatch('CommunityModule/handleSendMailPlp', idPost)
    loadingSend.value = false;
}

</script>
<template>
    <div class="plp">
        <div class="plp__title--wrap">
            <Title
                type="h4"
                label="Petenaire local de prévention (PLP)"
                weight="bold"
                class="plp__title-name"
            />
            <a class="plp__address" :href="base_uri+publication.plp.pdf">
                <Icon icon-name="File" />
                <span>Fichier à télécharger</span>
            </a>
        </div>
        <div class="plp__container--wrap">
            <div class="plp__container plp__send-email" v-if="publication.plp.status === 'Sended'">
                <P>Partenaire Locale de Prévention</P>
                <Button type-button="border">Email déja énvoyer</Button>
            </div>
            <div class="plp__container" v-else>
                <RadioButton
                    :element="options"
                    class="radioElementClass"
                    name="radioButtonGroupCheck"
                    @get-radio-input="handleVote($event, publication.id)"
                    :vote="publication.plp.votes"
                />
                <div class="plp__button--wrap" v-if="userId === publication.author.id && +diffDate(publication.plp.dateCloture) < 0">
                   <P class="plp__link">Le vote est terminé</P>
                    <Button @click="handleSend(publication.id)"> 
                        <LoadingButton size="xs" v-if="loadingSend"/>
                        <span v-else>Envoyer</span> 
                    </Button>
                </div>
            </div>
        </div>
        <div class="plp__date-limit">
            <span> Fin de vote : </span>
            <strong> {{formatDateFr(publication.plp.dateCloture)}} </strong>
        </div>
        <div class="plp__date-limit">
            <span> Nombre de participants : </span>
            <strong> {{publication.plp.numberOfMembers}} membre{{ +publication.plp.numberOfMembers > 1 ? 's' : ''}}</strong>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .plp {
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
            background: url('@/static/images/bg-plp.jpg');
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

        &__link{
            @apply text-blue-900;
        }

        &__send-email{
            @apply bg-white p-[20px] flex flex-col justify-center items-center;
        }
    }
</style>
