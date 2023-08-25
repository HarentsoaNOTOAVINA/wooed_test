<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="send">
            <div class="send__container">
                <Title type="h3" :label="messageSubject" class="send__title" />
                <hr class="__hr" />
                <div class="sendInfo">
                    <TextArea label="Message" :autoSize="rows" placeholder="Ajouter votre message..."
                        nameInput="message" :default-value="messageBody"
                        @handle-change="handleChange($event, garden.id)" />
                    <div class="sendInfo__button">
                        <Button type-button="secondary" class="sendInfo__button-cancel" @click="router.go(0)">
                            Annuler
                        </Button>
                        <Button type-button="secondary" @click="submitForm" :disabled="!messageBody.length"> Envoyer </Button>
                    </div>
                </div>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
import Title from '@/components/Common/Title/Title.vue';
import MainCard from '@/components/Display/MainCard/MainCard.vue';
import Button from '@/components/Common/Button/Button.vue';
import Input from '@/components/Common/Input/Input.vue';
import TextArea from '@/components/Common/TextArea/TextArea.vue';
import { notification } from 'ant-design-vue';
import { computed,ref } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const currentProperty = route.params.id;

const messageSubject = "Envoyer sa candidature";
const predefinedMessage = `Bonjour,

Par le présent méssage, je vous informe que je souhaiterais intégrer ce projet "potager collectif" que vous avez initié...`


const messageBody = computed(() => { 
    let content = store.getters["CollectiveGardenModule/getApplicationMessage"];
    if (content === undefined) content = predefinedMessage;
    return content;
});
const garden = computed(() => store.getters["CollectiveGardenModule/getSelectedGarden"]);

const breadcrumbListsData = [
    {
        label: 'Jardin collectif',
        url: `/environnement/${route.params.id}/jardin-collectif`
    },
    {
        label: 'Joindre un jardin collective existant',
    },
];

const rows = { minRows: 6, maxRows: 10 };

function handleChange(value: any, gardenID: number) {
    store.commit("CollectiveGardenModule/setMessagesData", {
        messageBody: {
            content: value.message,
            project: gardenID,
            subject: messageSubject,
            urlSite: "/"
        },
        type: "application"
    })
}

function callback(){
        notification.success({message : "'Votre méssage a été envoyer'"})        
    }

async function submitForm() {
    store.dispatch("CollectiveGardenModule/createCollectiveGatdenLot",callback);
    
}
</script>

<style lang="scss" scoped>
.send {
    @apply relative;

    &:deep() {
        .mainCard__items-wrap {
            @screen md {
                height: calc(100vh - 224px);
            }
        }
    }

    &__container {
        @apply flex flex-col gap-[14px] mb-[18px];
    }

    &__title {
        @apply text-[14px] text-primary font-[600] leading-[17px];
    }

    .sendInfo {
        @apply flex flex-col gap-[18px];

        &__custom-input {
            @apply mb-0;

            &:deep() {
                .custom-input__label-icon {
                    @apply hidden;
                }
            }
        }

        &__button {
            @apply flex justify-between gap-[10px] w-full pt-[18px];
            border-top: 1px solid theme('colors.gray');

            &:deep() {

                &>div,
                button {
                    @apply w-full;
                }

                &>div:first-child {
                    button {
                        @apply bg-white border-gray border-solid border-[1px] text-primary;
                    }
                }

                &>div:last-child {
                    button {
                        @apply border-primary bg-primary;
                    }
                }

                @screen sm {
                    @apply justify-end;

                    &>div,
                    button {
                        @apply w-auto;
                    }
                }

                @screen md {
                    width: calc(100% - 36px);
                    @apply absolute bottom-0 z-[400] py-[18px];
                }
            }

            // &-cancel {
            //     &:deep() {
            //         button {
            //             @apply text-primary bg-gray;
            //         }
            //     }
            // }
        }
    }

    .steps-btn {
        @apply justify-between gap-[10px] w-full pt-[18px];
        border-top: 1px solid theme('colors.gray');

        &>div,
        button {
            @apply w-full;
        }

        &>div:first-child {
            button {
                @apply border-gray;
            }
        }

        &>div:last-child {
            button {
                @apply border-primary bg-primary text-white;
            }
        }

        @screen sm {
            @apply justify-end;

            &>div,
            button {
                @apply w-auto;
            }
        }

        @screen md {
            width: calc(100% - 36px);
            @apply absolute bottom-0 z-[400] py-[18px];
        }
    }
}

.__hr {
    @apply text-gray w-full;
}
</style>
