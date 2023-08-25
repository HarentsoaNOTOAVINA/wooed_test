<template>
    <div>
        <RegulationComp
            v-if="region == 'Wallonie'"
            :dataRegulationMaintainsTank="regulationMaintainsBoilerWallonie"
            @prev="$emit('prev')"
        />

        <RegulationComp
            v-else-if="region == 'Flandre'"
            class="regulationFlandre"
            :dataRegulationMaintainsTank="regulationMaintainsBoilerFlandre"
            @prev="$emit('prev')"
        />

        <RegulationComp
            v-else-if="region == 'Bruxelles-Capitale'"
            class="regulationBrussel"
            :dataRegulationMaintainsTank="regulationMaintainsBoilerBrussel"
            @prev="$emit('prev')"
        >
            <template #SlotrequiredAction>
                <Paragraphe class="mb-3"
                    >Pour plus d'info au "Arrêté du Gouvernement de la Région de
                    Bruxelles-Capitale relatif aux exigences PEB applicables aux
                    systèmes de chauffage et aux systèmes de climatisation pour
                    le bâtiment lors de leur installation et pendant leur
                    exploitation ":
                    <a
                        class="font-semibold"
                        href="https://environnement.brussels/sites/default/files/user_files/agbr_20180621_exigencesit_vcoord_clean.pdf"
                        target="_blank"
                        >Cliquez ici</a
                    ></Paragraphe
                >
                <Paragraphe
                    >Pour plus d'info au "Arrêté du Gouvernement de la Région de
                    Bruxelles-Capitale relatif au contrôle et à l'entretien des
                    systèmes de chauffage et de climatisation et à l'agrément
                    des personnes qui réalisent ces actes ":
                    <a
                        class="font-semibold"
                        href="https://etaamb.openjustice.be/fr/arrete-du-gouvernement-de-la-region-de-bruxellescapit_n2018012980.html"
                        target="_blank"
                        >Cliquez ici</a
                    ></Paragraphe
                >
            </template>
        </RegulationComp>

        <div class="alert" v-else>
            <div class="regulation__header">
                <div class="regulation__back" @click="$emit('prev')">
                    <BackButton />
                </div>
                <Paragraphe class="regulation__title"
                    >Règlementation</Paragraphe
                >
            </div>
            <hr class="separator" />
            <a-alert
                message="Les reglementation sont seulement pour 'Bruxelles-capitale, Flandre, et Wallonie'"
                type="info"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import RegulationComp from '../../Components/RegulationComp.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { regulationMaintainsBoilerWallonie } from './dataBoiler/regulationMaintainsBoilerWallonie';
    import { regulationMaintainsBoilerFlandre } from './dataBoiler/regulationMaintainsBoilerFlandre';
    import { regulationMaintainsBoilerBrussel } from './dataBoiler/regulationMaintainsBoilerBrussel';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import AAlert from 'ant-design-vue/lib/alert';
    import { onMounted, computed, ref } from 'vue';
    import { useStore } from 'vuex';

    const emit = defineEmits(['component', 'prev']);

    const store = useStore();
    let detailProperty = ref<any>();
    let region = ref<string>();

    onMounted(() => {
        getPropertyDetailSelected();
    });

    function getPropertyDetailSelected() {
        detailProperty = computed(
            () => store.getters['UrbanismeModule/getPropertyDetail']
        );
        region.value = detailProperty.value[0].region;
        console.log(region.value, 'Salut salut salut');
    }
</script>

<style scoped lang="scss">
    .plaque {
        @apply mt-[25px] p-[8px] rounded-[8px];
        border: 1px solid var(--color-gray);

        &__title {
            @apply text-center;
        }
        &__card-content {
            @apply flex gap-[5px] flex-wrap mt-[8px];
        }
        &__card {
            @apply bg-[var(--color-gray)] p-[8px] rounded-[8px];

            @screen lg {
                flex: 1;
            }
        }
    }

    .regulation__header {
        @apply flex items-center mb-[10px];
    }
</style>
