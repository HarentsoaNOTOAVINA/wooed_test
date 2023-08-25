<template>
    <div class="messageContainer" :class="showViewer ? 'positionViewer' : ''">
        <MenuTabs
            :tabs="dataTabs"
            :class="showViewer ? 'hidden' : ''"
            @click="changeTabs"
        />
        <div
            class="backViewer"
            :class="!showViewer ? 'backViewer-hide' : ''"
            @click="hideViewer"
        >
            <Icon icon-name="ArrowBack" />
            <span class="font-[600]">Retour</span>
        </div>
        <LoadingButton size="md" theme="dark" v-if="loading" class="loading" />
        <div class="messageContainer__items" v-else>
            <MessageList
                v-if="emailList && emailList.length"
                :class="showViewer ? 'hide-list' : ''"
                :email-list="emailList"
                @selectMessage="selectMessageViewer"
            />
            <MessageViewer
                :mail-id="messageId"
                :class="showViewer ? 'openViewer' : ''"
                :message-data="messageData"
                :any-selected-message="anySelectedMessage"
                :data-attachments="dataAttachments"
                :data-reply-attachments="dataReplyAttachments"
                @send-message-mail="sendMail"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import MiniMailBox from '@/services/miniMailBoxService';
    import { onMounted, reactive, ref, watch } from 'vue';
    import MenuTabs from './MenuTabs.vue';
    import MessageList from './MessageList.vue';
    import MessageViewer from './MessageViewer.vue';
    import { useRoute } from 'vue-router';
    import { useStore, Store } from 'vuex';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const routes = useRoute();
    const store = useStore();

    const dataTabs = [
        {
            tabTitle: 'Tout',
            tabName: 'all',
        },
        {
            tabTitle: 'Offre',
            tabName: 'offer',
        },
        {
            tabTitle: 'Travaux',
            tabName: 'work',
        },
        {
            tabTitle: 'Déménagement',
            tabName: 'moving',
        },
        {
            tabTitle: 'Communauté',
            tabName: 'community',
        },
        {
            tabTitle: 'Fournisseur',
            tabName: 'supplier',
        },
    ];

    const showViewer = ref<Boolean>(false);
    const anySelectedMessage = ref<boolean>(false);
    const loading = ref<boolean>(false);

    const inboxData = ref<any>();
    const messageId = ref<number>();
    const messageData = ref<any>(null);
    const emailList = ref<any>(null);
    const user = store.getters['UserModule/getUserDetails'];
    const tabName = ref<string>('all');
    const dataAttachments = ref<Array<any>>([]);
    const dataReplyAttachments = ref<Array<any>>([]);

    const props = defineProps({
        emailTypeView: {
            type: String,
            default: 'RECEIVED',
        },
    });

    watch(
        () => props.emailTypeView,
        (v) => {
            fetchInboxes();
            anySelectedMessage.value = false;
        },
        { immediate: true, deep: true }
    );

    onMounted(() => {
        fetchInboxes();
    });

    function changeTabs(name: string) {
        tabName.value = name;
        anySelectedMessage.value = false;
        fetchEmails();
    }

    async function fetchInboxes() {
        loading.value = true;
        try {
            const res = await MiniMailBox.getInboxesById(user.id);
            inboxData.value = res;
        } catch (error) {
            console.error(error);
        } finally {
            fetchEmails();
        }
    }

    async function fetchEmails() {
        loading.value = true;
        try {
            const data = await MiniMailBox.getEmailsList(inboxData.value[0].id);
            emailList.value = Object.values(data).filter(
                (item: any) => item.type === props.emailTypeView
            );
            emailList.value.sort(
                (a: { created: any }, b: { created: string }) =>
                    b.created.localeCompare(a.created)
            );
            if (tabName.value !== 'all') {
                emailList.value = Object.values(emailList.value).filter(
                    (i: any) => i.category === tabName.value
                );
            }
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    }

    async function getEmailItem() {
        dataAttachments.value = [];
        try {
            const data = await MiniMailBox.getEmailsItem(messageId.value);
            messageData.value = data;
            if (messageData.value.attachments) {
                messageData.value.attachments.map(
                    (element: any, index: any) => {
                        const data = downloadFile(element.id);
                        data.then((value) => {
                            dataAttachments.value.push(value);
                        });
                    }
                );
            }
            if (
                messageData.value.replies &&
                Array.isArray(messageData.value.replies)
            ) {
                messageData.value.replies.forEach((reply: any) => {
                    if (reply.attachments && Array.isArray(reply.attachments)) {
                        dataReplyAttachments.value = [];
                        reply.attachments.map((element: any) => {
                            const data = downloadFile(element.id);
                            data.then((value) => {
                                dataReplyAttachments.value.push(value);
                            });
                        });
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    // async function getEmailItem() {
    //     // Vider les attachement
    //     dataAttachments.value = [];
    //     dataReplyAttachments.value = [];
    //     // Mapper les attachements
    //     try {
    //         const data = await MiniMailBox.getEmailsItem(messageId.value);
    //         messageData.value = data;

    //         if (messageData.value.attachments) {
    //             const attachmentPromises = messageData.value.attachments.map(
    //                 (element: any) => {
    //                     return downloadFile(element.id);
    //                 }
    //             );

    //             dataAttachments.value = await Promise.all(attachmentPromises);
    //         }
    //         // Mapper les attachements de la reponse
    //         if (
    //             messageData.value.replies &&
    //             Array.isArray(messageData.value.replies)
    //         ) {
    //             const replyAttachmentPromises =
    //                 messageData.value.replies.reduce((acc: any, reply: any) => {
    //                     if (
    //                         reply.attachments &&
    //                         Array.isArray(reply.attachments)
    //                     ) {
    //                         const replyAttachments = reply.attachments.map(
    //                             (element: any) => {
    //                                 return downloadFile(element.id);
    //                             }
    //                         );

    //                         return acc.concat(replyAttachments);
    //                     }

    //                     return acc;
    //                 }, []);

    //             dataReplyAttachments.value = await Promise.all(
    //                 replyAttachmentPromises
    //             );
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async function downloadFile(id: number) {
        try {
            const data = await MiniMailBox.downloadFile(id);
            return data;
        } catch (error) {
            throw error;
        }
    }

    function selectMessageViewer(value: any) {
        messageId.value = value;
        showViewer.value = true;
        anySelectedMessage.value = true;
        getEmailItem();
    }

    function sendMail() {
        getEmailItem();
    }

    function hideViewer() {
        showViewer.value = false;
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .messageContainer {
        transform: translateY(0);
        transition: all 0.5s ease;
        // min-height: 60px;
        @apply flex flex-col h-full bg-white top-0;
        @screen lg {
            transform: translateY(0);
        }
        &__items {
            height: calc(100% - 53px);
            @apply flex gap-[2px];
            @media (max-width: 1023px) {
                @apply bg-white p-[14px] rounded-[8px];
            }
            @media (max-height: 500px) {
                height: auto !important;
            }
        }
        .messageList {
            @apply w-full;
            @screen lg {
                max-width: 292px;
            }
        }
        .messageViewer {
            @apply hidden w-full;
            @screen lg {
                width: calc(100% - 292px);
                @apply flex;
            }
        }
        .openViewer {
            @apply flex;
        }
        .backViewer {
            @apply flex items-center gap-[5px] bg-white mb-[14px] p-[12px] rounded-[8px] cursor-pointer;
            @include hoverButtonDark;
            &-hide {
                @apply hidden;
            }
            @screen lg {
                @apply hidden;
            }
        }
        .hide-list {
            @apply hidden;
            @screen lg {
                @apply flex;
                max-width: 292px;
            }
        }
        &.positionViewer {
            transition: all 0.25s ease;
            transform: translateY(0);
            @apply absolute top-[-59px] w-full bg-transparent z-[1];
            @screen md {
                transition: all 0.25s ease;
                @apply static;
            }
            // @screen lg {
            //     @apply h-auto;
            // }
            .messageContainer__items {
                @apply h-full;
                @screen md {
                    height: calc(100% - 59px);
                }
                @screen lg {
                    height: calc(100% - 53px);
                }
            }
        }
    }
    .loading {
        display: flex;
        &:deep() {
            svg {
                margin: 25px auto;
            }
        }
    }
</style>
