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
        @change="handleChange"
        @click.prevent
        @remove="handleRemove"
    >
        <template #itemRender v-if="!props.showPreview">
            <div class="upload__content">
                <!-- <AudioRecorder />    -->
            </div>
        </template>

        <div>
            <plus-outlined />

            <div style="margin-top: 8px" v-if="props.typeImage">
                Ajouter des Images
            </div>
            <div style="margin-top: 8px" v-else>Ajouter du fichier</div>
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
    import type { UploadProps } from 'ant-design-vue';
    import AudioRecorder from '@/components/Display/AudioRecord/AudioRecord.vue';

    import { ref, onMounted } from 'vue';
    import { any, validateType } from 'vue-types';
    import { getKeyThenIncreaseKey } from 'ant-design-vue/lib/message';

    onMounted(() => {
        let inputFile = document.querySelector(
            ".ant-upload input[type='file']"
        );

        (inputFile as any).removeAttribute('capture');
    });

    const previewVisible = ref(false);
    const capture = ref<string>('');
    const previewImage = ref('');
    const fList = ref([]);
    // const accept = ref<string>("*");
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

    const emit = defineEmits<{
        (e: 'upload', payload: any): void;
        (e: 'file', payload: any): void;
        (e: 'handlePdfFileUpload', payload: any): void;
        (e: 'handleRemove', payload: any): void;
        (e: 'uploadSingle', payload: any): void;
        (e: 'uploadFileWithBase64', payload: any): void;
        (e: 'uploadSingleWithName', payload: any): void;
        (e: 'uploadWithName', payload: any): void;
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

        console.log(file, 'fillleeeee');

        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
    };

    const beforeUpload = (file: any) => {
        // this.fList = [...this.fList, file];
        fList.value.push(file as never);
        console.log('file', file);

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
        // let validFileType;
        // if(props.typeImage){
        //     validFileType = [
        //         'image/jpeg',
        //         'image/png',
        //     ];
        // }else{
        //     validFileType = [
        //         'application/pdf',
        //         '.pdf',
        //     ]
        // }

        // const validFileType = [
        //     'application/pdf',
        //     '.pdf',
        //     'image/jpeg',
        //     'image/png',
        //     '*'
        // ];
        const validFileType = props.typeImage
            ? validateTypeImage.value
            : validateTypeFile.value;

        // console.log("info : ",info.fileList.map(async (item: any) => ({file: item.originFileObj, urlImg: await getBase64(item.originFileObj)})))
        const obj: { file?: any; urlImg?: any } = {};
        for (let index = 0; index < info.fileList.length; index++) {
            const item = info.fileList[index];
            obj.file = item.originFileObj;
            obj.urlImg = await getBase64(item.originFileObj);
        }
        console.log(obj, 'obj');
        if (
            validFileType.includes(info.file.type) ||
            (props.typeImage && validateImage(validFileType, info.file.type))
        ) {
            console.log('type\n', info.file.type);
            emit('uploadSingle', info.file);
            emit('upload', info.fileList);
            emit('uploadFileWithBase64', obj),
                emit('uploadSingleWithName', {
                    [props.name]: info.file,
                });
            emit('uploadWithName', {
                [props.name]: info.fileList,
            });
        }
    };
    const base64FileList = () => {
        let base64Images: [] = [];
        fList.value.forEach(async (img) => {
            const _ = await getBase64(img);
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

<style scoped lang="scss">
    .upload {
        &__content {
            display: none !important;
        }
        &__container {
            @apply flex gap-[20px];
        }
    }

    .ant-upload-list {
        &:deep() {
            @apply flex gap-[20px];
        }
    }
</style>
