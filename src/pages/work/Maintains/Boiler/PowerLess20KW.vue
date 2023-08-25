<template>
    <div class="powerMore__container">
        <div class="powerMore__section">
            <RegulationComp
                titleComp="Puissance moins de 20KW"
                class="powerMore"
                @prev="$emit('prev')"
            >
                <template #SlotTop>
                    <div class="info-content">
                        <a-alert
                            message="L’entretien n’est pas obligatoire mais recommandé "
                            type="info"
                            show-icon
                        />
                    </div>
                    <Paragraphe class="obligation"
                        >Voir les obligations de l'utilisateur
                        <Info
                            class="cursor-pointer"
                            @click="showObligation = !showObligation"
                    /></Paragraphe>
                    <div class="obligation-content" v-if="showObligation">
                        <Paragraphe class="font-semibold text-justify"
                            >Arrêté du Gouvernement de la Région de
                            Bruxelles-Capitale relatif au contrôle et à
                            l'entretien des systèmes de chauffage et de
                            climatisation et à l'agrément des personnes qui
                            réalisent ces actes
                        </Paragraphe>
                        <ol class="order-list">
                            <p class="mb-[10px]">
                                Art. 4.1.1 Le propriétaire, le titulaire ou le
                                déclarant respecte les obligations suivantes :
                            </p>
                            <li>
                                il respecte les exigences définies dans l'arrêté
                                Exigences chauffage-climatisation PEB
                                applicables au système de chauffage,
                            </li>
                            <li>
                                il fait réaliser les actes prévus aux chapitres
                                2 du présent arrêté
                            </li>
                            <li>
                                il respecte l'injonction d'arrêter une chaudière
                                ou un chauffe-eau lors d'un contrôle périodique
                                PEB d'une chaudière ou d'un chauffe-eau, d'une
                                réception PEB ou d'un diagnostic PEB d'un
                                système de chauffage, donnée par un technicien
                                chaudière PEB ou un conseiller chauffage PEB
                                conformément au protocole décrit à l'annexe 3;
                            </li>
                            <li>
                                le cas échéant il fournit, gratuitement aux
                                occupants de l'unité PEB sur simple demande: a)
                                une copie de la dernière attestation de contrôle
                                périodique PEB b) une copie de l'attestation de
                                réception PEB c) une copie du dernier rapport de
                                diagnostic PEB d) une copie des rapports de
                                comptabilité énergétique
                            </li>
                            <li>
                                il fait mettre en oeuvre le programme minimum
                                d'entretien des systèmes de chauffage et de
                                climatisation;
                            </li>
                            <li>
                                il respecte un délai de cinq mois à dater de la
                                réception PEB, du contrôle périodique PEB ou du
                                diagnostic chauffage PEB pour mettre le système
                                de chauffage, la chaudière ou le chauffe-eau en
                                conformité et obtenir une attestation de
                                réception PEB, une attestation de contrôle
                                périodique PEB ou un rapport de diagnostic
                                chauffage PEB qui démontre la mise en conformité
                            </li>
                            <li>
                                il respecte un délai de douze mois à dater du
                                diagnostic climatisation PEB pour mettre le
                                système de climatisation en conformité et
                                obtenir un rapport de diagnostic climatisation
                                PEB qui démontre la mise en conformité.
                            </li>
                        </ol>
                    </div>
                </template>
            </RegulationComp>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Alert as AAlert } from 'ant-design-vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { onMounted, ref } from 'vue';
    import RegulationComp from '../../Components/RegulationComp.vue';
    import Info from '@/components/Icon/Info.vue';

    const emit = defineEmits(['component', 'prev']);
    const windowWidth = ref<any>(window.innerWidth);
    let showObligation = ref<boolean>(false);

    onMounted(() => {
        resize();
    });

    function resize() {
        window.onresize = () => {
            windowWidth.value = window.innerWidth;
        };
    }
</script>

<style lang="scss" scoped>
    .info-content {
        @apply mb-[10px];
    }
    .obligation {
        @apply flex items-center gap-[15px] font-bold;
    }

    .order-list {
        @apply list-decimal p-[15px];
    }
    .powerMore {
        @apply p-0;
    }
</style>
