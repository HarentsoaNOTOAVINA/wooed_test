<template>
    <div>
        <div v-if="data.type === 'redirection'" class="redirection__container">
            <span class="redirection__sub-title">
                Voulez vous être rediriger vers la page
                <strong v-if="maintenances.includes(data.routeName)" style="color: var(--color-gray-icon);"> travaux
                    d'entretient </strong>
                <strong v-else style="color: var(--color-gray-icon);">{{ data.routeName }}</strong> pour continuer?
            </span>
            <div class="redirection__btn-container">
                <Button type-button="primary-cancel" @click="handleClick({ data: undefined, type: '' })">
                    Annullé
                </Button>
                <Button type-button="primary" @click="redirectTo(data.routeName)">
                    Confirmé
                </Button>
            </div>
        </div>

        <div v-else-if="data.type === 'contact'" class="contact__container">
            <div v-if="(typeof data.contact === 'string')">
                <span class="contact__sub-title">
                    Veuillez contacter l'adresse suivant pour plus d'informations
                </span>
                <span class="contact__contact">{{ data.contact }}</span>
            </div>
            <div v-else class="contact__list">
                <span class="contact__sub-title">
                    Veuillez contacter les adresses suivants pour plus d'informations
                </span>
                <Input label="Email" :value="data.contact.email" :disabled="false" class="mt-3" />
                <Input label="Téléphone" :value="data.contact.phone" :disabled="false" class="-mt-3" />
            </div>
        </div>

        <div v-else-if="data.type === 'info'" class="info__container">
            <div v-html="props.data.info" />
        </div>

        <div v-else-if="data.type === 'menu'">
            <Collapse ghost expand-icon-position="right" class="menu__collapse">
                <Panel v-for="(item, index) in data.menuList" :key="index" class="menu__collapse-panel"
                    :header="item.menu">
                    <div class="menu__collapse-content">
                        <div v-for="(content, index) in item.submenu" :key="index" class="menu__collapse-item"
                            rel="noopener noreferrer">
                            <div v-if="content.action.type === 'lien'">
                                <a class="cursor-pointer" :href="content.action.payload" target="_blank" v-text="content.label" />
                            </div>
                            <div v-if="content.action.type === 'redirection'" class="cursor-pointer" @click="redirectTo(data.routeName)">
                                {{ content.label }}
                            </div>
                            <div v-if="content.action === 'text'">
                                {{ content.label }}
                            </div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>

        <div v-else-if="data.type === 'pdf' || data.type === 'doc'" class="text-center">
            <a :href="base_url + data.pdfPath" download="download" v-text="data.linkLabel" />
        </div>

        <div v-else-if="data.type === 'form'" class="form__container">
            <div class="form__label">{{ data.description }}</div>
            <div class="form__input-container">
                <div v-for="(field, index) in data.formFields" :key="index" class="form__input">
                    <InputDate v-if="field.composant === 'InputDate'" :label="field.label" name="" />
                    <span v-if="field.descriptions.length > 1" class="text-xs">* {{ field.descriptions }}</span>
                    <Input v-if="field.composant === 'Input'" :label="field.label" />
                </div>
            </div>

            <Button type-button="primary" @click="submitForm" class="form__confirm-btn">
                Confirmé
            </Button>
        </div>

        <div v-else>
            Aucune action relative à votre cas
        </div>
    </div>
</template>
<script lang="ts" setup>
import Button from '@/components/Common/Button/Button.vue';
import Input from '@/components/Common/Input/Input.vue';
import InputDate from '@/components/Common/InputDate/InputDate.vue';
import { Collapse } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';

const { Panel } = Collapse;

const route = useRoute();
const router = useRouter();

const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    description: {
        type: String,
        default: ""
    },
    parentData: {
        type: Object,
        default: {}
    }
});

const emit = defineEmits(["set-active-display", "submit-form", "reset-action"]);
const base_url = window.location.origin;
const maintenances = ["travaux-d-entretient", "Travaux d'entretient"];

function redirectTo(value: any) {
    if (maintenances.includes(value)) router.push({ name: 'work-maintains', params: { id: route.params.id } })
    else if (value === 'registre') router.push({ name: 'environment-comp', params: { id: route.params.id, feature: value } })
    else emit("reset-action") // if unknown redirection 
}

function submitForm() {
    emit("submit-form") // TODO: need to update it when you need to POST/STORE data
}

function handleClick($event: any) {
    emit("set-active-display", $event);
}
</script>
<style lang="scss" scoped>
.redirection {
    &__sub-title {
        @screen md {
            @apply text-center block;
        }
    }

    &__btn-container {
        @apply flex gap-x-[18px] justify-center py-4;
    }
}

.contact {
    &__container {
        @apply py-3 px-2.5 text-center rounded;
        background-color: var(--color-gray);
    }

    &__sub-title {
        @apply w-full font-semibold inline-block text-center;
        color: var(--color-primary);
    }

    &__contact {
        @apply italic block py-2.5;
    }

    &__list {
        @apply flex flex-col;

        @screen md {
            @apply w-2/3 mx-auto;
        }
    }
}

.info {
    &__container {
        @apply py-3 px-2.5 rounded;
        background-color: var(--color-gray);
    }
}

.form {
    &__container {
        @apply flex flex-col justify-center;
    }

    &__label {
        @apply block mb-4;
    }

    &__input-container {
        @apply w-full flex flex-col gap-x-2;

        @screen md {
            @apply flex-row;
        }
    }

    &__input {
        @apply w-full mx-auto mb-4;

        @screen md {
            @apply w-1/2;
        }
    }

    &__confirm-btn {
        @apply mx-auto;
    }
}

.menu {
    &__collapse {
        @apply flex flex-col gap-[14px];

        &:deep() {
            .ant-collapse-item {
                .anticon {
                    transform: rotate(90deg) translateX(-50%);
                }

                &.ant-collapse-item-active {
                    .anticon {
                        transform: rotate(180deg) translateY(50%);
                    }
                }

                .ant-collapse-header {
                    @apply rounded-[8px] border-gray border-solid border-[1px] font-[600];
                }
            }

            .ant-collapse-content {
                width: calc(100% - 24px);
                @apply relative float-right;

                &::before {
                    content: '';
                    @apply absolute left-0 top-0 w-[1px] h-full bg-gray;
                }
            }
        }

        &-content {
            @apply flex flex-col gap-[8px];
        }

        &-item {
            @apply text-primary text-[12px] font-[600];

            &:hover {
                @apply text-grayIcon;
            }
        }
    }
}
</style>