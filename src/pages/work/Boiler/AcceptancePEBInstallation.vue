<template>
    <div class="boilerInstallation__receptionPEB">
        <div class="boilerInstallation__receptionPEB-nav">
            <ArrowBack @click="$emit('prev')" />
            <Paragraphe>Réception PEB de l’installation </Paragraphe>
        </div>
        <hr class="separator" />
        <div class="boilerInstallation__receptionPEB-content">
            <Important />
            <Paragraphe
                >Elle doit avoir lieu
                <span class="significant"
                    >AU PLUS TARD 1 mois après la mise en service
                </span></Paragraphe
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import Important from '@/components/Icon/Important.vue';
</script>

<style scoped lang="scss">
    .boilerInstallation {
        &__receptionPEB {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__receptionPEB-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }

        &__receptionPEB-content {
            @apply bg-[var(--color-gray)] rounded-[8px] p-[10px];
        }
    }

    .significant {
        @apply font-semibold;
    }
    .separator {
        @apply my-[15px];
    }
</style>
