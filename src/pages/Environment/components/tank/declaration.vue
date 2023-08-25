<template>
    <Layout
        :title="'Formulaire de déclaration'"
        :buttons="[
            {
                label : 'Valider et Envoyer la demande',
                handler : PostPermitData
            }
        ]"
    >
        <template #body>
            <Loader v-if="!showPdf"/>
            <div v-else class="declaration">

                <!-- <PdfViewer
                class="bordered"
                :pdf-url="tankData"
                @save="handleSavePdf"
                @upload="handleUpload"
                /> -->
                <PdfViewer
                class="bordered"
                :pdf-url="tankData"
                @upload="handleUpload"
                />
                <div v-if='showAnnexe' class="declaration-annexes">
                    <Paragraphe>

                    </Paragraphe>
                    <div
                        v-for="(field, key) in annexeField"
                        :key="key"
                        class="annexe-item"
                    >
                        <Paragraphe class="annexe-item-title">
                            {{field.label}}
                        </Paragraphe>
                        <div class="annexe-item-form">
                            <Upload
                                :name="field.code"
                                @upload-single-with-name="handleUpload"
                            />
                            <div 
                                v-if="field.type === 'photo'"
                                class="annexe-item-photo"
                                @click="displayCam"
                            >
                                <CameraIcon
                                    size="sm"
                                />
                            </div>
                        </div>
                    </div>
                     
                </div>
                <Modal 
                    :visible="showModal" 
                    :body-style="{padding : '0px'}"
                    :closable="true"
                    @cancel="closeModal"
                >
                    <div>
                        <video id="video" class="video" autoplay/>
                        <canvas id="canvas"/>
                    </div>
                    <template #footer>
                        <div class="modal-action">
                            <Button
                                :style="{borderRadius : '50%'}" 
                                @click="capture"
                            >
                                <CameraIcon
                                    size="sm"
                                />
                            </Button>
                        </div>
                    </template>
                    <template #closeIcon>
                        <div class="modal-action-close" @click="closeModal">
                            X
                        </div>
                    </template>
                </Modal>
            </div>
            
        </template>
        
    </Layout>
</template>

<script setup lang="ts">
import {ref,reactive,onMounted, computed, watch, onUnmounted, onBeforeUnmount} from  'vue';
import { useStore } from 'vuex';
import CameraIcon from "@/components/Icon/CameraDevice.vue";
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import  Layout from "../layout.vue";
import Button from '@/components/Common/Button/Button.vue';
import {Modal} from 'ant-design-vue';
import Upload from '@/components/Display/UploadImage/UploadImage.vue';
import Loader from "@/components/Common/Loader/Loader.vue";
import PdfViewer from "@/components/Display/pdfViewer/pdfViewerContainer.vue";
import {annexeDataType,payloadType} from "./data";
import { notification } from 'ant-design-vue';
import { createFormData } from '@/utils/formdata/formData';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const store = useStore();
const tankData = ref<string>("");
const showPdf = ref<boolean>(false);
const annexeField = ref<annexeDataType[]>([]);
const showAnnexe = ref<boolean>(false);
const showModal = ref<boolean>(false);
const modalTitle = ref<string>("Prendre des photos");
const payload = reactive<payloadType>({
    theProperty : (route.params.id as string),
    file : null,
    annexPermitProperty : []
});
//+++++++CAMERA PROPERTY+++++
const region = computed(()=> store.getters["EnvironmentModule/getRegion"])
const camData = reactive<{
    video : any;
    stream : MediaStream | undefined;  
    oldstream : MediaStream | undefined;  
    track : MediaStreamTrack | undefined;
    canvas : any;
}>({
    video : undefined ,
    stream : undefined,
    oldstream : undefined,
    track : undefined,
    canvas : undefined
})
//++++++++++
onMounted(async () => {
    if(region.value.toLowerCase() === 'flandres'){
        router.push("https://authenticatie.vlaanderen.be/stb/html/ssologin")
    }else{

        tankData.value = await store.dispatch("EnvironmentModule/getPermitForm");
        
        if(!!tankData.value){
            tankData.value = `${window.location.origin}${tankData.value}`;
            showPdf.value = true;
        }
        if(showPdf.value){
            // displayCam();
            loadAnnexeDatas("1B");
        }
    }
})

