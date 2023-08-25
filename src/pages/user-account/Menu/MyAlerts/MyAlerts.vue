<template>
    <div v-if="loadList">
        <Loader />
    </div>
    <div class="myAlerts">
        <div class="myAlerts__delAllBtn" v-if="alertsList.length !== 0">
            <Button @on-click="showModalDelAll"
                ><LoadingButton v-if="loadBtn" /> Supprimer tous</Button
            >
        </div>

        <div class="myAlerts__head">
            <span class="myAlerts__headTxt">ADRESSES</span>
            <span class="myAlerts__headTxt">DATE</span>
            <span class="myAlerts__headTxt">ACTION</span>
        </div>
        <div v-if="alertsList.length === 0">
            <a-empty description="Vous n'avez pas d'alerte actuellement" />
        </div>
        <div v-else class="myAlerts__container">
            <div
                class="myAlerts__content"
                v-for="(item, index) in alertsList"
                :key="index"
            >
                <div class="myAlerts__fieldBordered">
                    <span class="myAlerts__fieldName">{{
                        item.address ? item.address : 'Non renseigné'
                    }}</span>
                </div>
                <span class="myAlerts__fieldDate">{{ item.created }}</span>
                <span class="myAlerts__fieldDate">
                    <Button @on-click="showModal" typeButton="primary-cancel"
                        >Supprimer</Button
                    >
                </span>
                <Modal
                    width="400"
                    title="Supprimer l'alerte"
                    :isShowModal="isShowModal"
                    @onBack="onCloseModal"
                >
                    <template #content>
                        <a-alert
                            message="Warning"
                            type="warning"
                            description="Voulez-vous vraiment supprimer cette alerte?"
                            show-icon
                        />

                        <div class="myAlerts__btnContainer">
                            <Button
                                @on-click="onCloseModal"
                                typeButton="primary-cancel"
                                >Non</Button
                            >
                            <Button @on-click="validateDelete(item.id)"
                                ><LoadingButton v-if="loadBtn" /> Oui</Button
                            >
                        </div>
                    </template>
                </Modal>
                <Modal
                    width="400"
                    title="Supprimer toutes les alertes"
                    :isShowModal="isShowModalAll"
                    @onBack="onCloseModal"
                >
                    <template #content>
                        <a-alert
                            message="Warning"
                            type="warning"
                            description="Voulez-vous vraiment tous supprimer?"
                            show-icon
                        />

                        <div class="myAlerts__btnContainer">
                            <Button
                                @on-click="onCloseModalAll"
                                typeButton="primary-cancel"
                                >Non</Button
                            >
                            <Button @on-click="deleteAll"
                                ><LoadingButton v-if="loadBtnAll" /> Oui</Button
                            >
                        </div>
                    </template>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { Alert as AAlert } from 'ant-design-vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import moment from 'moment';
    import { useStore } from 'vuex';
    import { onMounted, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    let alertsList = ref<Array<any>>([]);
    let loadList = ref<boolean>(false);
    let loadBtn = ref<boolean>(false);
    let loadBtnAll = ref<boolean>(false);
    let isShowModal = ref<boolean>(false);
    let isShowModalAll = ref<boolean>(false);

    onMounted(() => {
        getAllAlerts();
    });

    watch(
        () => alertsList.value,
        (newValue: any, oldValue) => {
            oldValue = newValue;
        },
        { deep: true, immediate: true }
    );

    function showModalDelAll() {
        isShowModalAll.value = true;
    }

    async function deleteAll() {
        try {
            loadBtnAll.value = true;
            let res = await store.dispatch('UserModule/setDeleteAlert');
            if (res.code === 200) {
                notification['success']({
                    message: 'Succès',
                    description: 'Votre alerte a été supprimé avec succès',
                });
            }
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue...',
                description: 'Veuillez réessayer',
            });
        } finally {
            loadBtnAll.value = false;
        }
    }

    function onCloseModalAll() {
        isShowModalAll.value = false;
    }

    function onCloseModal() {
        isShowModal.value = false;
    }

    async function getAllAlerts() {
        try {
            loadList.value = true;
            let res = await store.dispatch('UserModule/setAlertList');
            alertsList.value = res.map(({ id, name, created }: any) => ({
                id,
                name,
                created: moment(created).format('L'),
            }));
        } catch (error) {
        } finally {
            loadList.value = false;
        }
    }

    async function showModal() {
        isShowModal.value = true;
    }

    async function validateDelete(id: number) {
        try {
            loadBtn.value = true;
            let res = await store.dispatch('UserModule/setDeleteAlert', id);
            if (res.code === 200) {
                notification['success']({
                    message: 'Succès',
                    description: 'Votre alerte a été supprimé avec succès',
                });
            }
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue...',
                description: 'Veuillez réessayer',
            });
        } finally {
            loadBtn.value = false;
            isShowModal.value = false;
            // router.go(0);
        }
    }
</script>

<style lang="scss" scoped>
    .myAlerts {
        @apply flex flex-col;

        &__head {
            @apply flex justify-between mb-[8px];
        }

        &__headTxt {
            @apply font-[600] text-[var(--color-gray-icon)];
        }

        &__container {
            @apply flex flex-col gap-[8px];
        }

        &__content {
            border: 1px solid var(--color-gray);
            @apply flex justify-between rounded-[8px] text-center;
        }

        &__fieldBordered {
            @apply flex items-center;
        }

        &__fieldName {
            border-left: 2px solid red;
            @apply text-[#000] font-bold p-[18px];
        }

        &__fieldDate {
            @apply font-[400] p-[18px];
        }

        &__btnContainer {
            @apply flex justify-center gap-[18px] mt-[24px];
        }

        &__delAllBtn {
            @apply flex justify-end mb-[18px];
        }
    }
</style>
