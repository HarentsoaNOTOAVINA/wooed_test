<template>
    <div class="sendMessage">
        <PostMessage @sendMessage="sendMail" :loadingBtn="loadingBtn" />
    </div>
</template>
<script lang="ts" setup>
    import PostMessage from '@/components/Display/PostMessage/PostMessage.vue';
    import MiniMailBox from '@/services/miniMailBoxService';
    import { notification } from 'ant-design-vue';
    import { ref } from 'vue';

    const emit = defineEmits<{
        (e: 'sendMessageMail'): void;
    }>();

    const props = defineProps({
        mailSender: {
            type: Object,
        },
    });
    const loadingBtn = ref<boolean>(false)
    const sendTo = ref<Array<any>>([]);

    const params = ref<any>({
        inbox: props.mailSender && props.mailSender.inbox.id,
    })

    async function sendMail(value: any) {
        loadingBtn.value = true;
        if (props.mailSender && props.mailSender.type === 'RECEIVED') {
            sendTo.value = [props.mailSender.mailFrom]
        } else if (props.mailSender && props.mailSender.type === 'SENDED') {
            sendTo.value = [...props.mailSender.emailTo]
        }
        params.value= {
            ...params.value,
            ...value,
        };
        try {
            const formData = new FormData();
            Object.keys(params.value).forEach((key) => {
                if (key === 'attachments') {
                    params.value[key].forEach((file: any, index: number) => {
                        formData.append(`attachments[${index}][file]`, file.originFileObj);
                    });
                } else if (Array.isArray(params.value[key])) {
                    params.value[key].forEach((item: any, value: number) => {
                        formData.append(`${key}[${value}]`, item);
                    });
                } else {
                    formData.append(key, params.value[key]);
                }
            });
            const { data } = await MiniMailBox.replyEmail(props.mailSender && props.mailSender.id, formData);
            notification.success({
                message: 'Message envoyé',
            });
        } catch (error) {
            console.error(error);
        } finally {
            emit('sendMessageMail');
            loadingBtn.value = false;
        }
        
    }
    
</script>
<style lang="scss" scoped>
.sendMessage {
    position: fixed;
    width: -webkit-fill-available;
    background-color: white;
    bottom: 5px;
}
</style>