async function loadAnnexeDatas(category : string){
    if(category === "1B" || category === "2"){
        annexeField.value = (await import("./data")).ANNEXE_FIELDS_C2_1B
    }else if(category === "3"){
        annexeField.value = (await import("./data")).ANNEXE_FIELDS_C3
    }
    if(annexeField.value.length > 0){
        showAnnexe.value = true;
    }
}

async function displayCam(){
    showModal.value = true;
    setTimeout(async ()=>{
        camData.canvas = document.querySelector('#canvas');
    camData.video = document.querySelector('#video');
    camData.stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
    camData.oldstream = camData.stream;
    camData.video.srcObject = camData.stream;
    camData.track = camData.stream.getAudioTracks()[0];
    },100);
    
}
async function capture(){
    camData.canvas
                .getContext('2d')
                .drawImage(camData.video, 0, 0, camData.canvas.width, camData.canvas.height);
    const img = camData.canvas.toDataURL('image/jpeg');
            // connst blob = this.dataURItoBlob(this.img);
    
    payload.annexPermitProperty?.push({
        file : base64ToFile(img),
        label : "A125_ILLU_Photo"
    })
}
function goBack(){
    router.back();
}

function handleUpload($event : any){
    payload.annexPermitProperty?.push({
        label : Object.keys($event)[0],
        file : Object.values($event)[0],
    });
}

async function closeModal(){
    await camData.stream?.getTracks().forEach(async (track : MediaStreamTrack) =>{
        await track.stop();
    }); 
    showModal.value = false;
}

function callback(){
        notification.success({message : "Les documents ont bien été enregistrer"})        
        router.push({name : "environment-detail"});
    }

function PostPermitData(){
    const result = createFormData(payload);
    store.dispatch("EnvironmentModule/postPermitData", {payload : result, callback});
}

function handleSavePdf($event : any){
    payload.file = $event;
}

function base64ToBlob(base64 : string){
    const _ = base64.split('base64,')[1];
    const bytes = atob(_);
    let byteArray : any = new Array(bytes.length);

    for ( let i= 0; i < bytes.length; i++){
        byteArray[i] = bytes.charCodeAt(i);
    }
    byteArray = new Uint8Array(byteArray);
    return new Blob([byteArray], { type : "image/jpeg" })
}
function BlobToFile(blob : any, filename : string="File"){
    return new File([blob as any],
        filename, 
        {
            lastModified : new Date().getTime(),
            type :  blob.type,
            
        }
);
}
function base64ToFile(base64 : string){
    const blob = base64ToBlob(base64);
    return BlobToFile(blob);
}

async function handlePost(){

}
</script>

<style lang="scss" scoped>

#canvas{
    display : none;
}

.declaration{
    //overflow-x : hidden;
    :deep(){
        .ant-modal-body{
            background-color: white;
        }
    }
    &-annexes{
        
        @apply w-full flex flex-col my-2;
        @screen md{
            @apply mx-10;
        }
        .annexe{
            &-item{
                &-title{
                    @apply py-3;
                    color : var(--color-gray-icon);
                }
                &-form{
                    @apply w-full flex flex-row gap-5 justify-start;
                    color : var(--color-gray-icon);
                }
                &-photo{
                    @apply w-full w-[100px] h-[100px]  grid content-center justify-center;
                    border : 1px dashed var(--color-gray-icon);

                    background-color: #fafafa;
                    border-radius : 8px;
                    @screen md{
                        display : none;
                    }
                }
            }
            &-modal{
                @apply w-full ;
                
            }
        }
    }
}
.modal{
    &-action{
        @apply w-full grid place-content-center;
        &-close{
            background-color: white;
            border-radius : 50%;
        }
        &-capture{
            border-radius : 50%;
        }
    }

}
</style>