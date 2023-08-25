<script lang="ts" setup>
    import {
        inputItem,
        figure3D,
    } from '@/pages/addProduct/components/Photos/data';
    import Input from '@/components/Common/Input/Input.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import UploadWithAudio from '@/components/Display/UploadImage/UploadImageAudio.vue';
    import { reactive, computed, ref, toRaw, watch, onMounted } from 'vue';
    import { useStore, Store } from 'vuex';
    import AudioRecorder from '@/components/Display/AudioRecord/AudioRecord.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
    // import { params } from '@/pages/make-offer/formulaire/dataFormMakeOffer';
    import Title from '@/components/Common/Title/Title.vue';

    const text = reactive({
        publicSale: 'Vente public volontaire',
    });
    const store: Store<any> = useStore();
    const propertyParams = ref<any>({
        linkVideos: '',
        images: [],
    });
    const currentCardUpload = ref<number>();
    const nestedFilesUpload = ref<
        Array<{ urlImg: ''; file: any; soundFile?: Blob }>
    >([]);
    const transactionType = computed(
        () => store.getters['AddProductModule/getTransactionType']
    );
    const isShowModal = ref<boolean>(false);
    const isShowDronVisite = ref<boolean>(false);
    const params = ref<any>({ presentation3dFile: {} });

    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    // watch(
    //     () => store.getters['AddProductModule/getAddPropertyDatas'],
    //     (value) => {
    //         propertyDatas.value = value
    //     },
    //     { immediate: true, deep: true }
    // );

    watch(
        () => params.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
            });
        },
        { immediate: true, deep: true }
    );

    watch(
        () => propertyParams.value,
        (first) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...first },
                step: { media: validation() },
            });
        },
        { immediate: true, deep: true }
    );

    function validation() {
        // return Object.values(value).every(v => v !== '' && v !== 0 && v.length !== 0)
        return propertyParams.value.images.length !== 0;
    }

    function handleChange(value: any) {
        for (let i in value) {
            propertyParams.value[i] = value[i];
        }
    }

    function handleUpload(value: any) {
        // propertyParams.value.images = value;
        propertyParams.value = {
            ...propertyParams.value,
            ...value,
        };
    }

    function handleShowModal() {
        isShowModal.value = !isShowModal.value;
    }

    function handleShowDroneVisite() {
        isShowDronVisite.value = !isShowDronVisite.value;
    }

    function uploadFileWithBase64(result: { urlImg: any; file: File }) {
        nestedFilesUpload.value = [...nestedFilesUpload.value, { ...result }];
        const __entries: any[] = [];
        nestedFilesUpload.value.forEach((entry) => {
            __entries.push({
                file: entry.file,
                soundFile: entry?.soundFile,
            });
        });
        propertyParams.value.images = __entries;
    }

    function saveRecordHandler(record: Blob) {
        nestedFilesUpload.value = [
            ...nestedFilesUpload.value.map((item, index) => {
                if (index === currentCardUpload.value) {
                    return {
                        ...item,
                        soundFile: record,
                    };
                } else return item;
            }),
        ] as any;
        // nestedFilesUpload.value[record.index] = {...nestedFilesUpload.value[record.index], soundFile: record.file}
    }

    function assignCurrentCardUpload(index: number) {
        currentCardUpload.value = index;
    }

    function figure3dHandler(name: string) {
        if (name === 'figure3d') {
            handleShowModal();
        } else {
            console.log('Redirection vers prestataire externe');

            // handleShowDroneVisite();
        }
    }

    function handleChangeFile(value: any) {
        params.value.presentation3dFile = {
            ...params.value.presentation3dFile,
            ...value,
        };

        console.log('zazaza\n', params.value);
    }
</script>

