<template>
    <div class="boilerInstallation__regulation">
        <div class="boilerInstallation__regulation-nav">
            <ArrowBack @click="$emit('prev')" />
            <Paragraphe>Règlementation</Paragraphe>
        </div>
        <hr class="separator" />

        <div class="boilerInstallation__content">
            <div class="boilerInstallation__content-title">
                <Paragraphe class="title"
                    >Arrêté du Gouvernement de la Région de Bruxelles-Capitale
                    relatif aux exigences PEB applicables aux systèmes de
                    chauffage et aux systèmes de climatisation pour le bâtiment
                    lors de leur installation et pendant leur exploitation
                </Paragraphe>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
</script>

<style scoped lang="scss">
    .boilerInstallation {
        &__regulation {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__regulation-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }
    }

    .title {
        @apply text-justify;
    }

    .separator {
        @apply my-[15px];
    }
</style>
