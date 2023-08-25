<template>
    <div class="powerMore__container">
        <div class="powerMore__section">
            <RegulationComp
                titleComp="Contrôle périodique"
                class="powerMore"
                :dataRegulationMaintainsTank="dataControlPeriodic"
                @prev="$emit('prev')"
            >
                <template #SlotTop>
                    <Paragraphe class="obligation"
                        >Voir les obligations de l'utilisateur
                        <Info
                            class="cursor-pointer"
                            @click="showObligation = !showObligation"
                    /></Paragraphe>

                    <div class="obligation-content" v-if="showObligation">
                        <Paragraphe class="font-semibold"
                            >L'utilisateur de l'installation de chauffage
                            central:
                        </Paragraphe>
                        <ol class="order-list">
                            <li>
                                utilise exclusivement le combustible pour lequel
                                l'installation a été construite et réglée;
                            </li>
                            <li>
                                veille à maintenir l'installation dans un état
                                de fonctionnement tel que l'impact de son
                                utilisation sur l'environnement et le risque
                                encouru par les personnes soit aussi faible que
                                possible;
                            </li>
                            <li>
                                 respecte les instructions d'utilisation et
                                d'entretien des fabricants des éléments
                                constituant l'installation de chauffage central;
                            </li>
                            <li>
                                fait réaliser ( les entretiens et – AGW du 18
                                juin 2009, art. 5, al 1er) les contrôles
                                périodiques conformément aux dispositions de
                                l'article 13;
                            </li>
                            <li>
                                conserve le dossier chauffage central et le
                                tient à la disposition du fonctionnaire chargé
                                de la surveillance;
                            </li>
                            <li>
                                remet au propriétaire le dossier de chauffage
                                central dès qu'il cesse d'en être l'utilisateur;
                            </li>
                            <li>
                                fournit sans délai au propriétaire (
                                l'attestation de contrôle périodique – AGW du 18
                                juin 2009, art. 5, al 2) à la demande de
                                celui-ci (art. 10)
                            </li>
                        </ol>
                    </div>
                </template>

                <template #SlotrequiredAction
                    ><Paragraphe class="font-bold mb-2"
                        >Arrêté du Gouvernement wallon tendant à prévenir la
                        pollution atmosphérique provoquée par les installations
                        de chauffage central destinées au chauffage de bâtiments
                        ou à la production d'eau chaude sanitaire et à réduire
                        leur consommation énergétique, art. 8)
                    </Paragraphe>
                    <Paragraphe
                        > Est réputée en bon état de fonctionnement une
                        installation de chauffage central qui répond aux
                        critères définis à l'
                        <a
                            class="text-link"
                            href="https://wallex.wallonie.be/files/medias/2/6574.pdf"
                            target="_blank"
                            >annexe II</a
                        >
                        .
                    </Paragraphe>
                </template>
            </RegulationComp>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { onMounted, ref } from 'vue';
    import RegulationComp from '../../Components/RegulationComp.vue';
    import { dataControlPeriodic } from './dataBoiler/dataControlPeriodic';
    import Info from '@/components/Icon/Info.vue';

    const emit = defineEmits(['component', 'prev']);
    const windowWidth = ref<any>(window.innerWidth);
    let showObligation = ref<boolean>(false);

    onMounted(() => {
        resize();
    });

    function prev() {
        emit('prev');
    }

    function resize() {
        window.onresize = () => {
            windowWidth.value = window.innerWidth;
        };
    }
</script>

<style lang="scss" scoped>
    .obligation {
        @apply flex items-center gap-[15px] font-bold;
    }

    .order-list {
        @apply list-decimal p-[15px];
    }
    .powerMore {
        @apply p-0;
    }
    .text-link {
        @apply text-[var(--color-link)] underline;
    }
</style>
