<script setup lang="ts">
    import TransitionComponent from '@/components/Common/Transition/Transition.vue';
    import Terasse from '@/components/Icon/Terasse.vue';
    import Professional from '@/components/Icon/Professional.vue';
    import Visite from '@/components/Icon/Visite.vue';
    import { onMounted, ref } from 'vue';
    import { Store, useStore } from "vuex";
    import Loader from '@/components/Common/Loader/Loader.vue';
    import moment from 'moment';

    const store : Store<any> = useStore(); 
    const compromisHistory = ref<any>([]);
    const loading = ref<boolean>(false);

    onMounted(async () => {
        loading.value = true;
        const allId = await store.getters['MakeOfferModule/getIdToGetHistory'];
        store.dispatch('MakeOfferModule/setHistoryCompromis', {
            idOffer : allId.idOffer,
            idCompromis : allId.idCompromis
        }).then(() => {
            loading.value = false;
            compromisHistory.value = store.getters['MakeOfferModule/getListHistory'];
        })
    });

    function changeDate(date : string){
        return moment(date).format('LL')
    }
    

</script>

<template>
    <div>
        <Loader v-if="loading" />
        <div class="" v-else>
            <div class="" v-for="(item, idItem) in compromisHistory.discussion" :key="idItem">
                <TransitionComponent >
                    <div class="history__content mb-2">
                        <div class="history__icons"><Professional /> {{item.user.name}} {{item.user.firstname}} </div>
                        <div class="history__date"> {{changeDate(item.createdat)}} </div>
                    </div>
                </TransitionComponent>
                <hr class="mb-[20px] mt-[20px]" />
            </div>
            <!-- <TransitionComponent>
                <div class="history__content mb-2">
                    <div class="history__icons"><Visite /> Acquereur</div>
                    <div class="history__date">Hier</div>
                </div>
            </TransitionComponent>
            <hr class="mb-[20px] mt-[20px]" />
            <TransitionComponent>
                <div class="history__content">
                    <div class="history__icons"><Terasse /> Agence immobiliere</div>
                    <div class="history__date">18 dec 2021</div>
                </div>
            </TransitionComponent>
            <hr class="mb-[20px] mt-[20px]" /> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
    .history {
        &__content {
            @apply flex flex-row justify-between;
        }

        &__icons {
            @apply flex flex-row gap-[15px];
        }

        &__date {
            color: var(--color-gray-icon);
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
        }
    }
</style>
