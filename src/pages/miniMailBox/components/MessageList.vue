<template>
    <div class="messageList">
        <div
            v-for="(item, index) in emailList"
            :key="index"
            :class="item.read && item.read ? 'seen' : ''"
            class="messageList__item"
            @click="
                onMessageClick(item.emailReply ? item.emailReply.id : item.id)
            "
        >
            <div v-if="item.emailReply">
                <HeadProfile
                    :function-label="item.emailReply.mailFrom"
                    :data-profile="item.emailReply"
                />
                <div class="messageList__content">
                    <Paragraphe v-if="item.emailReply.body">
                        <span v-html="htmlContent(item.emailReply.body)"></span>
                    </Paragraphe>
                    <div
                        v-if="item.emailReply.attachments && item.emailReply.attachments.length"
                        class="postMessage__images-uploaded mb-[4px]"
                    >
                        <Paragraphe class="text-primary italic">Pièce jointe</Paragraphe>
                    </div>
                </div>
            </div>
            <div v-else>
                <HeadProfile
                    :function-label="item.mailFrom"
                    :data-profile="item"
                />
                <div class="messageList__content">
                    <Paragraphe v-if="item.body">
                        <span v-html="htmlContent(item.body)"></span>
                    </Paragraphe>
                    <div
                        v-if="item.attachments && item.attachments.length"
                        class="postMessage__images-uploaded mb-[4px]"
                    >
                    <Paragraphe class="text-primary italic">Pièce jointe</Paragraphe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { ref } from 'vue';
    import HeadProfile from './HeadProfile.vue';

    let selectedMessage = ref(null);
    const clicked = ref<Boolean>(false);

    const emit = defineEmits<{
        (e: 'selectMessage', value: any): void;
    }>();
    const props = defineProps({
        emailList: {
            type: Object,
        },
    });

    const onMessageClick = (message: any) => {
        selectedMessage = message;
        emit('selectMessage', selectedMessage);
    };

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
    .messageList {
        @apply flex flex-col gap-y-[2px] overflow-y-auto pr-[3px] -mr-[3px];
        @include scrollbar;
        border: 0.5px solid var(--color-stroke-gray);
        &:hover {
            @apply overflow-y-scroll;
        }
        &__item {
            @apply flex flex-col gap-[10px] p-[12px] bg-gray cursor-pointer;
            @include hoverButtonDark;
        }
        &__content {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            @apply text-[12px] text-grayIcon font-[300] pl-[12px];
        }
        .seen {
            @apply bg-white;
        }
    }
</style>
