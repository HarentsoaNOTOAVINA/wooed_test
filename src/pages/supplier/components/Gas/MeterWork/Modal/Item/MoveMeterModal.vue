<template>
    <div class="">
        <Paragraphe
            ><b><u>PREMIERE ETAPE:</u></b> Il convient d’abord de remplir le
            formulaire suivant
            <u
                ><a
                    class="text-[var(--color-primary)]"
                    href="https://www.fluvius.be/sites/fluvius/files/2021-07/9000473-checklist-correcte-werking-analoge-meter.pdf"
                    >https://www.fluvius.be/sites/fluvius/files/2021-07/9000473-checklist-correcte-werking-analoge-meter.pdf</a
                ></u
            ></Paragraphe
        >
        <Paragraphe>
            <b><u>SECONDE ETAPE:</u></b>
        </Paragraphe>
        <ul class="list">
            <li>SOIT appelez le <span class="text-[var(--color-primary)]">078 35 35 34</span></li>
            <li>SOIT introduisez <a class="text-[var(--color-primary)]" href="https://klachten.eandis.be/Klacht.aspx" target="_blank"><u>une plainte</u></a></li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
</script>
<style lang="scss" scoped>
    .list {
        @apply list-disc pl-[30px];
    }
</style>
