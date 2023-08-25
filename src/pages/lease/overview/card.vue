<script lang="ts" setup>
    import { ref, reactive, onMounted } from 'vue';
    import DeleteIcon from '@/components/Icon/deleteRoudedBG.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    const text = reactive<{ [key: string]: any }>({
        title: 'Photo',
        commentLabel: 'Commentaire',
    });

    const props = defineProps({
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            default: 'Photo',
        },
        image: {
            type: String,
            required: true,
        },
    });

    const emit = defineEmits<{
        (e: 'comment', payload: any): void;
        (e: 'delete', payload: any): void;
    }>();

    const handleComment = (key: any, event: any) => {
        emit('comment', {
            comment: event,
            key,
        });
    };
    function deleteItem(id: any, $event: any) {
        emit('delete', id);
    }
</script>

<template>
    <div class="card-container">
        <div class="card-title flex flex-row justify-between">
            <div>
                <P type="bold">{{ props.title }}</P>
            </div>
            <div>
                <div @click="deleteItem(props.id, $event)">
                    <DeleteIcon />
                </div>
            </div>
        </div>
        <div class="card-img">
            <img :src="props.image" alt="some image" />
        </div>
        <div class="card-comment">
            <TextArea
                :autoSize="{ minRows: 4, maxRows: 8 }"
                :label="text.commentLabel"
                name-input="comment"
                :max-length="250"
                :rows="2"
                :placeholder="''"
                @on-change="handleComment(props.id, $event)"
            />
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .card {
        &-container {
            @apply container w-full flex flex-col p-3 my-2;
            border: 1px solid var(--color-stroke-gray);
            border-radius: 8px;
            @screen lg {
                @apply w-full flex flex-col;
            }
        }
        &-comment {
            @apply pt-5;
        }
        &-title {
            @apply pb-2;
            color: var(--color-gray-icon);
        }
        &-img {
            height: 360px;
            img,
            video {
                object-fit: contain;
                height: 100%;
                width: 100%;
            }
        }
    }
</style>
