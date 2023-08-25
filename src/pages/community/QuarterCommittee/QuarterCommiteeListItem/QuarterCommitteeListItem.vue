<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import Map from '@/components/section/map/index.vue';
    import moment from 'moment';
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import Loader from "@/components/Common/Loader/Loader.vue";
    import LoaderButton from '@/components/Icon/LoadingButton.vue'
    import { useRouter } from 'vue-router';
    import { notification } from "ant-design-vue";

    interface IData{
        coordinates : Array<any>,
        createdAt : Date | string,
        creator : Object,
        name : string,
        numberOfMembers : number,
        perimeterName : string,
        uid : string,
    }

    const store = useStore();
    const loadingJoin = ref<boolean>(false);
    const router = useRouter();

    const props = defineProps({
        commiteeTitle: { 
            type: String,
            default: '',
        },
        commiteeName: {
            type: String,
            default: '',
        },
        commiteeMembers: {
            type: Number,
            default: '',
        },
        commiteeAddress: {
            type: String,
            default: '',
        },
        data:{
            type : Object,
            default : {}
        }
    });

    function formatDate(date : Date | string){
        return moment(date).subtract(10, 'days').calendar();
    }
    
    async function joinCommunity(idCommunity : number | string){
        loadingJoin.value = true;
        const {data, success} = await store.dispatch('CommunityModule/joinCommunity',idCommunity);
        if(success === true){   
            notification['success']({
                message : 'Success',
                description : 'Vous êtes maintenant membre de ce communauté'
            })

        }else{
            notification['error']({
                message : 'Erreur',
                description : 'Vous ne pouvez pas joindre ce communauté, veuillez réessayer plus tard.'
            })
        }
        loadingJoin.value = false;
        router.push(`/community/publication/${data.committee.uid}`);
    }
</script>

<template>
    <CardWrapper class="communityListItem__container">
        <!-- <Loader v-if="loadingJoin" /> -->
        <div class="communityListItem__desc--wrap">
            <div class="communityListItem__map">
                <Map />
            </div>
            <div class="communityListItem__title--wrap">
                <h2 weight="600" class="communityListItem__title">
                    <strong>{{ props.data.name }}</strong> comité
                </h2>
                <div class="communityListItem__creationDate">
                    Créée le {{formatDate(props.data.createdAt)}}
                </div>
            </div>
            <div class="communityListItem__details">
                <div class="communityListItem__content">
                    <Icon icon-name="GridCreate" />
                    <span> {{ props.data.creator.name }} </span>
                </div>
                <div class="communityListItem__content">
                    <Icon icon-name="Member" />
                    <span> {{ props.data.numberOfMembers }} membres </span>
                </div>
                <div class="communityListItem__content" v-if="props.data.perimeterName">
                    <Icon icon-name="MapPinBorder" />
                    <span> {{ props.data.perimeterName }} </span>
                </div>
            </div>
        </div>
        <Button 
            type-button="secondary" 
            class="communityListItem__button"
            @click="joinCommunity(props.data.uid)"
        >   
            <span class="communityListItem__btn-container">
                <LoaderButton size="xs" v-if="loadingJoin" />
                Joindre
            </span>
        </Button>
    </CardWrapper>
</template>

<style lang="scss" scoped>
    .communityListItem {
        &__container {
            @apply h-full flex flex-col justify-between;
        }
        &__map {
            @apply w-full h-[184px] mb-[18px];
        }

        &__btn-container{
            @apply flex gap-[10px] w-[100%] text-center justify-center;
        }

        &__title--wrap {
            @apply flex justify-between gap-x-[5px] mb-[18px];
        }
        &__title {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            strong {
                font-weight: 600;
                font-size: 18px;
                line-height: 21px;
            }
        }
        &__creationDate {
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            background: rgba(255, 130, 130, 0.15);
            @apply text-alertStrRose px-[12px] py-[4px] rounded-[15px];
        }
        &__details {
            @apply flex flex-col gap-y-[10px] mb-[18px];
        }
        &__content {
            @apply flex gap-x-[15px];
            &:deep() {
                .icon {
                    @apply items-start mt-[4px];
                }
            }
        }
        &__button {
            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
    }
</style>
