<template>
    <div class="documentEmergency__document">
        <div class="documentEmergency__document-nav">
            <ArrowBack @click="$emit('prev')" />
            <Paragraphe>Document</Paragraphe>
        </div>
        <hr class="separator" />
        <div class="documents__title">Documents de la facture</div>

        <div class="documents__reporting">
            <Paragraphe class="documents__titleUpload"
                >Facture de réparation</Paragraphe
            >
            <UploadImage @uploadFileList="handleUploadInvoice" />
        </div>

        <div class="documents__cost-btn-validation">
            <Button
                type-button="gray"
                @on-click="$emit('prev')"
                v-if="!loadingBtn"
                >Précédent
            </Button>
            <Button type-button="secondary" @on-click="addDocSaveWork"
                ><LoadingButton size="xs" v-if="loadingBtn" />Enregistrer
            </Button>
        </div>

        <!-- <div class="documents__button">
            <Button type-button="secondary" @on-click="addDocSaveWork"
                ><LoadingButton size="xs" v-if="loadingBtn" />
                Enregistrer</Button
            >
        </div>
        -->
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import router from '@/routes';
    import { notification } from 'ant-design-vue';
    import { onMounted, ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';

    const route = useRoute();
    const store = useStore();

    let loadingBtn = ref<boolean>(false);

    let document = ref<Array<any>>([
        {
            category: 'Facture de la réparation',
            files: [],
        },
    ]);

    let dataToSaveWorkBoiler = ref<any>({
        idTheProperty: route.params.id,
        idExpert: [],
        idWorkCost: null,
        estimatedCost: null,
        limitDate: null,
    });

    onMounted(() => {
        getDataStoreToSaveBoiler();
    });

    function getDataStoreToSaveBoiler() {
        const dataFromStore = computed(
            () => store.getters['WorksModule/getDataSaveBoiler']
        );

        let data = computed(() => store.getters['WorksModule/getDataIdToPost']);
        dataToSaveWorkBoiler.value.idSubSection = data.value.idSubSection;
        dataToSaveWorkBoiler.value.idCategory = data.value.idCategory;

        dataToSaveWorkBoiler.value = {
            ...dataToSaveWorkBoiler.value,
            ...dataFromStore.value,
        };

        dataToSaveWorkBoiler.value.idExpert = Object.values(
            dataFromStore.value.idExpert
        );

        console.log(dataToSaveWorkBoiler.value, 'DATA TO SAVE THIS');
    }

    function handleUploadInvoice(files: any) {
        document.value[0].files = files;

        dataToSaveWorkBoiler.value = {
            ...dataToSaveWorkBoiler.value,
            ...{ document: document.value },
        };
    }

    async function addDocSaveWork() {
        try {
            loadingBtn.value = true;
            let resultaNext = await store.dispatch(
                'WorksModule/saveBoilerWork',
                dataToSaveWorkBoiler.value
            );

            if (resultaNext.data.code == 200 && resultaNext.data.success) {
                notification['success']({
                    message: 'Ajout travaux',
                    description:
                        'Travaux de réparation enregistrer avec success',
                });

                router.push({ name: 'work-boiler' });
            }
        } catch (error) {
        } finally {
            loadingBtn.value = false;
        }
    }
</script>

<style scoped lang="scss">
    .documentEmergency {
        &__document {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__document-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }
    }

    .documents {
        &__title {
            @apply font-bold mb-[12px];
        }
        &__reporting {
            @apply mb-[12px];
        }
        &__form-upload {
            &:deep() {
                .ant-upload.ant-upload-drag {
                    @apply w-[140px] py-[20px] px-[15px] rounded-[8px];
                }
            }
        }

        &__cost-btn-validation {
            @apply flex justify-end gap-[5px];
        }

        &__button {
            @apply fixed bottom-[10px] w-[90%];

            @screen md {
                @apply right-[10%] w-auto;
            }

            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
    }

    .btn-upload-mob {
        @apply flex items-center gap-[5px] px-[12px] py-[20px] rounded-[4px];
    }

    .separator {
        @apply my-[15px];
    }
</style>
