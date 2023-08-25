<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import Upload from '@/components/Display/UploadImage/UploadImageAudio.vue';
import AudioRecorder from "@/components/Display/AudioRecord/AudioRecord.vue";
import { ref, watch } from "vue";


const info = {
    info1 : "La taille maximale par image est 5MB",
    info2 : "Formats acceptés : JPG/JPEG/PNG"
}


const emit = defineEmits(['getData']);
const props = defineProps({
    idActive : {
        type : Number,
        required : true
    }
})
const nestedFilesUpload =
        ref<Array<{ urlImg: ''; file: any; soundFile?: Blob }>>([]);
const currentCardUpload = ref<number>()
const propertyParams = ref<any>({
    linkVideos: '',
    images: [],
});



watch(() => nestedFilesUpload.value, (value) => {

}, {immediate : true, deep : true})

watch(() => propertyParams.value.images, (value) => {
    console.error(value);
    emit('getData', {files : value});
}, {immediate : true, deep : true});

function uploadFileWithBase64(result: { urlImg: any; file:  File }){
    nestedFilesUpload.value = [...nestedFilesUpload.value, {...result}]
        console.log( "", nestedFilesUpload.value);
        const __entries : any[] = []
        nestedFilesUpload.value.forEach(entry =>{   
            __entries.push({
                file : entry.file,
                soundFile : entry?.soundFile
            });
            // console.log("DBG __entries", __entries);
        })
        propertyParams.value.images = __entries;
        
        console.log('nestedUpload\n', nestedFilesUpload.value);
}

function saveRecordHandler(record: Blob){
    console.log(currentCardUpload.value, 'currentCardUpload.value');
    nestedFilesUpload.value = [...nestedFilesUpload.value.map((item,index) => {
        if (index === currentCardUpload.value) {
            return {
                ...item,
                soundFile: record
            }
        } else return item
    })] as any
    // nestedFilesUpload.value[record.index] = {...nestedFilesUpload.value[record.index], soundFile: record.file}

    console.log(nestedFilesUpload.value, 'nestedFilesUpload');
}

function assignCurrentCardUpload(index: number ) {
    currentCardUpload.value = index
}

function handleUpload(){

}

</script>

<template>
    <div class="photos photos__container">
        <div class="photos__header">
            <P>Photos</P>
            <hr class="photos__divider">
        </div>

        <div class="photos__content">
            <div class="">
                <P class="photos__label"><span class="photos__required">*</span> Image :</P>
                <div class="">
                    <P class="photos__subtitle">{{info.info1}}</P>
                    <P class="photos__subtitle">{{info.info2}}</P>
                </div>
            </div>
            <div class="file__upload">
                <Upload
                    :type-image="true"
                    name="image"
                    :show-preview="false"
                    @upload="handleUpload"
                    @uploadFileWithBase64="uploadFileWithBase64"
                />
            </div>

            <div class="file__preview" >
                <div v-for="(item, index) in nestedFilesUpload" :key="index">
                    <AudioRecorder @click="() => {assignCurrentCardUpload(index)}" @on-save-record="saveRecordHandler" :index="index" :file="item"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.photos{
    &__container{
        @apply flex flex-col gap-[30px];
        .file {
            &__preview {
                @apply flex flex-wrap justify-center sm:justify-start gap-[10px];
            }
            &__upload {
                @apply mb-[20px] w-full align-middle;
            }
        }
    }

    &__content{
        @apply flex flex-col gap-[10px];
    }

    &__header{
        @apply flex flex-col gap-[10px];
    }

    &__label{
        @apply font-semibold;
    }

    &__divider{
        @apply text-slate-300;
    }
    &:deep(){
        .custom-input__fields{
            @apply mb-0;
        }
    }

    &:deep() {
        .ant-upload-list-picture-card-container {
            display: none;
        }
    }

    &__required{
        @apply text-red;
    }

    &__subtitle{
        @apply italic text-[12px]
    }
}
</style>