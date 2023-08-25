<template>
    <div class="account__aside-menu__wrapper">
        <div class="account">
            <div class="account__profil">
                <!-- photo header -->
                <div class="account__profil__photo__wrapper">
                    <div class="account__profil__go-back">
                        <ArrowBack @click="goBackHandler" />
                    </div>
                    <figure class="account__profil__photo__content">
                        <div class="img-container">
                            <img
                                v-if="agencyData.logo"
                                :src="agencyData.logo"
                                alt="photo-de-profil"
                                />
                                <!-- :src="@/static/images/bg-suggestion-card.png" -->
                            <div v-else class="img-container__empty-logo">
                                <User size="lg" />
                            </div>
                        </div>
                    </figure>
                    <Title type="h2" :label="agencyData.name" />
                    <Paragraphe> {{ agencyData.email }} </Paragraphe>
                </div>

                <!-- profil details -->

                <div class="account__profil__details">
                    <div class="account__profil__details__row">
                        <Title label="Adresse" type="h2" />
                        <Paragraphe>{{ agencyData.address }}</Paragraphe>
                    </div>
                    <hr />
                    <div class="account__profil__details__row">
                        <Title label="Nombre de Personnel" type="h2" />
                        <Paragraphe>{{ agencyData.personalNumber }}</Paragraphe>
                    </div>
                    <hr />
                    <div class="account__profil__details__row">
                        <Title label="N° TVA" type="h2" />
                        <Paragraphe>{{ agencyData.tva }}</Paragraphe>
                    </div>
                    
                </div>
            </div>
            <hr class="mt-[20px]" />
            <div class="account__menu">
                <ul>
                    <li
                        @click="$emit('on-click-menu', menu)"
                        v-for="(menu, index) in MENU_LIST"
                        :key="index"
                        :class="{
                            'active-menu': currentLabelMenu === menu.label,
                        }"
                    >
                        <component :is="menu.icon" />
                        <Title :label="menu.label" type="h3" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { MENU_LIST } from './agence.data';
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    import User from '@/components/Icon/User.vue';
    /**styles */
    import '@/assets/style/userprofil.scss';
    import { useRouter } from 'vue-router';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';

    const router = useRouter();

    defineProps<{
        currentLabelMenu: string;
    }>();

    const store = useStore();

    const agencyData = computed(
        () => store.getters['AgenceModule/getSelectedAgence']
    );

    function goBackHandler() {
        router.go(-1);
    }
</script>

<style lang="scss" scoped></style>
