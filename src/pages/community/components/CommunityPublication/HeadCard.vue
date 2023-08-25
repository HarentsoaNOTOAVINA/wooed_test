<template>
    <div class="container-head">
        <div
            class="container-head__wrap"
            :class="
                props.idAuthor === userId ? 'container-head__wrap--setting' : ''
            "
        >
            <div class="container-head__profile">
                <a-popover
                    trigger="click"
                    placement="bottomLeft"
                    v-model:visible="showSendMessage"
                >
                    <template #content>
                        <div 
                            class="container-head__popup" 
                            v-if="props.idAuthor !== userId && !loadRedirectMessage"
                            @click="handleSendMessage(props.idAuthor)"
                        >
                            <Icon icon-name="Chat" />
                            <P>Envoyer un message</P>
                        </div>
                        <LoadingButton 
                            v-if="loadRedirectMessage"
                            size="xs" 
                            theme="dark"
                            class="w-[100%]"
                        />
                    </template>
                    <avatar 
                        :src="props.avatar" 
                        :size="40"
                        @click="handleShowSendMessage"
                    />
                </a-popover>
                <div class="container-head__profile--item">
                    <P class="container-head__title">
                        <Title
                            type="h4"
                            :label="labelName"
                            weight="bold"
                            class="container-head__title-name"
                        />
                        <span v-if="props.idAuthor === userId">(vous)</span>
                    </P>
                    <span class="container-head__date">
                        {{ dateAdded }}
                    </span>
                </div>
            </div>
            <div class="container-head__more" v-if="props.idAuthor === userId">
                <a-popover
                    v-model:visible="visible"
                    trigger="click"
                    placement="bottom"
                >
                    <template #content>
                        <div class="popup-action" v-if="props.idAuthor === userId">
                            <a @click="hide"> <Icon icon-name="Edit" /> <span>Modifier la publication</span></a>
                            <hr class="__hr" />
                            <a-popconfirm
                                @confirm="handleDelete(props.idPublication)"
                                ok-text="Oui"
                                cancel-text="Non"
                                title="Voulez-vous vraiment supprimer ce publication ?"
                            >
                                <a @click="hide"> <Icon icon-name="Trash" /><span>Supprimer la publication</span></a>
                            </a-popconfirm>
                        </div>
                        <div class="popup-action" v-else>
                            <a-popconfirm
                                @confirm="handleSignal(props.idPublication)"
                                ok-text="Oui"
                                cancel-text="Non"
                                title="Voulez-vous vraiment signaler ce publication ?"
                            >
                                <a @click="hide">
                                    <Icon icon-name="Signal" /><span
                                        >Signaler la publication</span
                                    ></a
                                >
                            </a-popconfirm>
                        </div>
                    </template>
                    <Icon icon-name="MoreHorizontal" />
                </a-popover>
            </div>
        </div>
        <hr class="__hr" />
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import avatar from 'ant-design-vue/lib/avatar';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { Divider, Popover as APopover } from 'ant-design-vue';
    import { computed, ref } from 'vue';
    import { Popconfirm as APopconfirm, notification } from 'ant-design-vue';
    import { CommunityService } from '@/services/communityService';
    import store from '@/store';
    import { useRouter } from "vue-router";
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const props = defineProps({
        labelName: {
            type: String,
            default: '',
        },
        dateAdded: {
            type: String,
            default: '',
        },
        setting: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default: 'https://joeschmoe.io/api/v1/random',
        },
        idPublication: {
            type: Number,
            default: null,
        },
        idAuthor: {
            type: Number,
            default: null,
        },
    });

    const visible = ref<boolean>(false);
    const showSendMessage = ref<boolean>(false);
    const router = useRouter();
    const loadRedirectMessage = ref<boolean>(false);
    const userId = computed(
        () => store.getters['UserModule/getUserDetails'].id
    );

    const hide = () => {
        visible.value = false;
    };

    async function handleDelete(idItem: any) {
        await store
            .dispatch('CommunityModule/deletePublication', idItem)
            .then(() => {
                notification['success']({
                    message: 'Succèss',
                    description: 'Publication supprimer avec succès',
                });
            })
            .catch((err) => {
                notification['error']({
                    message: 'Error',
                    description:
                        'Erreur lors de la suppression, Veuillez réessayer plus tard',
                });
            });
    }

    const handleSignal = async function (idPublication: any) {
        try {
            await CommunityService.signalPublication({ post: idPublication });
            notification['success']({
                message: 'Succèss',
                description: 'Publication signaler avec succès',
            });
        } catch (error) {
            notification['error']({
                message: 'Error',
                description:
                    "Une erreur s'est produit, veuillez réessayer",
            });
        }
    };

    function handleShowSendMessage(){
        showSendMessage.value = !showSendMessage.value
    }
    async function handleSendMessage(idOwner : number){
        loadRedirectMessage.value = true;
        await store.dispatch('CommunityModule/handleGetConversation', idOwner)
        .then(res => {
            router.push('/messages');
        })
        .catch(err => {
            notification['error']({
                message :'Erreur',
                description : "Une erreur s'est produite, veuillez le réessayer plus tard"
            })
        }).finally(() => {
            loadRedirectMessage.value = false;
        })
    }
</script>

<style lang="scss" scoped>
    .container-head {
        @apply flex flex-col gap-y-[18px];
        &__wrap {
            @apply relative;
        }
        &__wrap--setting {
            @apply pr-[40px];
        }
        &__profile {
            @apply flex items-center gap-[25px];
            &:deep() {
                .ant-avatar {
                    cursor: pointer;
                }
            }
            &--item {
                @apply flex flex-col gap-[4px];
            }
        }
        &__title{
            @apply flex gap-[5px] text-[12px];
        }
        &__title-name {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
        }
        &__date {
            font-weight: 300;
            font-size: 12px;
            line-height: 18px;
        }
        &__more {
            width: 38px;
            height: 38px;
            border-radius: 100px;
            @apply absolute -right-[10px] -top-[5px] flex flex-row justify-center items-center p-[10px] gap-[10px] cursor-pointer transition;
            &:hover {
                @apply bg-gray transition;
            }
        }

        &__popup{
            @apply flex gap-[10px] cursor-pointer;
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
    .popup-action {
        @apply flex flex-col gap-y-[5px];
        &:deep() {
            a {
                svg {
                    width: 25px;
                }
                &:not(:last-child) {
                    svg {
                        width: 18px;
                    }
                }
            }
            .icon {
                justify-content: flex-start;
                flex: 0 0 25px;
            }
        }
        a {
            @apply flex items-center gap-[5px];

            &:hover {
                color: var(--color-primary);
            }

            span {
                @apply col-span-3;
            }
        }
    }

</style>
