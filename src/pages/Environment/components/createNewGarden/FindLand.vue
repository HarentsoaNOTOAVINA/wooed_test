<template>
    <div class="findLand">
        <Title type="h3" label="Trouver un terrain" class="findLand__title" />
        <hr class="__hr" />
        <div class="findLand__map--item">
            <Map 
                :needMarkerEventHandler="true"
                @touched="handleClick"
                />
        </div>
        <div v-if="showInfo" class="findLand__info  environment-bg-warn">
            <Paragraphe>Le propriétaire de la parcelle n'est pas membre de l'appli</Paragraphe>
        </div>
    </div>
    <Modal
        title="Le propriétaire de la parcelle est membre de l’appli"
        :isShowModal="isShowModal"
        @onBack="isShowModal = false"
    >
        <template #content>
            <ModalPlotOwner />
        </template>
    </Modal>
</template>

<script setup lang="ts">
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Map from '@/components/section/map/index.vue';
    import { computed, onBeforeMount, ref } from 'vue';
    import ModalPlotOwner from './components/ModalPlotOwner.vue';
    import {useStore} from "vuex";
    import {useRouter, useRoute} from "vue-router";

    const store = useStore()
    const isShowModal = ref<boolean>(false);
    const showInfo  = ref<boolean>(false);


    async function handleClick(value: object){
        store.commit("CollectiveGardenModule/setLocation",value)
        const result = await store.dispatch("CollectiveGardenModule/checkCadastreOwner",value);
        if(!!result.users.length) {
            isShowModal.value = true
        }else{
            showInfo.value = true
        }
    }
</script>

<style lang="scss" scoped>
    .findLand {
        @apply flex flex-col gap-[24px];
        &__title {
            @media (max-width: 575px) {
                @apply hidden;
            }
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
        &__map--item {
            max-height: 179px;
            @apply h-[179px] w-full mb-[10px];
            @screen sm {
                max-height: 300px;
                @apply h-[300px];
            }
            @screen md {
                max-height: calc(100vh - 275px);
                @apply h-[325px];
            }
        }
        &__checkbox {
            @apply flex flex-col gap-[10px];
        }
        &__info{
            @apply m-5 rounded-[8px];
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>


