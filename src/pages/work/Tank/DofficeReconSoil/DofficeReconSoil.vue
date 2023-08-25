<template>
    <div class="work">
        <div v-for="item in expertList" class="work__expertList">
            <ExpertCard
                :expertData="item"
                @handleChoiceExpert="handleChoiceExpert"
            />
        </div>
        <div class="work__btnContainer">
            <Button
                :disabled="expertSelected.length === 0"
                @on-click="showModalExpert"
                typeButton="border"
                >Faire une demande de devis</Button
            >
            <Button @on-click="gotoCalculCost" typeButton="border"
                >Calculer le cout moyenne</Button
            >
        </div>
        <Modal
            width="700"
            title="Demander un devis"
            :isShowModal="isShowModal"
            @onBack="onCloseModal"
        >
            <template #content>
                <h1>sdfsdf</h1>
                <SendMailExpert
                    @sendMailExpert="sendMailExpert"
                    @handleUploadExpert="handleUploadExpert"
                />
                <!-- <SaveDoc @closeModalSaveDoc="onCloseModal" /> -->
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import SendMailExpert from '../SendMailExpert/SendMailExpert.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import ExpertCard from '../../Components/ExpertCard/index.vue';
    import { useRoute } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { createFormData } from '@/utils/formdata/formData';

    const route = useRoute();
    const store: Store<any> = useStore();
    let expertList = ref<Array<any>>([]);
    const expertSelected = ref<Array<any>>([]);
    let isExpertChoosed = ref<boolean>(false);
    let list = ref<Array<any>>([]);
    let isShowModal = ref<boolean>(false);
    let imagesExpert = ref<Array<any>>([]);

    onMounted(() => {
        getExpertSoil();
    });

    const emit = defineEmits(['gotoCalculCost']);

    const gotoCalculCost = () => {
        emit('gotoCalculCost');
    };

    const sendMailExpert = async () => {
        // btnLoadingExpert.value = true;
        let params = {
            idTheProperty: route.params.id,
            extProviderId: expertSelected.value,
            images: imagesExpert.value,
        };
        let req = createFormData(params);
        console.log('expert list:', expertSelected.value);

        try {
            await store.dispatch('WorksModule/setContactExpert', req);
            const data = computed(
                () => store.getters['WorksModule/getContactExpert']
            );
            console.log('datatatatatatata:', data.value);

            if (data.value.data.code === 200) {
                notification['success']({
                    message: 'Votre demande de devis a bien été envoyer',
                });
                // isExpertContacted.value = true;
                // isDisabled.value = false;
                expertSelected.value = [];
            }
            // btnLoadingExpert.value = false;
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            // btnLoadingExpert.value = false;
        }

        console.log('params:', req);
        // expertSelected.value = [];
    };

    const handleUploadExpert = (value: any) => {
        imagesExpert.value = value;
        console.log('image expertsssss:', imagesExpert.value);
    };

    const onCloseModal = () => {
        isShowModal.value = false;
    };

    const showModalExpert = () => {
        isShowModal.value = true;
    };

    const handleChoiceExpert = (item: any) => {
        Object.values(item).forEach((el) => {
            const index = list.value.indexOf(item);
            if (el === true) {
                if (index === -1) {
                    list.value.push(item);
                }
            } else {
                list.value.splice(index, 1);
            }
        });
        expertSelected.value = list.value.map((obj) => {
            for (const key in obj) {
                return key;
            }
        });
        isExpertChoosed.value = true;
        console.log('list exp item:', expertSelected.value);
        // emit('handleChoiceExpert', list.value);
    };

    const getExpertSoil = async () => {
        let res = await store.dispatch(
            'WorksModule/setListExpertSoilPollution'
        );
        expertList.value = res;
        console.log('res expert:', expertList.value);
    };
</script>

<style lang="scss" scoped>
    .work {
        @apply flex flex-col justify-center items-center;
        @screen md {
            @apply flex;
        }
        @screen lg {
            @apply grid grid-cols-2 gap-[14px];
        }
        &__expertList {
        }

        &__btnContainer {
            @apply flex flex-row gap-[8px];
        }
    }
</style>
