<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="createGarden">
            <div class="createGarden__container">
                <StepCreated />
            </div>
        </MainCard>
        <!-- <Modal
            title="Créer un nouveau projet"
            :isShowModal="isShowModal"
            @onBack="isShowModal = false"
        >
            <template #content> Teste </template>
        </Modal> -->
    </div>
</template>

<script lang="ts" setup>
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { computed, onBeforeMount, onMounted, ref } from 'vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import StepCreated from './StepCreated.vue';
    import {useStore} from "vuex";
    import {useRouter, useRoute} from "vue-router";

    const router = useRouter();
    const route = useRoute();
    const store = useStore()

    const currentProperty = route.params.id;
    const breadcrumbListsData = [
        {
            label: 'Jardin collectif',
            url: `/environnement/${currentProperty}/jardin-collectif`,
        },
        {
            label: 'créer un nouveau jardin collectif',
        },
        
    ];
    
    
    const collectiveGarden = computed(()=> store.getters["CollectiveGardenModule/getCollectiveGardenData"])
    onMounted(()=>{
        // if(collectiveGarden.value.id < 0){
        //     router.push(`/environnement/${route.params.id}/jardin-collectif`)
        // }
    })
    const isShowModal = ref<boolean>(false);

    const handleClick = (value: object) => {
        isShowModal.value = true;
    };


</script>

<style lang="scss" scoped>
    .createGarden {
        @apply relative;
        &__container {
            @apply flex flex-col gap-[14px];
            @screen md {
                @apply mb-[18px];
            }
        }
        &:deep() {
            .mainCard__items-wrap {
                @screen md {
                    height: calc(100vh - 224px);
                }
            }
            .steps-btn {
                @apply justify-between gap-[10px] w-full pt-[18px];
                border-top: 1px solid theme('colors.gray');
                & > div,
                button {
                    @apply w-full;
                }
                & > div:first-child {
                    button {
                        @apply border-gray;
                    }
                }
                & > div:last-child {
                    button {
                        @apply border-primary bg-primary text-white;
                    }
                }
                @screen sm {
                    @apply justify-end;
                    & > div,
                    button {
                        @apply w-auto;
                    }
                }
                @screen md {
                    width: calc(100% - 36px);
                    @apply absolute bottom-0 z-[400] py-[18px];
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
