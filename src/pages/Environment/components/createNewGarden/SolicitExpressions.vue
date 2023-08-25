<template>
    <div class="solicitExpresions">
        <Title
            type="h3"
            label="Solliciter des marques d’intérêt"
            class="solicitExpresions__title"
        />
        <hr class="__hr" />
        <!-- <div class="solicitExpresions__map--item">
             <Map idMap="solicit"
                :need-marker-layer="true"
            /> 
        </div> -->
        <TextArea
            label="Message"
            :autoSize="rows"
            placeholder="Ajouter votre message..."
            nameInput="content"
            @handle-change="handleInputMessage"
        />
        <div class="solicitExpresions__form-upload">
            <label>
                <span class="font-[600]"> Image </span>
            </label>
            <UploadImage 
                name="file" 
                :needBase64="false"
                :type-image="true"
                @upload-file-list="handleUpload"    
            />
        </div>
        <div class="flex flex-row justify-end">
            <Button
                class="flex-1"
                :width="'100%'" 
                @click="postSollicitation">
                Solliciter des marques d'intérêt
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Map from '@/components/section/map/index.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import  {useStore} from 'vuex';
    import {computed,onUnmounted,ref} from 'vue';
     import {createFormData} from "@/utils/formdata/formData";
import { notification } from 'ant-design-vue';
    interface payloadI{
        type?: string;
        content ?: string;
        files ?: any;
        latitude ?: number;
        longitude ?: number;
        step ?: number;
    }
    const store = useStore();
    const marker : any = computed(()=>store.getters["CollectiveGardenModule/getLocation"])
    const rows = { minRows: 6, maxRows: 10 };
    let payload : payloadI = { step : -1};
    function handleInputMessage($event  : any){
        payload = Object.assign(payload, $event);
    }
    function handleUpload($event : any){
        payload = Object.assign(payload, {files : $event});
    }
    function callback(){
        notification.success({message : "Votre sollicitation a bien été publié"})        
    }
    
    // onUnmounted(()=>{
    //     postSollicitation();
    // })

    function postSollicitation(){
        
        payload = Object.assign(payload,{
            latitude : marker.value.lat,
            longitude : marker.value.lng,
            type : "Solicitation"
        })
        const formData  = createFormData(payload);
        if(payload.latitude  && payload.longitude  && payload.content){
            store.dispatch('CollectiveGardenModule/postSollicitation', {data : formData, callback})
        }
    }

</script>

<style lang="scss" scoped>
    .solicitExpresions {
        @apply flex flex-col gap-[24px];
        &__title {
            @media (max-width: 575px) {
                @apply hidden;
            }
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
        &__map {
            &--item {
                max-height: 179px;
                @apply h-[179px] w-full;
                @screen sm {
                    max-height: 300px;
                    @apply h-[300px];
                }
                @screen md {
                    max-height: calc(100vh - 275px);
                    @apply h-[325px];
                }
            }
        }
        &__form-upload {
            @apply flex flex-col gap-[10px];
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
