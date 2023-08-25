<template>
    <div class="solicitExpresions">
        <Title
            type="h3"
            label="Etablir un partenariat"
            class="solicitExpresions__title"
        />
        <hr class="__hr" />
        <div class="solicitExpresions__container">
            <CheckBox
                label="Avec la commune"
                :return-boolean="false"
                value="municipality"
                @click="handleClick('municipality', $event)"
            />
            <CheckBox 
                label="Avec l’association « Les débuts des haricots »" 
                @click="handleClick('association', $event)" 
                />
        </div>
    </div>
    <Modal
        title="Service environnement de la commune"
        :isShowModal="isShowModal"
        @onBack="isShowModal = false"
    >
        <template #content>
            <div class="modal">
                <TextArea
                    label="Message"
                    :autoSize="rows"
                    placeholder="Ajouter votre message..."
                    nameInput="content"
                    @handle-change="handleTextChange"
                />
                <div class="modal__button">
                    <Button class="modal__button-cancel" @click="closeModal">
                        Annuler
                    </Button>
                    <Button @click="sendMessage"> Envoyer </Button>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import { notification } from 'ant-design-vue';
    import { useStore } from 'vuex';
    import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
    interface payloadI {
        content: '';
    }

    const collectiveGardenData =  computed(()=> store.getters["CollectiveGardenModule/getCollectiveGardenData"])
    const store = useStore();
    const route = useRoute();
    const rows = { minRows: 6, maxRows: 10 };
    let receiver : string;
    const isShowModal = ref<boolean>(false);

    let payload = {};
    const handleClick = (value: string, _ : any) => {
        receiver = value;
        if (value) {
            isShowModal.value = true;
        }
        
    };
    function handleTextChange($event: any) {
        payload = { ...payload, ...$event };
    }
    function callback() {
        notification.success({
            message: 'Votre sollicitation a bien été publié',
        });
        closeModal();
    }
    function sendMessage() {
        if(receiver === 'municipality'){

            payload  = {
                ...payload,
                colectiveGarden : collectiveGardenData.value.id,
                project  : collectiveGardenData.value.id,
                subject : 'Demande de partenariat',
                urlSite : `environment/${route.params.id}/jardin-collectif/`
            }
            store.dispatch('CollectiveGardenModule/contactMunicipality', {
            data: payload,
            callback,
        });
        }else{
            //pour l'assicion des  haricot
        }
    }
    function closeModal() {
        isShowModal.value = false;
    }
    
</script>

<style lang="scss" scoped>
    .solicitExpresions {
        @apply flex flex-col gap-[24px];
        &__title {
            @media (max-width: 575px) {
                @apply hidden;
            }
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
        &__container {
            @apply flex flex-col gap-[18px];
            &:deep() {
                .checkbox__container {
                    @apply max-w-none;
                }
                .ant-checkbox-wrapper {
                    @apply bg-gray px-[18px] py-[26px] font-[400] text-grayIcon rounded-[8px];
                }
                .ant-checkbox-checked::after {
                    @apply border-grayIcon;
                }
                .ant-checkbox-inner {
                    @apply border-grayIcon;
                }
                .ant-checkbox-checked .ant-checkbox-inner::after {
                    @apply border-grayIcon;
                }
            }
        }
    }

    .modal {
        @apply flex flex-col gap-[18px];
        &__button {
            @apply flex justify-end items-center gap-[14px];
            &-cancel {
                &:deep() {
                    button {
                        @apply text-primary bg-gray;
                    }
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
