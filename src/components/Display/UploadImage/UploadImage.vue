<template>
    <a-upload
        list-type="picture-card"
        :accept="
            props.typeImage
                ? '.png, .jpg, .jpeg image/* '
                : '.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        "
        @preview="handlePreview"
        :before-upload="beforeUpload"
        :needBase64="props.needBase64"
        :disabled="disabled"
        @change="handleChange"
        @remove="handleRemove"
        @click.prevent
        v-bind="{ capture: false }"
        :class="customButtonUpload ? 'customButtonUpload' : ''"
        v-model:file-list="defaultFileList"
        :max-count="props.maxCount"
    >
        <div>
            <plus-outlined />
            <div
                style="margin-top: 8px"
                v-if="props.typeImage && !customButtonUpload"
            >
                Ajouter des Images
            </div>
            <template v-else-if="customButtonUpload">
                <slot name="customUpload" />
            </template>
            <div style="margin-top: 8px" v-else>Ajouter fichier</div>
        </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
</template>

<script setup lang="ts">
    import { PlusOutlined } from '@ant-design/icons-vue';
    import {
        Upload as AUpload,
        Modal as AModal,
        UploadDragger as AUploadDragger,
    } from 'ant-design-vue';

    import { ref, computed, onMounted, watch } from 'vue';

    const capture = ref<string>('camera');

    const display = computed(() =>
        props.showPreview ? 'inline-block' : 'none'
    );
    const previewVisible = ref(false);
    const previewImage = ref('');
    const fList = ref<any>([]);
    const fListBase64 = ref<string[]>([]);
    const validateTypeFile = ref<string[]>([
        '.pdf',
        '.docx',
        '.doc',
        '.xml',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
    ]);

    const validateTypeImage = ref<string[]>([
        '.png',
        '.jpg',
        '.jpeg',
        'image/*',
    ]);
    // const accept = ref<string>("*");

    const emit = defineEmits<{
        (e: 'upload', payload: any): void;
        (e: 'file', payload: any): void;
        (e: 'handlePdfFileUpload', payload: any): void;
        (e: 'handleRemove', payload: any): void;
        (e: 'uploadSingle', payload: any): void;
        (e: 'uploadSingleWithName', payload: any): void;
        (e: 'uploadWithName', payload: any): void;
        (e: 'uploadFileList', payload: any): void;
        (e: 'uploadFileListWithName', payload: any): void;
        (e: 'uploadUpdate', payload: any): void;
    }>();

    const props = defineProps({
        needBase64: {
            type: Boolean,
            default: false,
        },
        typeImage: {
            type: Boolean,
            default: false,
        },
        showPreview: {
            type: Boolean,
            default: true,
        },
        name: {
            type: String,
            default: 'file',
        },
        customButtonUpload: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        defaultFileList: {
            type: Array,
            default: null,
        },
        maxCount: {
            type: Number,
            default: null,
        },
    });

    const defaultFileList = ref<any[]>([]);

    onMounted(() => {
        let inputFile = document.querySelector(
            ".ant-upload input[type='file']"
        );

        (inputFile as any).removeAttribute('capture');
        if (props.defaultFileList) {
            defaultFileList.value = Array.isArray(props.defaultFileList)
                ? props.defaultFileList
                : [props.defaultFileList];
        }
    });

    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleCancel = () => {
        previewVisible.value = false;
    };

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = (await getBase64(file.originFileObj)) as string;
        }

        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
    };

    const beforeUpload = (file: any) => {
        // this.fList = [...this.fList, file];
        fList.value.push(file as never);
        // console.log('file', file);

        // if (props.needBase64) {
        //     emit('upload', base64FileList());
        // }else{
        //     emit('handleUplad', fList);
        // }
        return false;
    };
    const handleChange = async (info: any) => {
        let inputFile = document.querySelector(
            ".ant-upload input[type='file']"
        );

        (inputFile as any).removeAttribute('capture');

        fList.value = [...(info.fileList as never)];

        console.error(fList.value);

        const validFileType = props.typeImage
            ? validateTypeImage.value
            : validateTypeFile.value;

        console.log('info : ', info.file);
        if (
            validFileType.includes(info.file.type) ||
            (props.typeImage && validateImage(validFileType, info.file.type))
        ) {
            console.log('type\n', info.file.type);
            emit('uploadSingle', info.file);
            if (props.needBase64) {
                console.log('>>>>BBG base 64 here', info.file);
                const x: any = await getBase64(info.file);
                fListBase64.value.push(x);
                emit('upload', {
                    base64: fListBase64.value,
                    fileList: info.fileList,
                });
            } else {
                emit('upload', info.fileList);
            }
            emit('uploadSingleWithName', {
                [props.name]: info.file,
            });
            emit('uploadWithName', {
                [props.name]: info.fileList,
            });
            emit('uploadFileListWithName', {
                [props.name]: extractFile(info.fileList),
            });
            emit('uploadFileList', extractFile(info.fileList));
        }
        emit('uploadUpdate', {
                [props.name]: info.file,
            });
    };
    const base64FileList = async () => {
        let base64Images: [] = [];
        await fList.value.forEach(async (img: any) => {
            const _ = await getBase64(img.originFileObj);
            base64Images.push(_ as never);
        });
        return base64Images;
    };

    const handleRemove = (file: any) => {
        const index = fList.value.indexOf(file as never);
        const newFileList = fList.value.slice();

        newFileList.splice(index, 1);
        fList.value = newFileList;

        if (props.needBase64) {
            emit('upload', base64FileList());
        } else {
            emit('handleRemove', file);
        }
    };

    function extractFile(data: Array<any>): Array<any> {
        let newArray: Array<any> = [];
        data.forEach((item) => {
            newArray = [...newArray, item.originFileObj];
        });
        return newArray;
    }

    function validateImage(allType: Array<any>, toSeach: string): Boolean {
        let response: Boolean = false;
        allType.forEach((item: any) => {
            let newItem: string = item.split('/')[0];
            if (!response && newItem === toSeach.split('/')[0]) {
                response = true;
            } else if (response) {
                return response;
            }
        });
        return response;
    }
</script>

<style lang="scss" scoped>
    :deep() {
        .ant-upload.ant-upload-select-picture-card {
            border-radius: 10px;
        }
        .ant-upload-list-picture-card-container {
            display: v-bind(display);
        }
        .ant-upload {
            position: relative;
            overflow: hidden;
            input {
                height: 100%;
            }
        }
    }
    .customButtonUpload {
        &:deep() {
            .ant-upload-select {
                @apply border-transparent w-auto h-auto p-0;
            }
            .anticon {
                @apply hidden;
            }
        }
    }
</style>
