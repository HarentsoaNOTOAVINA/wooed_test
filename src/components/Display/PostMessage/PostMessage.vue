<template>
    <Transition appear name="fadeHeight" mode="out-in">
        <div class="postMessage" ref="postMessageRef">
            <div
                v-if="params.attachments && params.attachments.length"
                class="postMessage__images-uploaded mb-[4px]"
            >
                <div
                    v-for="(item, index) in params.attachments"
                    :key="index"
                    class="postMessage__images-file"
                >
                    <!-- {{ item }} -->
                    <img :src="item.thumbUrl" alt="Image" :title="item.name" />
                </div>
            </div>
            <div class="postMessage__container">
                <TextArea
                    placeholder="Ecrivez...."
                    name-input="body"
                    :default-value="params.body"
                    :auto-size="rows"
                    :maxLength="0"
                    class="postMessage__field"
                    @handle-change="handleHeight"
                />
                <div class="postMessage__post">
                    <div class="postMessage__upload">
                        <UploadImage
                            @upload="handleUploadFiles"
                            custom-button-upload
                        >
                            <template #customUpload>
                                <Icon icon-name="AttachFile" />
                            </template>
                        </UploadImage>
                        <UploadImage
                            @upload="handleUploadFiles"
                            custom-button-upload
                            :typeImage="true"
                        >
                            <template #customUpload>
                                <Icon icon-name="CardImage" />
                            </template>
                        </UploadImage>
                    </div>
                    <Button type-button="secondary" @click="sendMessage"
                        ><LoadingButton
                            size="xs"
                            v-if="loadingBtn"
                        />Envoyer</Button
                    >
                </div>
            </div>
            <div
                v-if="params.attachments && params.attachments.length"
                class="postMessage__files-uploaded"
            >
                <div
                    v-for="(item, index) in params.attachments"
                    :key="index"
                    class="postMessage__files-content"
                    :title="item.name"
                >
                    <Icon icon-name="Files" />
                    <span class="files__button">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref, nextTick } from 'vue';
    import UploadImage from '../UploadImage/UploadImage.vue';

    // const postMessageHeight = ref();
    const rows = { minRows: 1, maxRows: 5 };
    const postMessageRef = ref();
    const params = ref<any>({
        attachments: [],
        body: ''
    });

    const props = defineProps({
        loadingBtn: {
            type: Boolean,
            default: false,
        },
    });
    const emit = defineEmits<{
        (e: 'sendMessage', value: any): void;
    }>();

    function handleUploadFiles(value: any) {
        params.value.attachments.push(...value);
    }

    function handleHeight(value: any) {
        params.value = {
            ...params.value,
            body: value.body,
        };
    }

    function sendMessage() {
        console.log(params.value, "before");
        
        emit('sendMessage', params.value);
        params.value = {
            attachments: [],
            body: ''
        }
        console.log(params.value, "after");
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .postMessage {
        &__container {
            @apply flex flex-col gap-[24px];
        }
        &__field {
            :deep() {
                textarea {
                    @apply rounded-[4px];
                }
            }
        }
        &__post {
            @apply flex items-center justify-between gap-[24px];
        }
        &__upload {
            @apply flex items-center gap-[24px];
        }
        &__images {
            &-uploaded {
                border-top: 1px solid;
                @apply border-gray;
                @apply flex flex-wrap gap-[4px] pt-[5px];
            }
            &-file {
                border: 1px solid var(--color-stroke-gray);
                @apply w-[48px] h-[48px] bg-gray rounded-[4px] shadow-md;
                img {
                    @apply w-full h-full object-cover;
                }
            }
        }
        &__files {
            &-uploaded {
                max-height: 56px;
                @apply flex flex-wrap gap-[4px] mt-[4px] overflow-y-auto;
                @include scrollbar;
            }
            &-content {
                @apply flex items-center gap-[10px] font-[30] text-[12px] bg-gray p-[4px] rounded-[4px];
                &:deep() {
                    svg {
                        path {
                            @apply fill-primary;
                        }
                    }
                }
            }
        }
        &:deep() {
            .customButtonUpload {
                .ant-upload-list-picture-card-container {
                    @apply hidden;
                }
            }
        }
    }
    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.3s ease-in-out;
        max-height: 800px;
    }

    .fadeHeight-enter-from,
    .fadeHeight-leave-to {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0px;
    }
</style>
