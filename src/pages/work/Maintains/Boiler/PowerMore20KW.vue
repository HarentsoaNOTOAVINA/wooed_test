<template>
    <div class="powerMore__container">
        <div class="powerMore__section">
            <RegulationComp
                titleComp="Puissance plus 20KW"
                class="powerMore"
                :dataRegulationMaintainsTank="powerBoilerMore20KW"
                @prev="$emit('prev')"
            >
                <template #SlotTop
                    ><Paragraphe class="obligation"
                        >Voir les obligations de l'utilisateur
                        <Info
                            class="cursor-pointer"
                            @click="showObligation = !showObligation"
                    /></Paragraphe>
                    <div class="obligation-content" v-if="showObligation">
                        <Paragraphe class="font-semibold"
                            >De gebruiker van een centraal stooktoestel moet:
                        </Paragraphe>
                        <ol class="order-list">
                            <li>
                                uitsluitend de brandstof gebruiken waarvoor dit
                                toestel gebouwd en afgesteld is
                            </li>
                            <li>
                                het nodige doen om dit toestel steeds in goede
                                en veilige staat van werking te houden
                            </li>
                            <li>
                                de gebruikersinstructies van de fabrikant van
                                het centrale stooktoestel respecteren
                            </li>
                            <li>
                                Het centraal stooktoestel periodiek een
                                onderhoudsbeurt laten geven
                            </li>
                            <li>
                                zodanig stoken dat de hinder en de uitstoot aan
                                verontreinigende stoffen zo klein mogelijk is
                            </li>
                        </ol>
                    </div>
                </template>
            </RegulationComp>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { onMounted, ref } from 'vue';
    import RegulationComp from '../../Components/RegulationComp.vue';
    import { powerBoilerMore20KW } from './dataBoiler/dataPowerMore20';
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
</style>
