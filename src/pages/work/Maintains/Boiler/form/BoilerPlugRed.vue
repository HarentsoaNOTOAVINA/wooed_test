<template>
    <div class="boilerPlugRed">
        <div class="plugRed__brussell">
            <Paragraphe>{{ textContent }}</Paragraphe>
            <div class="alert-next">
                <Paragraphe class="font-bold"
                    >Le nouveau contrôle devra avoir lieu au plus tard le
                    {{
                        props.region == 'Bruxelles-Capitale' ||
                        props.region == 'Wallonie'
                            ? moment(props.dateNext)
                                  .add(5, 'months')
                                  .format('L')
                            : moment(props.dateNext)
                                  .add(3, 'months')
                                  .format('L')
                    }}
                </Paragraphe>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { onMounted, ref } from 'vue';
    import moment from 'moment';

    const props = defineProps({
        region: {
            type: String,
        },
        dateNext: {
            type: String,
        },
    });

    let textContent = ref<string>(
        'Le propriétaire dispose de 5 mois pour mettre l’appareil en conformité et organiser un nouveau contrôle .'
    );

    onMounted(() => {
        switch (props.region) {
            case 'Bruxelles-Capitale':
                textContent.value =
                    'Le propriétaire dispose de 5 mois pour mettre l’appareil en conformité et organiser un nouveau contrôle';
                break;

            case 'Flandre':
                textContent.value =
                    'Als na de onderhoudsbeurt uit het reinigings- en/of verbrandingsattest blijkt dat het centrale stooktoestel niet in goede en veilige staat van werking verkeert, of dat herstellingen aan het rookgasafvoerkanaal, het stooklokaal of het centrale stooktoestel noodzakelijk zijn, dan hebben de gebruiker en de eigenaar de plicht om het rookgasafvoerkanaal, het stooklokaal of het centrale stooktoestel binnen de drie maanden na de datum van het reinigings- en/of verbrandingsattest in orde te brengen en om hiervan het bewijs te leveren. Dit bewijs bestaat uit een nieuw attest waaruit minstens blijkt dat deze tekortkoming verholpen werd en dat de meetresultaten van een nieuwe verbrandingscontrole bevat (Besluit van de Vlaamse Regering van 8 december 2006 betreffende het onderhoud en het nazicht van centrale stooktoestellen voor de verwarming van gebouwen of voor de aanmaak van warm verbruikswater, art. 10, par. 2)';
                break;

            case 'Wallonie':
                textContent.value =
                    "le propriétaire ou l'utilisateur, selon cas, fait réparer ou adapter les éléments de ladite installation étant à l'origine de la non conformité dans les cinq mois. Au terme de ce délai, un nouveau contrôle est effectué. Si l'installation est à nouveau déclarée non conforme, elle est mise à l'arrêt et ne peut être remise en fonctionnement qu'au terme d'un nouveau contrôle concluant à la conformité de l'installation. Dans des logements d'habitation, par dérogation à l'alinéa 2, une installation de chauffage central déclarée non conforme au terme du contrôle périodique peut être maintenue en service, une seule fois et pendant une période de maximum trois mois comprise entre les mois de septembre et avril, sauf si le fonctionnement de l'installation risque de porter un préjudice à la sécurité des personnes (29 janvier 2009 Arrêté du Gouvernement wallon tendant à prévenir la pollution atmosphérique provoquée par les installations de chauffage central destinées au chauffage de bâtiments ou à la production d'eau chaude sanitaire et à réduire leur consommation énergétique, art. 13, §5)";
                break;

            default:
                break;
        }
    });
</script>

<style scoped lang="scss">
    .alert-next {
        @apply mt-[25px] bg-[red] p-[5px] rounded-[8px];
    }
</style>
