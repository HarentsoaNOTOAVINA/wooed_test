<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { ref } from 'vue';
    import ContactAgent from './ContactAgent.vue';

    const partChoice = ref<string>('');

    const emit = defineEmits<{
        (e: 'handle-click', value: any): void;
    }>();

    function handleClick(e: string) {
        switch (e) {
            case 'callPro':
                partChoice.value = e;
                break;
            case 'manual':
                emit('handle-click', e);
                break;
            default:
                break;
        }
    }

    function goBack() {
        partChoice.value = '';
    }
</script>
<template>
    <div class="add__content-part">
        <ContactAgent v-if="partChoice === 'callPro'" @back="goBack" />
        <div class="add__container" v-else>
            <div class="add__header">
                <Title
                    type="h6"
                    weight="600"
                    label="Vendre un bien"
                    class="title"
                />
                <hr class="__hr" />
                <div class="btn" @click="handleClick('callPro')">
                    <Paragraphe
                        >Je souhaite faire appel à un professionnel pour
                        la vente de mon bien
                    </Paragraphe>
                </div>
                <div class="btn" @click="handleClick('manual')">
                    <Paragraphe
                        >Je souhaite vendre le bien via les services de
                        l’application
                    </Paragraphe>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .__hr {
        @apply text-gray w-full;
    }
    .__red {
        color: var(--color-warn);
    }
    .__green {
        color: var(--color-green);
    }
    .add {
        &__content-part {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            @apply bg-[white] rounded-[8px] p-[10px] md:p-[24px] sm:w-[100%] lg:w-[893px] mt-[10px] md:mt-[20px] overflow-y-auto mx-auto;
        }
        &__btn-foot {
            @apply flex gap-[15px];
        }
        &__footer {
            border-top: 1px solid var(--color-gray);
            @apply pt-[15px] mt-[15px] flex justify-between items-center;
        }
        &__title {
            font-weight: 600;
        }
        &__divider {
            @apply my-[18px];
        }
        &__particular-mode {
            line-height: 2rem;
        }
        &__header {
            @apply flex flex-col gap-[18px];
        }
    }
    .btn {
        @apply rounded-[8px] p-[10px];
        border: 0.5px solid var(--color-gray);
        cursor: pointer;
        :hover {
            @apply text-primary;
        }
    }
</style>
