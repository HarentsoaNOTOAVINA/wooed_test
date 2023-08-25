<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import CommunityCard from '@/pages/community/components/CommunityCard.vue';
    import QuarterCommitteeListItem from '@/pages/community/QuarterCommittee/QuarterCommiteeListItem/QuarterCommitteeListItem.vue';
    import { onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { useRouter } from "vue-router";

    const store = useStore();
    const route = useRouter();
    const loading = ref<boolean>(false);
    const listCommmunity = ref<any>();
    const communityListItem = [
        {
            title: 'Aminay',
            name: 'RANAIVONJANAHARY fabrice',
            members: 50,
            address: 'Tana',
        },
    ];
     
    onMounted(() => {
        getListCommunity();
        store.dispatch('CommunityModule/createPost');
    })

    async function getListCommunity(){
        loading.value = true;
        await store.dispatch('CommunityModule/getListOfCommunity').then(() => {
            if(store.getters['CommunityModule/getListCommunity']){
                console.log("Mbola tsy manana communauté aho");
                listCommmunity.value = store.getters['CommunityModule/getListCommunity'];
            }else{
                console.log("Efa manana communauté aho");
                const details = store.getters['CommunityModule/getDetailsCommunity'];
                route.push(`/community/publication/${details.committee.uid}`);
            }
        }).finally(() => {
            loading.value = false;
        })
    }
    
</script>

<template>
    <CommunityCard
    label-title="Comité de quartier"
    class="communityList__section"
    >
        <Loader v-if="loading" />
        <div v-else class="communityList__container">
            <div
                v-for="(item, index) in listCommmunity"
                :key="index"
                class="communityList__wrapper"
            >
                <QuarterCommitteeListItem
                    :commitee-title="item.name"
                    :commitee-name="item.name"
                    :commitee-members="item.numberOfMembers"
                    :commitee-address="item.address"
                    :data="item"
                />
            </div>
            <router-link
                to="/committee-creation"
                class="communityList__wrapper"
            >
                <CardWrapper class="communityList__add">
                    <Icon icon-name="AddOptions" class="communityList__icon" />
                </CardWrapper>
            </router-link>
        </div>
    </CommunityCard>
</template>
<style lang="scss" scoped>
    .communityList {
        &__container {
            @apply grid grid-cols-1 gap-[10px] w-full max-w-[313px] mx-auto;
            @screen sm {
                @apply grid-cols-2 gap-[14px] max-w-[650px];
            }
            @screen md {
                @apply grid-cols-1 max-w-[313px];
            }
            @screen lg {
                @apply grid-cols-2 max-w-[650px];
            }
            @screen xl {
                @apply grid-cols-3 max-w-[990px];
            }
        }
        &__wrapper {
            @apply min-h-[313px];
        }
        &__add {
            @apply h-full flex justify-center items-center transition-all;
            .communityList__icon {
                @apply w-[62px] h-[62px];
                &:deep() {
                    svg {
                        @apply w-full h-full;
                        path {
                            @apply stroke-primary;
                        }
                    }
                }
            }
            &:hover {
                @apply bg-gray transition-all;
            }
        }
        &__title {
            @apply text-[14px];
        }
    }
</style>
