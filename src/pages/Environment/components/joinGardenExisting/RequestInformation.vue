<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="request">
            <div class="request__container">
                <Title type="h3" :label="messageSubject" class="request__title" />
                <hr class="__hr" />
                <div class="requestInfo">
                    <TextArea label="Message" :autoSize="rows" placeholder="Ajouter votre message..."
                        nameInput="message" :default-value="messageBody"
                        @handle-change="handleChange($event, garden.id)" />
                    <div class="requestInfo__button">
                        <Button type-button="secondary" class="requestInfo__button-cancel" @click="router.go(0)">
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
import { computed } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const currentProperty = route.params.id;

const messageSubject = "Demander des informations complémentaires";
const predefinedMessage = `Bonjour,
Je souhaiterais obtenir des informations complémentaires quant au projet de "potager collectif" que vous avez initié.

Singulièrement, je souhaiterais connaître ...`

const messageBody = computed(() => { 
    let content = store.getters["CollectiveGardenModule/getAskInformationMessage"];
    if (content === undefined) content = predefinedMessage;
    return content
});

const garden = computed(() => store.getters["CollectiveGardenModule/getSelectedGarden"]);

const breadcrumbListsData = [
    {
        label: 'Jardin collectif',
        url: `/environnement/${currentProperty}/jardin-collectif`
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
        type: "ask-information"
    })
}

async function submitForm() {
    let response = await store.dispatch("CollectiveGardenModule/postMessage", "ask-information");
    let status = response.status;
    if (status === 200) {
        notification['success']({
            message: 'Votre méssage a été envoyer'
        });
        router.push({ name: "environment-detail", params: { id: currentProperty, feature: "jardin-collectif" } })
    } else {
        notification['error']({
            message: 'Veuilliez réessayer plutard'
        });
    }
}
</script>

<style lang="scss" scoped>
.request {
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

    .requestInfo {
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
