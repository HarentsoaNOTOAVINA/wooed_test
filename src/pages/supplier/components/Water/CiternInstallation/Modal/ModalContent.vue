<template>
    <div class="modal__content">
        <Paragraphe
            ><strong>Message: </strong
            ><span
                >Je souhaiterai mettre une citerne d'eau de pluie à l'endroit
                marqué ci-dessous. Auriez-vous l'aimabilité de bien vouloir me
                donné votre accord. Sauriez-vous interessé de participer au cout
                de sa construction. Merci.</span
            ></Paragraphe
        >
        <br>
        <Paragraphe
            ><strong>Evoyé à:</strong>
            <ul class="text-primary modal__content__user-list">
                <li v-for="(item, index) in neighborDetailsList" :key="index">
                    <span><User />{{ item.name || 'N/A' }}</span
                    ><span><EmailOutline /> {{ item.email || 'N/A' }}</span>
                    <span><InfoPhone /> {{ item.phone || 'N/A' }}</span>
                </li>
            </ul></Paragraphe
        >
        <div class="modal__content__btn">
            <Button @click="$emit('on-submit')" :is-load="isLoadSubmit">Envoyer</Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import EmailOutline from '@/components/Icon/EmailOutline.vue';
    import InfoPhone from '@/components/Icon/InfoPhone.vue';
    import User from '@/components/Icon/User.vue';
    import { ref } from 'vue';

    defineProps<{
        neighborDetailsList: any;
        isLoadSubmit: boolean;
    }>();
</script>
<style lang="scss" scoped>
    .modal {
        &__content {
            &:deep() {
                p {
                    @apply flex items-start;
                    strong {
                        @apply w-[20%];
                    }
                    span,
                    ul {
                        @apply w-full;
                    }
                    ul {
                        @apply pl-[20px] list-[circle];
                    }
                }
            }
            &__user-list {
                @apply flex flex-col;
                span {
                    @apply flex items-center gap-[10px];
                }
                li:not(:last-child) {
                    @apply border-b border-b-[var(--color-grayBlack)] pb-[10px] mb-[20px];
                }
            }
            &__btn {
                @apply flex justify-end mt-[10px];
                &:deep() {
                    div,
                    button {
                        @apply w-full;
                    }
                    div {
                        @apply md:w-auto;
                    }
                }
            }
        }
    }
</style>
