<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import RadioButton from '@/components/Common/RadioButton/RadioButton.vue';
    import { diffDate } from "@/utils/date/diffDate";
    import { useStore } from 'vuex';
    import moment from 'moment';

    const props = defineProps({
        publication : {
            type : Object,
            default :  {}
        }
    }) 

    const options = [
        {
            id : 0,
            value: true,
            label: 'Je suis d’accord',
            checkedNumber: 0,
        },
        {
            id : 1,
            value: false,
            label: 'Je suis contre',
            checkedNumber: 0,
        },
    ];
    
        
    const store = useStore();

    async function handleVote( e : any, idPost : number,){
        await store.dispatch('CommunityModule/voteConsultation', {
            isFor : e.target.value,
            post : idPost
        }).then(res => {
            store.dispatch('CommunityModule/getConsultation', JSON.parse(localStorage.getItem('consultations') || '{}'))
        })
        
    }

    function handleDate(date : string){
        return moment(date).format('D MMM YYYY');
    }
</script>

<template>
    <div class="consult" v-if="props.publication">
        <Title
            type="h4"
            :label="props.publication.consultation?.subject"
            weight="bold"
            class="consult__title-name"
        />
        <div class="consult__container">
            <RadioButton
                :typeAction="props.publication.type"
                :element="options"
                :vote="props.publication.consultation.votes"
                class="radioElementClass"
                name="radioButtonGroupCheck"
                @get-radio-input="handleVote($event, props.publication.id)"
            />
        </div>
        <div class="consult__date-limit">
            <span> Fin de vote : </span>
            <strong> {{handleDate(props.publication.consultation.dateCloture)}} </strong>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .consult {
        @apply flex flex-col gap-y-[18px];
        &__title-name {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            @apply text-grayIcon;
        }
        &__date-limit {
            @apply text-grayIcon;
            strong {
                @apply font-[600];
            }
        }
    }
</style>
