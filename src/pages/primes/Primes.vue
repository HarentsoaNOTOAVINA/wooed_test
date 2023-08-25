<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import { useStore } from "vuex";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import Loader from '@/components/Common/Loader/Loader.vue';
import Card from "@/pages/primes/components/Card.vue";
import { notification } from "ant-design-vue";
import Button from '@/components/Common/Button/Button.vue';
import BackButton from '@/components/Common/BackButton/BackButton.vue';
import AddPrimes from './components/AddPrimes.vue';

    const store = useStore();
    const listPrimes = ref<any>(null);
    const laoding = ref<boolean>(false);
    const routes = useRoute();
    const loadingDelete = ref<boolean>(false);
    const router = useRouter();
    const showModalDemande = ref<boolean>(false);
    const loadingModal = ref<boolean>(false);

    onMounted(() => {
        getAllPrimes();
    });

    watch(
        () => store.getters['PrimesModule/getAllPrimes'],
        (value) => {
            listPrimes.value = value;
        },
        { immediate: true, deep: true }
    );

async function getAllPrimes(){
        
    laoding.value = true;
    listPrimes.value = await store.dispatch('PrimesModule/getAllPrimes', routes.params.id);  
    laoding.value = false;  
    
}

    async function onClickDelete(id: number) {
        loadingDelete.value = true;
        await store
            .dispatch('PrimesModule/deleteProcedure', id)
            .then(() => {
                notification['success']({
                    message: 'Succès',
                    description: 'Procedure supprimé avec succès',
                });
            })
            .catch((err) => {
                notification['error']({
                    message: 'Erreur',
                    description:
                        "Une erreur s'est produite, veuillez réessayer",
                });
            })
            .finally(() => {
                loadingDelete.value = false;
            });
    }

    async function handleGetDetails(id: number) {
        router.push(`/primes/procedures/${id}`);
    }

    async function handleMakeRequest() {
        showModalDemande.value = true;

        const dataStore = store.getters['PrimesModule/getAllTypeOfWork'];

        if (!dataStore) {
            loadingModal.value = true;
            try {
                await store.dispatch('PrimesModule/getListTypeOfWork');
            } catch (err) {
                notification['error']({
                    message: 'Erreur',
                    description:
                        "Une erreur s'est produite, veuillez réessayer",
                });
            } finally {
                loadingModal.value = false;
            }
        }
        // router.push(`/primes/procedures/demandes`);
    }
    
    function handleBack() {
        router.back();
        // router.push(`/manage-property/details/${routes.params.id}`)
    }
</script>

<template>
    <div class="primes primes__container">
        <Loader v-if="laoding" />
        <div class="primes__header">
            <div class="primes__title">
                <BackButton @click="handleBack" />
                <P class="primes__header-title">Primes</P>
            </div>
            <div class="primes__header-content">
                <div class=""></div>
                <div class="primes__subtitle-container">
                    <P class="primes__header-subtitle1"
                        >Les procédures de demande de prime.</P
                    >
                    <P class="primes__header-subtitle2" v-if="!listPrimes"
                        >Vous n'avez commencé aucune procédure !</P
                    >
                    <P class="primes__header-subtitle2" v-else>
                        Vous avez effectué :
                        {{ listPrimes.length }} demande<span
                            v-if="listPrimes.length > 1"
                            >s</span
                        >.
                    </P>
                </div>
                <div class="primes__header-action">
                    <Button type-button="border" @click="handleMakeRequest"
                        >Faire une demande</Button
                    >
                </div>
            </div>
            <div class=""></div>
        </div>
        <div class="primes__list-container">
            <Card
                v-for="(item, index) in listPrimes"
                :key="index"
                :data="item"
                @on-delete="onClickDelete"
                :loading="loadingDelete"
                @on-details="handleGetDetails"
            />
        </div>
        <AddPrimes
            :show-modal="showModalDemande"
            @close="showModalDemande = false"
            :loading="loadingModal"
        />
    </div>
</template>

<style lang="scss" scoped>
    .primes {
        &__container {
            @apply container my-[10px] p-[10px] min-h-[calc(100vh_-_100px)] flex flex-col gap-[10px];
        }

        &__title {
            @apply flex gap-[10px] h-[30px];
        }

        &__list-container {
            @apply gap-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4;
        }

        &__header {
            @apply bg-white rounded-[8px] p-[20px];
        }

        &__header-title {
            @apply font-semibold flex justify-center items-center;
        }

        &__header-subtitle1 {
            @apply font-semibold;
        }

        &__header-subtitle2 {
            @apply text-[12px] italic;
        }

        &__subtitle-container {
            @apply flex flex-col justify-center items-center;
        }

        &__delete {
            @apply cursor-pointer;
        }

        &__header-content {
            @apply flex justify-between flex-col md:flex-row gap-[20px];
        }

        &__header-action {
            @apply flex justify-center;
        }

        &:deep() {
            .backBtn {
                @apply w-[30px] h-[30px] flex justify-center items-center rounded-[50%];
            }
        }
    }
</style>
