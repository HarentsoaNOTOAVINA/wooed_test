<script lang="ts" setup>
    import { computed, onMounted, reactive, ref } from 'vue';
    import AgencyItem from '@/components/Display/AgencyItem/AgencyItem.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const store: Store<any> = useStore();
    let loadData = ref(true);
    const router = useRouter();
    interface IAgency {
        id: number;
        logo: string;
        name: string;
        personalNumber: number;
        email?: string;
        tva?: any;
        address: string;
        numberUsing?: string;
    }
    const choosenAgency = ref<IAgency | null>(null);
    let agencyList = ref<Array<IAgency>>([]);

    function chooseAgencyHandler(agencyItem: IAgency) {
        choosenAgency.value = agencyItem;
        console.log(choosenAgency.value);
        store.dispatch('AgenceModule/setSelectedAgence', choosenAgency.value);
        router.push(`/compte-agence/${agencyItem.name}`);
    }
    async function getAgencyList() {
        await store.dispatch('AgenceModule/setAgencyList');
        const data = computed(
            () => store.getters['AgenceModule/getAgencyList']
        );
        loadData.value = false;
        agencyList.value = [...data.value];
        console.log(agencyList.value, 'agence');
    }
    onMounted(() => {
        getAgencyList();
    });
</script>

<template>
    <Loader v-if="loadData" />
    <div v-else class="container-agency">
        <Paragraphe>
            <span>{{ agencyList.length }}</span>
            Agences
        </Paragraphe>
        <div class="container-agency__list">
            <AgencyItem
                v-for="(agencyItem, index) in agencyList"
                :key="index"
                :agencyData="agencyItem"
                @on-choose-agency="chooseAgencyHandler"
            />
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .container-agency {
        @apply flex flex-col gap-[24px];
        p {
            @apply text-[12px];
        }
        span {
            font-weight: bold;
        }
        &__list {
            @apply flex flex-col gap-[24px];
        }
    }
</style>
