<template>
    <div class="boilerReplace__authorization">
        <div class="boilerReplace__authorization-nav">
            <ArrowBack @click="$emit('prev')" />
            <Paragraphe>Autorisation de responsable</Paragraphe>
        </div>
        <hr class="separator" />
        <div class="boilerReplace__message">
            <Paragraphe class="message-title"
                >Demandez par écrit l’autorisation à l’autorité compétente avant
                de remplacer la chaudière
            </Paragraphe>
            <div class="boilerReplace__alert">
                <Warning />Attendez toujours l’autorisation officielle pour
                procéder à ces changements.
            </div>

            <div class="boilerReplace__btn">
                <Button>Envoyer un demande</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import Warning from '@/components/Icon/Warning.vue';
</script>

<style scoped lang="scss">
    .boilerReplace {
        &__authorization {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__authorization-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }

        &__alert {
            @apply my-[5px] bg-[var(--color-gray)] p-[6px] rounded-[4px] italic;
        }
    }

    .separator {
        @apply my-[15px];
    }

    .message-title {
        @apply font-medium;
    }
</style>
