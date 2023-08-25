<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData">
            <div class="agent__container">
            </div>
            <Loader v-if="loading" />
            <div class="agent__container--empty"  v-else-if="!listAgent">
                <div class="agent__items--empty">
                    <Icon icon-name="IllustrationJoyride" />
                    <Paragraphe>
                        Désolé, il n'y a pas d'agent dans votre quartier.
                    </Paragraphe>
                </div>
            </div>
            <div class="agent__body" v-else>
                <AgentCard  
                    title="Commissaire"
                    :name="listAgent.commissionership.name"
                    :email="listAgent.commissionership.email"
                    :phone="listAgent.commissionership.telephone"
                />
                <AgentCard  
                    title="Inspecteur"
                        :name="listAgent.inspector.name"
                    :email="listAgent.inspector.email"
                    :phone="listAgent.inspector.telephone"
                />
            </div>
        </MainCard>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { onMounted, ref } from 'vue';
    import { useStore } from "vuex";
    import Loader from '@/components/Common/Loader/Loader.vue';
    import AgentCard from "@/pages/security/components/AgentCard.vue";
    import { useRoute } from "vue-router";

    const breadcrumbListsData = [
        {
            label: 'Mon agent de quartier',
        },
    ];

    const routes = useRoute();
    const store = useStore();
    const listAgent = ref<any>(null);
    const loading = ref<boolean>(false);

    onMounted(() => {
        getInTheStoreOrBack();
    })

    function getInTheStoreOrBack(){
        const data = store.getters['SecurityModule/getAllNeightborhood'];
        if(data){
            listAgent.value = data
        }else{
            getListAgent();
        }
    }

    async function getListAgent(){
        loading.value = true;
        const data = await store.dispatch('SecurityModule/getNeightborhood', routes.params.id);
        listAgent.value = data;
        loading.value = false;
        console.log("List of agent\n", data);
    }
</script>

<style lang="scss" scoped>
    .agent {
        &__container {
            &--empty {
                @apply h-full;
                @media (min-height: 442px) {
                    @apply h-full flex justify-center items-center;
                }
            }
        }
        &__items {
            &--empty {
                @apply flex flex-col gap-y-[10px] py-[10px] text-grayIcon text-center;
            }
        }

        &__body{
            @apply flex flex-col gap-[20px];
        }
    }
</style>
