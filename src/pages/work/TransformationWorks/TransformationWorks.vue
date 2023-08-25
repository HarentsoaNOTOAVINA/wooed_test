<template>
    <div class="transformationWorks__container">
        <SideMenu
            :currentItem="current"
            @component="changeComponent"
            class="transformationWorks__sidemenu"
        />
        <keep-alive>
            <component
                :is="activeComp[activeComp.length - 1]"
                @onNext="next"
                @onPrev="prev"
                :isFinished="isFinished"
                @update:showNextButton="changeStateBtnNext"
                class="transformationWorks__section"
            />
        </keep-alive>

        <div class="transformationWorks__btn-foot">
            <Button
                v-if="current !== 0 && !showTerminate"
                class="info__my-btn"
                type="border"
                @click="prev"
            >
                Précedent
            </Button>
            <!-- <Button class="info__my-btn" type="secondary" @click="handleFinish">
                Terminer
            </Button> -->
            <Button
                class="info__my-btn"
                type="secondary"
                @click="next"
                v-if="showNextButton && !showTerminate"
            >
                Suivant
            </Button>

            <Button
                class="info__my-btn"
                type="secondary"
                @click="next"
                v-if="showTerminate"
                ><LoadingButton size="xs" v-if="loadingSave" />
                Enregistrer
            </Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, shallowRef } from 'vue';
    import SideMenu from './components/SideMenu/SideMenu.vue';
    import WorkType from './components/WorkType.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { data } from '@/pages/work/TransformationWorks/components/SideMenu/DataSideMenu';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { notification } from 'ant-design-vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    let activeComp = shallowRef<Array<object>>([WorkType]);
    const isFinished = ref<boolean>(false);
    const showTerminate = ref<boolean>(false);
    const element = ref<Array<any>>([]);

    const current = ref<number>(0);
    const title = ref<string>("Type d'annonce");
    const showNextButton = ref<boolean>(false);
    const loadingSave = ref<boolean>(false);

    let dataToSaveWork = ref<any>({
        idTheProperty: route.params.id,
        idWorkCost: null,
        idTypeOfWork: null,
        idSubSection: null,
        idCategory: null,
        idModel: null,
        idSubModel: null,
        quantity: 1,
        type: 'construction',
        idProvider: null,
        estimation: null,
    });

    function changeComponent(comp: object, label: string) {
        activeComp.value = [comp];
        title.value = label;
    }

    async function next() {
        current.value++;
        showNextButton.value = false;

        if (current.value == 3) {
            showTerminate.value = true;
        }

        if (current.value == 4) {
            let data = store.getters['WorksModule/getDataIdToPost'];

            dataToSaveWork.value.idTypeOfWork = data.idTypeOfWork;
            dataToSaveWork.value.idSubSection = data.idSubSection ?? null;
            dataToSaveWork.value.idCategory = data.idCategory ?? null;
            dataToSaveWork.value.idModel = data.idModel ?? null;
            dataToSaveWork.value.idSubModel = data.idSubModel ?? null;
            dataToSaveWork.value.quantity = data.quantity ?? 1;
            dataToSaveWork.value.idWorkCost = data.idWorkCost ?? null;
            dataToSaveWork.value.idProvider = data.idProvider ?? null;
            dataToSaveWork.value.estimation = data.estimation ?? 0;

            try {
                loadingSave.value = true;
                let response = await store.dispatch(
                    'WorksModule/saveTrans',
                    dataToSaveWork.value
                );
                if (response.data.code == 200 && response.data.success) {
                    notification['success']({
                        message: `Votre travaux a été bien enregistrer`,
                    });

                    router.push({ name: 'work-home' });
                } else {
                    notification['warn']({
                        message: `Une erreur est survenu lors de l'enregistrement de votre travaux`,
                    });
                }
            } catch (error) {
                notification['error']({
                    message: `Impossible d'enregistrer votre travaux, Veuillez ressayer`,
                });
            } finally {
                loadingSave.value = false;
            }
        }
    }

    function prev() {
        if (current.value > 0) {
            current.value--;
            showNextButton.value = true;
        }
    }

    function changeStateBtnNext(vlaue: boolean) {
        showNextButton.value = vlaue;
    }

    function handleFinish() {
        isFinished.value = true;
    }
</script>
<style scoped lang="scss">
    .transformationWorks {
        &__container {
            @apply relative flex flex-col my-[18px] px-[15px] gap-y-[14px];
            @screen md {
                @apply flex-row gap-x-[18px] mb-0;
            }
            @screen lg {
                @apply gap-x-[20px] container;
            }
            @screen xl {
                @apply gap-x-[24px];
            }
            &:deep() {
                .mainCard__items-wrap {
                    min-height: calc(100vh - 255px);
                    @apply pt-[10px] mb-[56px];
                    @screen md {
                        // @apply px-[14px] -mx-[14px] pt-[18px];
                        height: calc(100vh - 218px);
                        @screen md {
                            @apply mb-0;
                        }
                    }
                }
                .ant-steps-small .ant-steps-item-description {
                    @apply mt-[14px];
                }
                .steps__icon {
                    @apply mt-0;
                }
            }
        }
        &__sidemenu {
            @screen md {
                @apply mb-[14px];
                min-height: calc(100vh - 94px);
            }
        }
        &__section {
            @apply px-0 mt-0 w-full max-w-none;
            @screen md {
                max-width: calc(100% - 339px);
            }
        }
        &__btn-foot {
            @apply absolute bottom-[18px] right-[32px] flex gap-[14px];
            @screen md {
                @apply bottom-[32px];
            }
        }
    }
</style>
