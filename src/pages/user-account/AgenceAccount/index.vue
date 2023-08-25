<template>
    <ProfilPrototype
        :AsideMenuProps="Aside"
        :DefaultMenu="InfoPlus"
        defaultMenuLabel="Liste des publications"
    />
</template>
<script lang="ts" setup>    import Aside from './Aside/Aside.vue';
    import InfoPlus from '../Menu/InfoPlus.vue';

    import ProfilPrototype from '../ProfilPrototype/ProfilPrototype.vue';

  
</script>

<style lang="scss" scoped></style>
