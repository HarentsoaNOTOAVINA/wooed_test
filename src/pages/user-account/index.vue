<template>
    <ProfilPrototype
        :AsideMenuProps="AsideMenu"
        :DefaultMenu="defMenu"
        :defaultMenuLabel="defLabel"
    />
</template>
<script lang="ts" setup>
    import { useStore } from 'vuex';
    import { computed, onBeforeMount, onMounted, ref, shallowRef } from 'vue';
    import AsideMenu from './Menu/AsideMenu/AsideMenu.vue';
    import InfoPlus from './Menu/InfoPlus.vue';
    import UserPublication from './Menu/UserPublication/UserPublication.vue';
    import { useRoute, useRouter } from 'vue-router';
    import ProfilPrototype from './ProfilPrototype/ProfilPrototype.vue';
    import { MENU_LIST } from './Menu/AsideMenu/account.data';

    const route = useRoute();
    const router = useRouter();

    const store = useStore();
    const userLoggedIn = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    
    const defMenu = shallowRef<any>(null);
    const defLabel = shallowRef('');
    const isSlugValid = computed(
        () =>
            `${userLoggedIn.value.name.toLowerCase()}-${userLoggedIn.value.firstname.toLowerCase()}` ===
            route.params.user
    );
    onMounted(() => {
        !isSlugValid.value && router.push({ name: 'not-found' });
    });
    onBeforeMount(() => {
        const selectedMenu =
            store.getters['AccountMenuSelectedModule/getSelectedMenu'];
        if (selectedMenu) {
            MENU_LIST.forEach((item) => {
                if (item.label === selectedMenu) {
                    defMenu.value = item.value;
                    defLabel.value = selectedMenu;
                }
            });
        }
        
        else {
            defMenu.value = UserPublication;
            defLabel.value = 'Mes annonces';
        }
    });
</script>

<style lang="scss" scoped></style>