<template>
    <div class="photos__container">
        <div class="photos__content" v-for="item in inputItem" :key="item.id">
            <Title
                type="h2"
                :label="item.title"
                weight="bold"
                class="photos__title-container"
                v-if="item.title"
            />
            <div class="photos__items">
                <Input
                    v-if="item.type === 'input'"
                    :label="item.label"
                    :name-input="item.name"
                    @input="handleChange"
                    :default-value="propertyDatas[item.name]"
                />
                <Input
                    v-if="
                        item.name === 'actionLink' &&
                        transactionType === text.publicSale
                    "
                    :label="item.label"
                    :name-input="item.name"
                    @input="handleChange"
                    :default-value="propertyDatas[item.name]"
                />

                <div class="file__btn" v-if="item.type === 'button'">
                    <Button type-button="border" @click="figure3dHandler(item.name)">{{
                        item.label
                    }}</Button>
                </div>
                <div
                    class=""
                    v-if="item.type === 'file' || item.type === 'images'"
                >
                    <Paragraphe class="photos__title">
                        <span class="photos__required" v-if="item.required"
                            >*</span
                        >
                        {{ item.label }}
                    </Paragraphe>
                    <div class="my-2" v-if="item.subOptions">
                        <Paragraphe
                            v-for="subTitle in item.subtitle"
                            :key="subTitle.id"
                            class="photos__subtitle"
                        >
                            {{ subTitle.text }}
                        </Paragraphe>
                    </div>
                    <!-- <UploadImage :type-image="true" @upload="handleUpload" /> -->
                    <div class="file__upload">
                        <div v-if="item.type === 'images'" class="file__audio">
                            <UploadWithAudio
                                :type-image="
                                    item.type === 'images' ? true : false
                                "
                                :show-preview="false"
                                @uploadFileWithBase64="uploadFileWithBase64"
                                class=""
                            />
                        </div>
                        <UploadImage
                            v-else
                            :name="item.name"
                            @upload-single-with-name="handleUpload"
                        />
                        <!-- :default-file-list="propertyDatas[item.name]" -->
                    </div>
                    <div class="file__preview" v-if="item.type === 'images'">
                        <div
                            v-for="(item, index) in nestedFilesUpload"
                            :key="index"
                        >
                            <AudioRecorder
                                @click="
                                    () => {
                                        assignCurrentCardUpload(index);
                                    }
                                "
                                @on-save-record="saveRecordHandler"
                                :index="index"
                                :file="item"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal
            :is-show-modal="isShowModal"
            @on-back="handleShowModal"
            title="Introduire une figuration 3D du bien"
        >
            <template #content>
                <div class="file__container">
                    <div
                        class=""
                        v-for="(item3d, id3dItem) in figure3D"
                        :key="id3dItem"
                    >
                        <div
                            class="file__link-container"
                            v-if="item3d.type === 'link'"
                        >
                            <Icon icon-name="Link" />
                            <a class="file__link" :href="item3d.link">{{
                                item3d.label
                            }}</a>
                        </div>
                        <div class="" v-else>
                            <Paragraphe class="file__title">{{
                                item3d.label
                            }}</Paragraphe>
                            <div
                                class="file__upload-container"
                                v-for="(itemFile, idItemFile) in item3d.subItem"
                                :key="idItemFile"
                            >
                                <div class="file__upload-item">
                                    <label for="file__label">{{
                                        itemFile.label
                                    }}</label>
                                    <UploadImage
                                        :name="itemFile.name"
                                        @upload-single-with-name="
                                            handleChangeFile
                                        "
                                    />
                                </div>
                            </div>
                            <!-- <Button type-button="border">{{ item3d.label }}</Button> -->
                        </div>
                    </div>
                </div>
            </template>
        </Modal>

        <Modal
            :is-show-modal="isShowDronVisite"
            @on-back="handleShowDroneVisite"
            title="Réserver la visite <Drone>"
        >
            <template #content>
                <div class="photos__visite-drone">
                    <InputDate label="Date de réservation" />
                    <TimePicker label="Heure" />
                    <Button
                        type-button="secondary"
                        @click="handleShowDroneVisite"
                        >Valider</Button
                    >
                </div>
            </template>
        </Modal>
    </div>
</template>

<style scoped lang="scss">
    .photos {
        &__container {
            @apply flex flex-col gap-[18px];
            @screen md {
                @apply gap-[24px];
            }
            .file {
                &__preview {
                    @apply flex flex-wrap justify-center sm:justify-start gap-[10px];

                    &__upload {
                        @apply mb-[20px] w-full align-middle;
                    }
                }
            }
        }
        &__file {
            @apply w-[150px] h-[150px] rounded-md bg-slate-200 flex justify-center items-center;
        }
        &__title {
            @apply font-semibold text-slate-700 mb-[10px];
        }
        &__items {
            @apply relative flex flex-col gap-[18px] py-[8px] ml-[20px] pl-[18px];
            &:before {
                content: '';
                @apply absolute top-0 left-0 w-[1px] h-full bg-gray;
            }
            &:deep() {
                .custom-input__label-icon label {
                    @apply font-[600];
                }
            }
        }
        &__required {
            color: red;
            margin-right: 5px;
        }

        &__visite-drone {
            @apply flex flex-col gap-[10px];

            &:deep() {
                .button__secondary {
                    @apply w-full;
                }
            }
        }

        &__title-container {
            // @apply flex flex-col gap-[20px] my-[10px];
            @apply text-primary font-[600] text-[18px];
        }

        &__divider {
            @apply text-slate-200;
        }

        &__title-item {
            @apply font-semibold text-xl text-center w-full text-slate-500;
        }
        &__content {
            // @apply border border-slate-200 rounded-[8px] px-[20px] pb-[20px] mb-[10px];
            @apply flex flex-col gap-[10px];
        }
    }

    .file {
        &__audio {
            &:deep() {
                .ant-upload-list-picture-card-container {
                    display: none;
                }
            }
        }

        &__btn {
            @apply my-[10px];
        }

        &__link-container {
            @apply flex gap-[10px];
        }

        &__link {
            @apply text-blue-600 cursor-pointer;
        }

        &__container {
            @apply flex flex-col gap-[20px];

            &:deep() {
                .button__border {
                    @apply w-full;
                }
            }
        }

        &__title {
            @apply font-semibold text-slate-400;
        }

        &__upload-container {
            @apply flex gap-[10px] flex-wrap;
        }

        &__label {
            @apply font-semibold;
        }

        &__upload-item {
            @apply flex flex-col gap-[10px];
        }
    }
</style>
