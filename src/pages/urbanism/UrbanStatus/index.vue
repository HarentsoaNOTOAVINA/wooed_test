<template>
    <div class="urbanismeStatus">
        <Title
            class="urbanismeStatus__title"
            type="p"
            label="Statut urbanistique de mon bien"
        />
        <hr class="separator" />
        <Title
            class="urbanismeStatus__subTitle"
            type="p"
            label="Le bien se situe"
        />
        <hr class="separator" />

        <!--Affichage selon region-->

        <BrusselStatus
            v-if="idRegion === 1"
            :thePropertyId="idTheproperty"
            :regionId="idRegion"
        />
        <FlandreStatus v-else-if="idRegion === 2" />
        <WalonieStatus v-else-if="idRegion === 3" />
        <div class="urbanismeStatus__noResult" v-else>
            <a-alert
                message="Desoler"
                description="Votre bien ne se trouve pas dans une region qui contient un status urbanistique."
                type="warning"
                show-icon
            />
            <Button
                class="urbanismeStatus__btn"
                @on-click="gotoSelectPropertyUrban"
                >Retour</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import BrusselStatus from './BrusselStatus.vue';
    import FlandreStatus from './FlandreStatus.vue';
    import WalonieStatus from './WalonieStatus.vue';
    import { onMounted, computed, ref } from 'vue';
    import { Alert as AAlert } from 'ant-design-vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { Store, useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';

    const store: Store<any> = useStore();
    let router = useRouter();
    let route = useRoute();

    let idRegion = ref<number>(0);
    let detailProperty = ref<any>();
    let idTheproperty = ref<any>();

    onMounted(() => {
        idTheproperty.value = route.params.id;
        getDetailPropertyClicked();
        console.log(detailProperty.value.region, 'REGION');
        console.log(idTheproperty.value, 'theProperty');
    });

    function getDetailPropertyClicked() {
        detailProperty = computed(
            () => store.getters['UrbanismeModule/getPropertyDetail'][0]
        );

        switch (detailProperty.value.region) {
            case 'Bruxelles-Capitale':
                idRegion.value = 1;
                break;
            case 'Flandre':
                idRegion.value = 2;
                break;
            case 'Wallonie':
                idRegion.value = 3;
                break;

            default:
                break;
        }
    }

    function gotoSelectPropertyUrban() {
        router.push({ name: 'urbanism' });
    }
</script>

<style scoped lang="scss">
    .urbanismeStatus {
        // position: relative;
        &__title {
            @apply mb-[15px] font-semibold;
        }

        &__subTitle {
            @apply text-[var(--color-primary)] mb-[10px];
        }

        &__btn {
            @apply my-[10px];
        }
    }

    .btn {
        @apply text-center;
    }
</style>
