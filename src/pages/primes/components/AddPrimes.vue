<template>
    <Modal
        :is-show-modal="isShow"
        @on-back="$emit('close')"
        title="Ajout prime"
    >
        <template #content>
            <div class="wrap-content">
                <Loader v-if="isLoading" />
                <div v-else>
                    <Select
                        :options="listTypeOfWork"
                        name="work"
                        label="Type de travaux"
                        placeholder="Selectionner le type travaux"
                        @change-select="handleSelect($event, 'work')"
                    />
                    <Select
                        v-if="listSubsection && listSubsection.length > 0"
                        :options="listSubsection"
                        name="subsection"
                        placeholder="Selectionner un sous section"
                        @change-select="handleSelect($event, 'subsection')"
                    />
                    <a-empty
                        v-else
                        description="Vous n'avez pas de sous-travaux dans votre quartier"
                    >

                    </a-empty>
                    <RadioButton
                        :element="listPrime"
                        type-view="prime"
                        @get-radio-input="handleChangeType"
                    />
                    <div
                        v-if="
                            contentPrime && contentPrime.complementary &&
                            Object.keys(contentPrime.complementary).length > 0
                        "
                        class="radio-type"
                    >
                        <CheckBox label="Prime communal complémentaire" name="primeCommunal" @handleCheck="handleCheck"/>
                    </div>
                    
                    <a-empty
                        v-else
                        description="Vous n'avez pas de sous-travaux dans votre quartier"
                    />
                    <div class="loading-container">
                        <LoadingButton theme="dark" v-if="loadingSubsection" />
                    </div>
                    <div
                        class="button-validation"
                        v-if="
                           showButton
                        "
                    >
                        <Button
                            type-button="secondary"
                            @on-click="handleGetDetailPrime"
                        >
                            Terminer
                            <LoadingButton
                                size="xs"
                                v-if="isLoadingBtn"
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import RadioButton from '@/components/Common/RadioButton/RadioButton.vue';
    import Button from '@/components/Common/Button/Button.vue';

    import { ref, watch, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter, useRoute } from 'vue-router';
import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
import { notification, Empty as AEmpty } from "ant-design-vue";

    const store = useStore();

    const props = defineProps({
        showModal: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    });

    const routes = useRoute();
    const router = useRouter();

    const isShow = ref<boolean>(props.showModal);
    const isLoading = ref<boolean>(props.loading);
    const loadingSubsection = ref<boolean>(false);
    const listTypeOfWork = ref();
    const listSubsection = ref();
    const listPrime = ref();
    const paramsSearchPrime = ref<object>({});
    const contentPrime = ref<any>();
    const showButton = ref<boolean>(false);
    const isLoadingBtn = ref<boolean>(false);
    const paramsAdd = ref<any>();

    onMounted(() => {
        listTypeOfWork.value = store.getters['PrimesModule/getAllTypeOfWork'];
        console.log(listTypeOfWork.value);
    });

    watch(
        () => props.showModal,
        (bool) => (isShow.value = bool),
        { immediate: true }
    );

    watch(
        () => props.loading,
        (bool) => (isLoading.value = bool),
        { immediate: true }
    );

    watch(
        () => store.getters['PrimesModule/getAllTypeOfWork'],
        (val) => {
            listTypeOfWork.value = val;
        },
        { immediate: true }
    );

    const handleSelect = async function (event: any, type: string) {
        console.log(event);
        loadingSubsection.value = true;
        paramsSearchPrime.value = {
            ...paramsSearchPrime.value,
            ...event,
        };

        switch (type) {
            case 'work':
                try {
                    listSubsection.value = await store.dispatch(
                        'PrimesModule/getSubsection',
                        event.work
                    );
                } catch (error) {
                } finally {
                    loadingSubsection.value = false;
                }

                break;

            case 'subsection':
                try {
                    listPrime.value = await store.dispatch(
                        'PrimesModule/getListPrime',
                        {
                            ...paramsSearchPrime.value,
                            thePropertyId: routes.params.id,
                        }
                    );
                    console.log(listPrime.value);
                } catch (error) {
                } finally {
                    loadingSubsection.value = false;
                }

                break;
        }
    };

    const handleChangeType = function (event: any) {
        showButton.value = true;
        contentPrime.value = event.target.value;
    };

    const handleCheck = function (value: any) {
        console.log(value, contentPrime.value.complementary.id);
        paramsAdd.value = value.primeCommunal && contentPrime.value.complementary.id
    };

    const handleGetDetailPrime = async function () {
        isLoadingBtn.value = true;
        try {
            await store.dispatch(
                'PrimesModule/getDetailsPrime',
                contentPrime.value &&
                paramsAdd.value
                    ? paramsAdd.value
                    : contentPrime.value.id
            )
            .then(res => {
                store.dispatch('PrimesModule/detailsPrime', res);
            })
            router.push(`/primes/procedures/demandes`);
        } catch (error) {
            notification['error']({
                message : 'Erreur',
                description : "Une erreur s'est produite, veuillez réessayer plus tard"
            })
        } finally {
            isLoadingBtn.value = false;
        }
    };
</script>

<style lang="scss" scoped>
    .wrap-content {
        .custom-loader {
            position: relative;
            background-color: transparent;
        }
    }
    .radio-type {
        margin-top: 15px;
    }
    .button-validation {
        @apply flex justify-end mt-[15px];
    }

    .loading-container{
        @apply w-full flex justify-center items-center;
    }
</style>
