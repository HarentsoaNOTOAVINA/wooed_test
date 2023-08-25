<template>
    <div class="boilerPlugGreen">
        <Paragraphe
            >La chaudière peut continuer à être exploitée Conservez le rapport
            de contrôle dans votre carnet de bord .</Paragraphe
        >
        <Button theme="light">Accéder au   « carnet de bord » </Button>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
</script>

<style scoped lang="scss">
    .boilerPlugGreen {
        &:deep() {
            Button {
                @apply font-normal text-black mt-[25px];
            }
        }
    }
</style>
