<template>
    <div class="h-full">
        <div>
            <div class="message__content-head">
                <Icon icon-name="ArrowBack" @click="$emit('close')"/>
                <MessageCard :data="dataUser">
                    <template #messages>
                        <Paragraphe font-size="14px" >
                                En ligne
                            </Paragraphe>
                    </template>
                </MessageCard>
            </div>
            <Divider />
        </div>
        <div class="message__content-message" ref="contentScroll">
            <template v-if="listConversation?.length > 0">
                <div v-for="c in listConversation" :key="c.id">
                    <div
                        class="message__wrap"
                        v-if="c.user.id === userConnected.id"
                    >
                        <Paragraphe font-size="14px" class="message__item">
                            {{ c.content }}
                        </Paragraphe>
                        <Paragraphe font-size="12px" class="message__item-date">
                            {{ moment(c.created).fromNow() }}
                        </Paragraphe>
                    </div>
                    <div class="message__wrap message__wrap--received" v-else>
                        <Paragraphe
                            font-size="14px"
                            class="message__item message__item--received"
                        >
                            {{ c.content }}
                        </Paragraphe>
                        <Paragraphe font-size="12px" class="message__item-date">
                            {{ moment(c.created).fromNow() }}
                        </Paragraphe>
                    </div>
                </div>
            </template>
            <div class="message__empty" v-else>
                <Icon icon-name="EmptyMessages" />
            </div>
        </div>
        <div class="message__footer">
            <form @submit.prevent="handlePostMessage" class="auth__form">
                <TextArea
                    placeholder="Ecrivez..."
                    name-input="content"
                    @handle-change="handleChange"
                    disabled-new-line
                    @submit="handlePostMessage"
                />
                <button type="submit" class="message__textarea-icon">
                    <Icon icon-name="Send" />
                </button>
            </form>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import MessageCard from './MessageCard.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { MessagesService } from '@/services/messageService';
    import { Divider } from 'ant-design-vue';
    import { diffDate } from '@/utils/date/diffDate';
    import { useSocketConversation } from '@/composables/socket/socket';
    import { ref, watch, onMounted } from 'vue';
    import store from '@/store';
    import moment from 'moment';

    const props = defineProps({
        dataUser: {
            type: Object,
            default: {},
        },
        dataConversation: {
            type: Array,
            default: [],
        },
    });

    const listConversation = ref<any>(props.dataConversation);
    const userConnected = ref<any>();
    const paramsPost = ref<object>();
    const contentScroll = ref();

    onMounted(() => {
        userConnected.value = store.getters['UserModule/getUserDetails'];
    }),
        // const { conversationItems, eSource, initSocketConversation } = useSocketConversation(
        //     props.dataUser.id
        // );

        watch(
            () => props.dataConversation,
            (value) => {
                listConversation.value = value;
                setTimeout(() => {
                    contentScroll.value.scrollTop =
                        contentScroll.value.scrollHeight;
                }, 100);
            },
            { immediate: true }
        );

    // watch(
    //     () => userConnected.value,
    //     (value) => {
    //         console.log("tonga ato");

    //         if (value) {
    //             contentScroll.value.scrollTop =
    //                 contentScroll.value.scrollHeight;
    //         }
    //     },
    //     { immediate: true, deep: true }
    // );

    // watch(
    //     () => conversationItems?.value,
    //     (v) => {
    //         console.log('>>>>> conversation', v);
    //         listConversation.value = v;
    //         // dataChat.value = v;
    //         // store.dispatch('MessagesModule/setNotifications', v)
    //     },
    //     { immediate: true, deep: true }
    // );

    // watch(
    //     () => props.dataUser,
    //     (v) => {

    //         if (v) {
    //             initSocketConversation();
    //         } else {
    //             if (eSource.value) {
    //                 eSource.value.close();
    //             }
    //         }
    //     },
    //     { immediate: true }
    // );

    const handleChange = function (value: any) {
        paramsPost.value = { ...value };
    };
    const handlePostMessage = async function () {
        try {
            await MessagesService.postMessage({
                ...paramsPost.value,
                conversation: props.dataUser.id,
            });
        } catch (error) {
            console.error(error);
        } finally {
        }
    };
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .message {
        &__content-message {
            height: calc(100vh - 315px);
            @include scrollbar;
            overflow-y: auto;
            padding-right: 5px;
        }
        &__empty {
            @apply flex justify-center items-center w-full h-full;
        }
        &__textarea-icon {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 100%;
            cursor: pointer;
            &:deep() {
                svg {
                    height: 23px;
                }
            }
        }
        &__footer {
            position: absolute;
            bottom: 10px;
            width: 100%;
            &:deep() {
                textarea {
                    background-color: var(--color-gray);
                    border-radius: 4px;
                    padding-right: 40px;
                    resize: none;
                }
            }
        }
        &__item {
            padding: 5px 10px;
            border-radius: 14px;
            background-color: var(--color-primary);
            color: #fff;
            max-width: 50%;
            line-height: 18px;
            &--received {
                color: var(--color-secondary);
                border: 0.5px solid var(--color-primary);
                background-color: transparent;
            }
            @screen lg {
                padding: 5px 24px;
                line-height: inherit;
            }
        }
        &__wrap {
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            &--received {
                align-items: flex-start;
            }
        }
        &__item-date {
            color: var(--color-gray-icon);
        }
        &__content-head {
            @apply flex items-center gap-[15px];
            .icon {
                flex: 0 0 15px;
            }
            @screen lg {
                .icon {
                    display: none;
                }
            }
        }
    }
</style>
