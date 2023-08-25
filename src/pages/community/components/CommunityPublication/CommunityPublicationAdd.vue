<script lang="ts" setup>
    import avatar from 'ant-design-vue/lib/avatar';
    import Textarea from 'ant-design-vue/lib/input/TextArea';
    import Card from '@/components/Display/Card/Card.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { Collapse, CollapsePanel } from 'ant-design-vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { ref, inject } from 'vue';
    const isButtonShare = ref<boolean>(false);
    // const { Panel } = ACollapse;

    const typeView = inject<string>('typeView');

    enum TypeForm {
        IMAGE = 'image', 
        ANIMAL = 'animal',
        PARTY = 'party',
        SERVICE = 'serviceHelp',
        GROUPBUY = 'groupBuy',
        SELLOBJECT = 'sellObject',
        PENDAISON = 'pendaison',
        BROCANTE = 'brocante',
        PLP = 'plp'
    }

    interface IAdd {
        id: number;
        label: string;
        name: string;
        iconName: string;
        typeView?: string;
    }

    const addItem: IAdd[] = [
        {
            id: 0,
            label: 'Image',
            name: TypeForm.IMAGE,
            iconName: 'Picture',
            typeView: 'all',
        },
        {
            id: 1,
            label: 'Animaux perdus',
            name: TypeForm.ANIMAL,
            iconName: 'Animal',
            typeView: 'otherService',
        },
        {
            id: 2,
            label: 'Fête du quartier',
            name: TypeForm.PARTY,
            iconName: 'PartyPopper',
            typeView: 'otherService',
        },
        {
            id: 3,
            label: 'Plp',
            name: TypeForm.PLP,
            iconName: 'PartyPopper',
            typeView: 'otherService',
        },
        {
            id: 4,
            label: "Demande d'aide",
            name: TypeForm.SERVICE,
            iconName: 'PartyPopper',
            typeView: 'otherService',
        },
        {
            id: 5,
            label: 'Achat groupés',
            name: TypeForm.GROUPBUY,
            iconName: 'PartyPopper',
            typeView: 'otherService',
        },
        {
            id: 6,
            label: "Ventes d'objets",
            name: TypeForm.SELLOBJECT,
            iconName: 'PartyPopper',
            typeView: 'otherService',
        },
        {
            id: 7,
            label: 'Pendaison de crémaillère',
            name: TypeForm.PENDAISON,
            iconName: 'PartyPopper',
            typeView: 'otherService',
        },
        {
            id: 8,
            label: 'Brocante',
            name: TypeForm.BROCANTE,
            iconName: 'PartyPopper',
            typeView: 'otherService',
        },
    ];

    const emit = defineEmits<{
        (event: 'click', value: string): void;
    }>();

    const handlePublication = function (type: string) {
        console.log('tonga ato za');
        emit('click', type);
    };

    const handleChangeTextarea = (e: any) => {
        console.log('tonga ato', e.target.value);
        isButtonShare.value = !e.target.value ? false : true;
    };
</script>

<template>
    <Card class="add-publication">
        <div class="add-publication__items">
            <avatar src="https://joeschmoe.io/api/v1/random" :size="40" />
            <div class="add-publication__item--field">
                <Textarea
                    :autoSize="{ minRows: 1, maxRows: 4 }"
                    placeholder="Ecrivez..."
                    name="addPublication"
                    @change="handleChangeTextarea"
                />
                <Transition appear name="fade-step" mode="out-in">
                    <div v-if="isButtonShare" class="add-publication__button">
                        <Button type-button="secondary">Publier</Button>
                    </div>
                </Transition>
                <!-- <Icon icon-name="FaceIcon" /> -->
            </div>
        </div>
        <hr class="__hr" />
        <div class="add-publication__media">
            <div class="add-publication__media--wrap">
                <Collapse ghost>
                    <template #expandIcon>
                        <Icon icon-name="CategoryOutline" />
                    </template>
                    <collapse-panel
                        class="add-publication__media--panel"
                        header="Publier"
                    >
                        <div class="add-publication__media--item">
                            <div
                                v-for="item in addItem"
                                :key="item.id"
                                @click="handlePublication(item.name)"
                            >
                                <div
                                    class="add-publication__media--upload"
                                    v-if="
                                        item.typeView === typeView ||
                                        item.typeView === 'all'
                                    "
                                >
                                    <Icon :icon-name="item.iconName" />
                                    <span>{{ item.label }}</span>
                                </div>
                            </div>
                        </div>
                    </collapse-panel>
                </Collapse>
            </div>
        </div>
    </Card>
</template>

<style lang="scss" scoped>
    .add-publication {
        @apply flex flex-col gap-y-[14px];
        &__items {
            @apply flex gap-x-[12px];
        }
        &__item--field {
            width: calc(100% - 40px);
            @apply relative flex flex-col gap-y-[10px];
            &:deep() {
                .textarea:hover {
                    border: solid var(--color-primary) 1px;
                    box-shadow: none;
                }
                .ant-input {
                    @apply bg-gray rounded-[24px] text-[12px];
                    // @apply bpr-[34px];
                }
                .ant-input:hover {
                    border: solid var(--color-primary) 1px;
                    box-shadow: none;
                }
                .ant-input:focus {
                    border: solid var(--color-primary) 1px;
                    box-shadow: none;
                }
                .icon {
                    @apply absolute right-[10px] bottom-[50%] transform translate-y-[50%] cursor-pointer;
                    path {
                        @apply transition;
                    }
                    &:hover {
                        path {
                            @apply stroke-primary transition;
                        }
                    }
                }
            }
        }
        &__button {
            @apply flex justify-end;
        }
        &__media {
            @apply flex justify-between gap-[18px];
        }
        &__media--wrap {
            @apply flex flex-col gap-[18px];
        }
        &__media--item {
            @apply flex flex-wrap gap-x-[18px] gap-y-[5px];
        }
        &__media--upload {
            @apply font-[600];
        }
        &__media--upload,
        &__audience--item {
            @apply flex items-center gap-x-[8px] cursor-pointer;
            &:hover {
                @apply text-primary transition;
                &:deep() {
                    svg path {
                        @apply fill-primary transition;
                    }
                }
            }
        }
        &__media--panel {
            @apply font-[600];
            &.ant-collapse-item-active {
                &:deep() {
                    .ant-collapse-header {
                        @apply text-primary;
                    }
                    svg {
                        path {
                            @apply fill-primary;
                        }
                    }
                }
            }
            &:deep() {
                .ant-collapse-header .ant-collapse-arrow {
                    @apply mr-[4px];
                }
                .ant-collapse-header,
                .ant-collapse-content-box {
                    @apply p-0;
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }

    .fade-step-enter-active,
    .fade-step-leave-active {
        transition: all 0.3s ease-in-out;
        max-height: 230px;
    }

    .fade-step-enter-from,
    .fade-step-leave-to {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0px;
    }
</style>
