<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <div class="photos__container">
            <div
                v-for="(item, index) in data"
                :key="index"
                class="photos__content"
            >
                <template v-if="item.type === 'image'">
                    <Title
                        type="h2"
                        label="Photos"
                        weight="bold"
                        class="photos__title-container"
                        ref="scrollSection"
                    />
                    <div class="photos__items">
                        <div class="file__upload">
                            <Paragraphe class="photos__title">
                                <span
                                    class="photos__required"
                                    v-if="item.required"
                                    >*</span
                                >
                                {{ item.label }}
                            </Paragraphe>
                            <UploadWithAudio
                                :type-image="
                                    item.type === 'image' ? true : false
                                "
                                :show-preview="false"
                                @uploadFileWithBase64="uploadFileWithBase64"
                            />
                            <small v-if="hasError" class="text-[#fa8072]">
                                Image obligatoire
                            </small>
                        </div>
                        <div
                            class="file__preview"
                            v-if="
                                item.type === 'image' &&
                                nestedFilesUpload.length
                            "
                        >
                            <div
                                v-for="(item, key) in nestedFilesUpload"
                                :key="key"
                            >
                                <transition name="fade-opacity" mode="in-out">
                                    <AudioRecorder
                                        @click="
                                            () => {
                                                assignCurrentCardUpload(key);
                                            }
                                        "
                                        @on-save-record="saveRecordHandler"
                                        @on-delete-record="deleteRecordHandler"
                                        @on-delete="deleteFileHandler"
                                        :index="key"
                                        :file="item"
                                    />
                                </transition>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="item.type === 'text'">
                    <Title
                        type="h2"
                        label="Vidéos"
                        weight="bold"
                        class="photos__title-container"
                    />
                    <div class="photos__items">
                        <Input
                            :label="item.label"
                            :name-input="item.name"
                            :has-error="{
                                status: !isLinkVideo ? true : false,
                                errorMsg: 'Lien non valide',
                            }"
                            :vmodel="params[item.name]"
                            @input="handleChange"
                        />
                    </div>
                </template>
                <template v-if="item.type === 'button'">
                    <Title
                        type="h2"
                        label="Figuration 3D"
                        weight="bold"
                        class="photos__title-container"
                    />
                    <div class="photos__items">
                        <Paragraphe class="photos__title">
                            <span class="photos__required" v-if="item.required"
                                >*</span
                            >
                            {{ item.label }}
                        </Paragraphe>
                        <Button
                            type-button="border"
                            @click="figure3dHandler(item.name)"
                            >{{ item.label }}</Button
                        >
                    </div>
                </template>
                <template v-if="item.type === 'file'">
                    <Title
                        type="h2"
                        label="Plan"
                        weight="bold"
                        class="photos__title-container"
                    />
                    <div class="photos__items">
                        <Paragraphe class="photos__title">
                            <span class="photos__required" v-if="item.required"
                                >*</span
                            >
                            {{ item.label }}
                        </Paragraphe>
                        <UploadImage
                            :name="item.name"
                            @uploadUpdate="
                                handleChange($event, item.label, item.name)
                            "
                            :max-count="1"
                            :default-file-list="documentLists(item.label)"
                        />
                    </div>
                </template>
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
                                    v-for="(
                                        itemFile, idItemFile
                                    ) in item3d.subItem"
                                    :key="idItemFile"
                                >
                                    <div class="file__upload-item">
                                        <label for="file__label">{{
                                            itemFile.label
                                        }}</label>
                                        <UploadImage
                                            :name="itemFile.name"
                                            @upload-single-with-name="
                                                handleUpload3D
                                            "
                                            :max-count="1"
                                            :default-file-list="defaultFile[itemFile.name]"
                                        />
                                    </div>
                                </div>
                                <!-- <Button type-button="border">{{ item3d.label }}</Button> -->
                            </div>
                        </div>
                    </div>
                </template>
            </Modal>
        </div>
    </AddContainer>
</template>

