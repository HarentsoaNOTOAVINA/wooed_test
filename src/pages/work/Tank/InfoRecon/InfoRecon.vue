<template>
    <div class="work">
        <Title :color="headTxtColor" type="h3"
            >Dans la déclaration de conformité, Bruxelles-Environnement
            détermine, sur base des conclusions de la reconnaissance de l'état
            du sol :</Title
        >
        <ul v-for="item in listPuceConforme">
            <li class="work__listStyle">{{ item }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';

    const headTxtColor:string = "var(--color-primary)";
    const listPuceConforme = [
        "le délai dans lequel l'étude détaillé, l'étude de risque ou le projet de gestion du risque ou le projet d'assainissement doit, le cas écheant, lui etre notifié",
        'Le ou les types de pollutions',
        "Le cas échéant, les mesures d'urgences à prendre ",
    ];
</script>

<style lang="scss" scoped>
    .work {
        &__listStyle {
            @apply ml-[28px];
            list-style-type: disc;
        }
    }
</style>
