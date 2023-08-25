<template>
    <div v-if="messageData && anySelectedMessage" class="messageViewer">
        <div class="messageViewer__container">
            <div class="messageViewer__content">
                <HeadProfile :data-profile="messageData" />
                <Paragraphe>
                    <span
                        v-html="
                            messageData.body
                                ? htmlContent(messageData.body)
                                : messageData.subject
                        "
                    ></span>
                </Paragraphe>
                <hr class="divider" />
                <Paragraphe class="text-primary font-semibold"
                    >{{ messageData.attachments.length }} pièces
                    jointes</Paragraphe
                >
                <div
                    v-if="
                        dataAttachment &&
                        dataAttachment.length &&
                        messageData.attachments
                    "
                    class="mb-[4px]"
                >
                    <div class="postMessage__images-uploaded">
                        <div
                            v-for="(file, idx) in messageData.attachments"
                            :key="idx"
                            class="postMessage__images-file"
                        >
                            <a
                                v-if="
                                    file.contentType.includes('image') &&
                                    dataAttachment[idx] !== undefined
                                "
                                :href="`data:${file.contentType};base64,${dataAttachment[idx]}`"
                                download
                                target="_blank"
                                class="flex gap-[08px]"
                            >
                                <img
                                    :src="`data:${file.contentType};base64,${dataAttachment[idx]}`"
                                    :alt="file.name"
                                />
                            </a>
                            <a
                                v-if="
                                    file.contentType === 'application/pdf' &&
                                    dataAttachment[idx] !== undefined
                                "
                                :href="`data:${file.contentType};base64,${dataAttachment[idx]}`"
                                download
                                target="_blank"
                                class="flex gap-[08px]"
                            >
                                <Pdf />
                                {{ file.name }}
                            </a>
                            <a
                                v-if="
                                    !(
                                        file.contentType.includes('image') ||
                                        file.contentType === 'application/pdf'
                                    ) && dataAttachment[idx] !== undefined
                                "
                                :href="`data:${file.contentType};base64,${dataAttachment[idx]}`"
                                download
                                target="_blank"
                                class="flex gap-[08px]"
                            >
                                <Download />
                                {{ file.name }}
                            </a>
                        </div>
                    </div>
                </div>

                <div v-if="messageData.replies">
                    <div
                        v-for="(item, index) in messageData.replies"
                        :key="index"
                        class="flex flex-col gap-[18px]"
                    >
                        <hr class="divider" />

                        <div class="headProfile__content">
                            <Title
                                type="h4"
                                :label="'De : ' + item.mailFromName"
                                weight="bold"
                                class="title"
                            />
                            <span class="flex flex-col items-end">
                                <span class="headProfile__date">
                                    {{
                                        moment(item.updated).format(
                                            'DD/MM/YYYY'
                                        )
                                    }}
                                </span>
                                <span class="headProfile__date">
                                    {{ moment(item.updated).format('HH:mm') }}
                                </span>
                            </span>
                        </div>
                        <Paragraphe>
                            {{ item.body }}
                        </Paragraphe>
                        <hr class="divider" />
                        <Paragraphe class="text-primary font-semibold"
                            >{{ item.attachments.length }} pièces
                            jointes</Paragraphe
                        >
                        <div
                            v-if="
                                dataReplyAttachment &&
                                dataReplyAttachment.length
                            "
                            class="mb-[4px]"
                        >
                            <div class="postMessage__images-uploaded">
                                <div
                                    v-for="(file, idx) in item.attachments"
                                    :key="idx"
                                    class="postMessage__images-file"
                                >
                                    <a
                                        v-if="
                                            file.contentType.includes(
                                                'image'
                                            ) &&
                                            dataReplyAttachment[index] !==
                                                undefined
                                        "
                                        :href="`data:${file.contentType};base64,${dataReplyAttachment[index]}`"
                                        download
                                        target="_blank"
                                        class="flex gap-[08px]"
                                    >
                                        <img
                                            :src="`data:${file.contentType};base64,${dataReplyAttachment[index]}`"
                                            :alt="file.name"
                                        />
                                    </a>
                                    <a
                                        v-if="
                                            file.contentType ===
                                                'application/pdf' &&
                                            dataReplyAttachment[index] !==
                                                undefined
                                        "
                                        :href="`data:${file.contentType};base64,${dataReplyAttachment[index]}`"
                                        download
                                        target="_blank"
                                        class="flex gap-[08px]"
                                    >
                                        <Pdf />
                                        {{ file.name }}
                                    </a>
                                    <a
                                        v-if="
                                            !(
                                                file.contentType.includes(
                                                    'image'
                                                ) ||
                                                file.contentType ===
                                                    'application/pdf'
                                            ) &&
                                            dataReplyAttachment[index] !==
                                                undefined
                                        "
                                        :href="`data:${file.contentType};base64,${dataReplyAttachment[index]}`"
                                        download
                                        target="_blank"
                                        class="flex gap-[08px]"
                                    >
                                        <Download />
                                        {{ file.name }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SendMessage :mail-sender="messageData" @send-message-mail="sendMail" />
    </div>
    <template v-else>
        <MessageViewerEmpty />
    </template>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { onMounted, ref, watch } from 'vue';
    import HeadProfile from './HeadProfile.vue';
    import MessageViewerEmpty from './MessageViewerEmpty.vue';
    import SendMessage from './SendMessage.vue';
    import moment from 'moment';
    import Pdf from '@/components/Icon/Pdf.vue';
    import Download from '@/components/Icon/Download.vue';

    const props = defineProps({
        mailId: {
            type: Number,
        },
        messageData: {
            type: Object,
        },
        anySelectedMessage: {
            type: Boolean,
            default: false,
        },
        dataAttachments: {
            type: Array,
        },
        dataReplyAttachments: {
            type: Array,
        },
    });

    const dataAttachment = ref<Array<any>>();
    const dataReplyAttachment = ref<Array<any>>();

    const emit = defineEmits<{
        (e: 'sendMessageMail'): void;
    }>();

    watch(
        () => props.dataAttachments,
        (v) => {
            dataAttachment.value = v;
        },
        { immediate: true, deep: true }
    );
    watch(
        () => props.dataReplyAttachments,
        (v) => {
            dataReplyAttachment.value = v;
        },
        { immediate: true, deep: true }
    );

    function sendMail() {
        emit('sendMessageMail');
    }

    function htmlContent(text: any) {
        if (text.includes('<img')) {
            return text.replace('<img', "<img class='hidden'");
        } else {
            return text;
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .messageViewer {
        width: 100%;
        @apply flex flex-col justify-between gap-[10px] relative mx-auto;
        @screen lg {
            border: 0.2px solid;
            @apply border-strokeGray p-[18px];
        }
        @screen xl {
            @apply px-[40px];
        }
        &__container {
            @apply h-[80%] flex flex-col gap-[18px];
        }
        &__content {
            // height: calc(100vh - (240px + v-bind(heightValue) * 1px));
            // min-height: 60px;
            @apply text-[14px] text-grayIcon font-[300] overflow-y-auto transition-all;
            @include scrollbar;
            @screen lg {
                // height: calc(100vh - (345px + v-bind(heightValue) * 1px));
            }
        }
    }
    .divider {
        @apply text-gray mt-2;
    }
    .title {
        @apply text-[16px] not-italic text-black;
        font-weight: 600;
    }
    .headProfile {
        &__content {
            @apply flex justify-between gap-[25px] w-full;
        }
        &__date {
            @apply block text-[12px] italic mt-[5px];
        }
    }
    .postMessage {
        &__images-uploaded {
            @apply flex gap-[18px] p-[12px] w-full rounded-sm;
            border: 1px solid var(--color-gray);
        }
        &__images-file {
            @apply cursor-pointer w-[150px] flex items-end p-[5px];
            border: 0.1px solid var(--color-gray);
            background-color: var(--color-gray);
        }
    }
    .pdf-file {
        // @apply w-[150px] ;
    }
</style>