<script lang="ts" setup>
    import { ref, onMounted, watch } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import UploadWithAudio from '@/components/Display/UploadImage/UploadImageAudio.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import AudioRecorder from '@/components/Display/AudioRecord/AudioRecord.vue';
    import { useStore } from 'vuex';
    import { requiredControl } from '@/utils/validation/form_validation';
    import { formatDocument, valueParams, documentLists } from '../utils/default-value';

    const store = useStore();

    const props = defineProps({
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
        },
        data: {
            type: Array as any,
        },
    });
    const error = ref<any>({});
    const hasError = ref<boolean>(false);
    const data = ref<any>(props.data);
    const isShowDronVisite = ref<boolean>(false);
    const isShowModal = ref<boolean>(false);
    const isLinkVideo = ref<boolean>(true);
    const scrollSection = ref<any>()
    const nestedFilesUpload = ref<
        Array<{ urlImg: ''; file: any; soundFile?: Blob }>
    >([]);
    const currentCardUpload = ref<number>();
    const params = ref<any>({
        linkVideos: '',
        images: [],
        figure3D: [],
    });
    const paramsDoc = ref<any>({});
    const defaultFile = valueParams(data.value); // Obtenez la valeur du getter
    let allDocument = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']['documents']
    );

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    onMounted(() => {
        params.value = valueParams(data.value);
        if (valueParams(data.value).images) {
            nestedFilesUpload.value = valueParams(data.value).images;
        }
    });

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        () => {
            params.value = valueParams(data.value);
        },
        { immediate: true }
    );

    watch(
        () => nestedFilesUpload.value,
        (v) => {
            nestedFilesUpload.value = v;
        },
        { immediate: true }
    );

    const figure3D = [
        {
            label: 'Introduire la présentation 3D (appli Apple)',
            name: '3Dpresentation',
            type: '',
            subItem: [
                {
                    label: 'Lidard',
                    name: 'lidardFile',
                    type: 'file',
                },
                {
                    label: 'Materporte',
                    name: 'materporte',
                    type: 'file',
                },
                {
                    label: 'Autres',
                    name: 'otherFile',
                    type: 'file',
                },
            ],
        },
        {
            label: 'Etablir la figuration 3D via l’outil de mesure',
            name: 'mesuringTools',
            type: 'link',
            link: '',
        },
        {
            label: 'Demander à l’appli de procéder automatiquement à la figuration 3D',
            name: 'perform3DAutomaticly',
            type: 'link',
            link: '',
        },
    ];

    function hasURL(input: string) {
        var regex = /(https?:\/\/[^\s]+)/;
        return regex.test(input);
    }

    function handleChange(value: any, label?: string, name?: string) {
        if (params.value.linkVideos && params.value.linkVideos.length) {
            isLinkVideo.value = hasURL(value.linkVideos);

            if (isLinkVideo.value)
                params.value = {
                    ...params.value,
                    ...value,
                };
        } else {
            params.value = {
                ...params.value,
                ...value,
            };
        }

        paramsDoc.value = formatDocument(params.value, label, name);
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        console.log(params.value, 'PARAMS PHOTO');

        error.value = requiredControl(data.value, params.value);

        if (Object.values(error.value).every((v: any) => v.length > 0)) {
            hasError.value = false;
            if (paramsDoc.value && paramsDoc.value.length) {
                store.dispatch('AddProductModule/setPropertyData', {
                    data: {
                        ...params.value,
                        // documents: [...params.value.documents, ...paramsDoc.value],
                        documents: [...allDocument.value, ...paramsDoc.value],
                    },
                });
            } else {
                store.dispatch('AddProductModule/setPropertyData', {
                    data: {
                        ...params.value,
                    },
                });
            }
            // store.dispatch('AddProductModule/setPropertyData', {
            //     data: {
            //         ...params.value.content,
            //         documents: [...params.value.documents, ...paramsDoc.value],
            //     },
            // });
            emit('onClickNext');
        } else {
            hasError.value = true;
            scrollSection.value.$el.scrollIntoView()
        }
    }

    function figure3dHandler(name: string) {
        handleShowModal();
    }

    function handleUpload3D(value: any) {
        params.value.figure3D = [
            ...params.value.figure3D,
            {
                name: Object.keys(value)[0],
                file: Object.values(value)[0],
            },
        ];
    }

    function uploadFileWithBase64(result: { urlImg: any; file: File }) {
        nestedFilesUpload.value = [...nestedFilesUpload.value, { ...result }];
        nestedFilesUploaded(nestedFilesUpload.value);
    }

    function handleShowModal() {
        isShowModal.value = !isShowModal.value;
    }

    function assignCurrentCardUpload(index: number) {
        currentCardUpload.value = index;
    }

    function saveRecordHandler(record: Blob) {
        recordHandler(record);
    }

    function deleteRecordHandler(record: Blob) {
        recordHandler(record);
    }

    function deleteFileHandler(index: any) {
        nestedFilesUpload.value.splice(index, 1);
        nestedFilesUploaded(nestedFilesUpload.value);
    }

    function recordHandler(record: Blob) {
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
        nestedFilesUploaded(nestedFilesUpload.value);
    }

    function nestedFilesUploaded(nestedFilesUpload: any) {
        const __entries: any[] = [];
        nestedFilesUpload.forEach((entry: any) => {
            __entries.push({
                file: entry.file,
                urlImg: entry.urlImg,
                soundFile: entry?.soundFile,
            });
        });
        params.value.images = __entries;
    }
</script>

<style lang="scss" scoped>
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
        &__upload {
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
    .fade-opacity-enter-active,
    .fade-opacity-leave-active {
        @apply transition-all;
    }

    .fade-opacity-enter-from,
    .fade-opacity-leave-to {
        @apply opacity-0 translate-x-[100px] transition-all;
    }
</style>
