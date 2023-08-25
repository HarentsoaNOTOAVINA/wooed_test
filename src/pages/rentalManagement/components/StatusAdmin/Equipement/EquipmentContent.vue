<template>
    <li>
        <div class="equipment__content">
            <span class="equipment__label">
                {{ itemData.label }}
            </span>
            <div class="equipment__icon">
                <Icon
                    icon-name="ArrowBottom"
                    title="Voir code du logement"
                    @click="showCode"
                    :class="
                        isShowCode ? 'transform rotate-180' : 'transition-all'
                    "
                />
                <Icon
                    icon-name="deleteRoudedBG"
                    @click="removeEquipment(itemData.label, index)"
                    title="Supprimer"
                />
            </div>
        </div>
        <Transition appear name="fadeHeight" mode="out-in">
            <div v-if="isShowCode" class="equipment__code place-content-10px">
                <Title
                    type="h4"
                    label="Code du Logement"
                    class="equipment__title"
                />
                <hr class="__hr" />

                <div class="equipment__codeHousing">
                    <template v-for="(codeLog, i) in itemData.content">
                        <Paragraphe
                            class="equipment__codeHousing-title"
                            v-html="codeLog.text"
                        ></Paragraphe>
                        <Paragraphe
                            v-if="isNotObjectType(codeLog.content)"
                            class="equipment__codeHousing-content"
                            v-html="codeLog.content"
                        ></Paragraphe>
                        <Paragraphe
                            v-else
                            class="equipment__codeHousing-content"
                            >Aucun</Paragraphe
                        >
                    </template>
                </div>
            </div>
        </Transition>
    </li>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { ref } from 'vue';

    const props = defineProps({
        itemData: {
            type: Object,
            default: {},
        },
        index: {
            type: Number,
            default: 0,
        },
    });

    const isShowCode = ref<boolean>(false);

    const emit = defineEmits<{
        (event: 'on-click-remove', value: string, index: number): void;
    }>();

    function removeEquipment(value: string, index: number) {
        emit('on-click-remove', value, index);
    }

    function showCode() {
        isShowCode.value = !isShowCode.value;
    }

    function isNotObjectType(content: any) {
        return typeof content !== 'object';
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .equipment {
        @apply w-full;
        &__label {
            @apply font-[600];
        }
        &__icon {
            @apply flex items-center gap-[14px];
        }
        &__content {
            @apply flex justify-between items-center px-[8px] py-[4px] bg-gray rounded-[4px];
            &:deep() {
                .icon {
                    @apply cursor-pointer;
                    &:hover {
                        svg path {
                            @apply fill-primary;
                        }
                    }
                }
            }
        }
        &__code {
            @apply relative pl-[15px] ml-[20px];
            &:after {
                content: '';
                @apply absolute left-0 top-0 h-full w-[2px] bg-gray;
            }
        }
        &__title {
            @apply text-[14px] font-[600] text-grayIcon mt-[10px];
        }

        &__codeHousing {
            @apply max-h-[320px] overflow-auto;
            @include scrollbar;

            &-title {
                @apply text-[var(--color-primary)] my-2 bg-[var(--color-gray)] p-4 rounded-[5px] mr-1 font-bold;
            }
            &-content {
                @apply text-[var(--color-secondary)] mb-4;
            }
        }
    }

    .equipment__codeHousing:global(ol) {
        list-style: disc; /* Type de puce : disque plein */
        margin-left: 20px; /* Marge à gauche pour l'indentation */
        padding-left: 10px;

        li {
            margin-bottom: 5px; /* Espacement entre les éléments de la liste */
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
