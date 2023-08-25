<template>
    <CardWrapper class="message__container">
        <Title type="h4" weight="600">Messages</Title>
        <div class="message__wrapper">
            <div class="message__wrap-item">
                <div class="message__add-discussion">
                    <ButtonMenu
                        :is-icon="AddGroup"
                        height="34px"
                        @on-click="handleAdd('group')"
                    >
                        Créer groupe
                    </ButtonMenu>
                    <ButtonMenu
                        :is-icon="Discussion"
                        height="34px"
                        @on-click="handleAdd('single')"
                    >
                        Discussion
                    </ButtonMenu>
                </div>
                <MessageCard :data="userDetails" />
                <Divider />
                <Input
                    :icon-field="true"
                    icon-name-field="Search"
                    placeholder="Recherche"
                    class="message__searchField"
                />
                <div>
                    <div
                        class="message__items"
                        v-for="chat in dataChat"
                        :key="chat.id"
                    >
                        <MessageCard
                            :data="chat"
                            @click="handleClickItem(chat)"
                        >
                            <template #messages>
                                <Paragraphe font-size="12px">
                                    {{ chat?.lastMessage?.content }}
                                </Paragraphe>
                            </template>
                        </MessageCard>
                    </div>
                </div>
            </div>
            <div
                class="message__content"
                :class="{ 'message__content--mobile': MobileClass }"
            >
                <MessageConversation
                    v-if="conversation && Object.keys(conversation).length > 0"
                    :data-user="conversation"
                    :data-conversation="listConversation"
                    @close="MobileClass = false"
                />
                <div class="message__empty-conversation" v-else>
                    <Icon icon-name="EmptyMessages" />
                </div>
            </div>
        </div>
        <MessagesAddConversation
            :show-modal="showModalAdd"
            @close="showModalAdd = false"
        />
    </CardWrapper>
</template>

<script setup lang="ts">
    import Input from '@/components/Common/Input/Input.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import ButtonMenu from '@/components/Common/ButtonMenu/ButtonMenu.vue';
    import Discussion from '@/components/Icon/Discussion.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import MessageConversation from './components/MessageConversation.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import AddGroup from '@/components/Icon/AddGroup.vue';
    import MessagesAddConversation from './components/MessagesAddConversation.vue';

    import { Divider } from 'ant-design-vue';
    import MessageCard from './components/MessageCard.vue';
    import {
        useSocketChat,
        useSocketConversation,
    } from '@/composables/socket/socket';
    import store from '@/store';
    import { watch, ref, onMounted, computed } from 'vue';
    import { MessagesService } from '@/services/messageService';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const { dataConversation, evtSource, initSocketChat } = useSocketChat();
    const { conversationItems, eSource, initSocketConversation } =
        useSocketConversation();

    const dataChat = ref<any>();
    const conversation = ref<any>();
    const userDetails = ref<any>();
    const listConversation = ref<Array<object>>(
        store.getters['MessagesModule/getConversation']
    );
    const showModalAdd = ref<boolean>(false);
    const MobileClass = ref<boolean>(false);

    const conversationID = computed(() => route.params.id);

    onMounted(() => {
        userDetails.value = store.getters['UserModule/getUserDetails'];
        initSocketChat();
    });

    watch(
        () => dataConversation?.value,
        (v) => {
            dataChat.value = v;
            console.log(v, 'CHAT');
            if (conversationID.value && v) {
                handleInstantOpeningDiscution();
            }
        },
        { immediate: true, deep: true }
    );

    watch(
        () => store.getters['MessagesModule/getConversation'],
        (v) => {
            listConversation.value = v;
        },
        { immediate: true, deep: true }
    );

    function handleInstantOpeningDiscution() {
        let chatItem: any = null;
        const hasConversation = !!dataChat.value.length;
        if (hasConversation) {
            chatItem = dataChat.value
                .find((item: any) =>
                    item.participants.find(
                        (item: any) => +item.id === +conversationID.value
                    )
                )
        }
        if (chatItem) {
            handleClickItem(chatItem)
        }
    }

    const handleClickItem = async function (item: any) {
        if ((window as any).screen.width < 1024) MobileClass.value = true;

        if (eSource.value) {
            eSource.value.close();
            initSocketConversation(item.id);
        } else {
            initSocketConversation(item.id);
        }
        conversation.value = item;
        store.dispatch('MessagesModule/setNullConversation');
        await MessagesService.vieuwMessages(item.id);
    };

    const handleAdd = function (type: string) {
        store.dispatch('UserModule/setAllUser');
        showModalAdd.value = !showModalAdd.value;
    };
</script>

<style lang="scss" scoped>
    .message {
        &__container {
            height: calc(100vh - 90px);
            @apply container mt-[10px] mx-[10px] px-[10px];
            width: auto;
            @screen lg {
                @apply mt-[18px] px-[20px] mx-auto;
            }
            &:deep() {
                h4 {
                    color: var(--color-gray-icon);
                    margin-bottom: 18px;
                }
            }
            &:deep() {
                .ant-divider {
                    @apply my-[15px];
                    @screen lg {
                        @apply my-[24px];
                    }
                }
            }
        }
        &__wrapper {
            height: calc(100% - 42px);
            position: relative;
            @apply lg:grid lg:grid-cols-3 gap-[30px];
        }
        &__content {
            @apply col-span-2;
            position: relative;
            opacity: 0;
            transition: opacity 0.25s ease;
            z-index: -1;
            @screen lg {
                opacity: 1;
                z-index: 2;
            }
            &--mobile {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #fff;
                padding-top: 15px;
                opacity: 1;
                z-index: 2;
                transition: opacity 0.25s ease;
            }
        }
        &__wrap-item {
            padding-right: 15px;
            position: relative;
            &::after {
                content: '';
                display: inline-block;
                position: absolute;
                height: 100%;
                right: 0;
                top: 0;
                width: 1px;
                background-color: var(--color-gray);
            }
        }
        &__searchField {
            @apply mb-[25px];
            &:deep() {
                .ant-input {
                    @apply bg-gray rounded-[24px] text-[12px];
                }
            }
        }
        &__items {
            border: 0.5px solid #f2f2f2;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 10px;
            &:deep() {
                .message__card {
                    cursor: pointer;
                }
            }
        }
        &__empty-conversation {
            display: none;
            @screen lg {
                @apply flex items-center justify-center h-full;
            }
        }
        &__add-discussion {
            @apply grid grid-cols-2 gap-[10px];
            &:deep() {
                .button-menu__wrap-icon {
                    width: auto;
                    height: auto;
                    background-color: transparent;
                }
            }
        }
    }
</style>
