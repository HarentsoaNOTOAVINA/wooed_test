
<script lang="ts" setup>
import Input from "@/components/Common/Input/Input.vue";
import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
import Radio from '@/components/Common/Radio/Radio.vue';
import TextArea from "@/components/Common/TextArea/TextArea.vue";
import Button from "@/components/Common/Button/Button.vue";
import Send from "@/components/Icon/Send.vue";
import AttachmentIcon from "@/components/Icon/Attachement.vue";
import LoadingBtn from "@/components/Icon/LoadingButton.vue";
import P from "@/components/Common/Paragraphe/Paragraphe.vue";
import {isAnArrayorPush} from "@/utils/formdata/formData";
import {ref,onMounted, reactive, computed, watch, onUpdated} from "vue";
import { useStore } from "vuex";


interface commentDataType{
label : string,
nameInput : string,
maxLength : number,
showCount : boolean,
placeholder : string,
}

const store = useStore();

//============ comment in make offer ==========
const text = reactive({
    sendBtn : "envoyer",

})
const newComment = reactive<{
    [key : string] : any;
}>({
    message : "",
    file : [],
    clientSales : 1,
})
const computedUrl = (url : string)=> (`${import.meta.env.VITE_API_ROOT_URL}${url}`)

const iconAjustment = ref<{}>({position : 'relative', bottom : '-3'});
const commentInput = ref<commentDataType>({
    label : "Commentaire",
    nameInput : "comment",
    maxLength : 1000,
    showCount : true,
    placeholder : " Votre commentaire"
})
const searching = ref<boolean>(false);
const loading = ref<boolean>(false);

const handleCommentText = (e : any)=>{
    newComment.message = e;
    console.log("event : ", newComment);
}
const handlecommentFile = (e : any) =>{
    newComment.file = e
    console.log("event : ", newComment);
    
}
const sendComment = ()=>{
    searching.value = true;
    const formData = new FormData();
    const keys = Object.keys(newComment);
    keys.forEach(key =>{
        if(key === 'file'){
            if(Array.isArray(newComment[key])){
                newComment[key].forEach((item : any,idx : number) =>{
                
                    formData.append(`${key}[${idx}]`, item.originFileObj);
            })
            }
        }else{
                isAnArrayorPush(key,newComment[key],formData);
            }
    })
    store.dispatch("MakeOfferModule/PostComments",formData);

    
}
// const f = ref<[]>([]);
const comments = computed(()=>store.getters["MakeOfferModule/getCommentList"]);

// =====================================
onMounted(()=>{
    store.dispatch("MakeOfferModule/getComments",1);
    loading.value = true;
})
onUpdated(()=>{
    store.dispatch("MakeOfferModule/getComments",1);

})
watch(()=>store.getters["MakeOfferModule/getCommentList"],
    (newVal,old)=>{
        loading.value = false;
        if(old !== newVal){
            searching.value = false;
        }
    }
    )
</script>
<template>
    <div class="container">
        <Loader v-if="loading" />

        <!-- for make offer -->
        <div v-else>
            <div class="comment-list">
       

            <div v-for="(comment,idx) in comments"
            :key="idx"
            :class="comment.isMyComment ? 'comment-container-ext-owner': 'comment-container-ext-other' "
                > 
                    <div class="comment-container-int">
                        <div class="comment-header">    
                            <P type="bold" font-size="10px" >Auteur : {{ comment.isMyComment ? 'Moi' : `${comment.user.firstname} ${comment.user.name}`}}</P>
                        </div>
                        <hr>
                        <div class="comment-body">
                            <P>{{ comment.message }}</P>
                        </div>
                        <div
                        v-if="comment.clientSalesAgreementDiscussionFiles.length" 
                        class="comment-container-pj"
                        >
                            <a
                            v-for="(file,id_) in comment.clientSalesAgreementDiscussionFiles"
                                :key="'k'+id_"
                                :href="computedUrl(file.path)"
                            >

                                <AttachmentIcon
                                size="xs"
                                />
                            </a>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div> 
            <TextArea
            :label="commentInput.label"
            :placeholder="commentInput.placeholder"
            :name-input="commentInput.nameInput"
            :max-length="commentInput.maxLength"
            :show-count="commentInput.showCount"
            @on-change="handleCommentText"
            />
            <upload-image
                @upload="handlecommentFile"
            />
            <div class="action-container">

                <Button 
                    class="action-btn"
                    width="fit-content"
                    @on-click="sendComment"
                >
                    <template #default>
                        <div class="action-btn-content">
                            {{text.sendBtn}}
                            <LoadingBtn v-if="searching"
                                :style="iconAjustment"
                                size="xs"
                            />
                            <Send v-else
                                :style="iconAjustment"
                                size="xs"
                            />
                        </div>
                    </template>
                </Button>
            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped>
.container{

    @apply py-10;
}
    .action{
        &-container{
            @apply w-full flex justify-end;
        }
        &-btn{
            &-content{
                @apply w-full flex justify-between gap-2;
            }

        }
    }
    .comment{
        &-list{
            @apply w-full flex-col justify-center;
        }
        &-container{

            &-ext{
                &-owner{
                    margin-bottom: 20px;
                    @apply w-full flex justify-start gap-10;
                }
                &-other{
                    margin-bottom: 20px;
                    @apply w-full flex justify-end gap-10;
                }
                
            }
            &-int{
                width : fit-content;
                background-color: var(--tw-ring-offset-color);
                border-radius: 0 10px;
                padding: 1px 10px;
            }
            &-pj{
                width: fit-content;
                @apply flex justify-end pb-1;
            }
        }
        &-header{

            @apply pt-2;

        }
        &-body{
            @apply pt-2 pb-1;
            color : var(--color-gray-icon);


        }
    }
</style>