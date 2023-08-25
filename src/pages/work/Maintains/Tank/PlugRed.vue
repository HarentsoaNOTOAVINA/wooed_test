<template>
    <div class="plugRed">
        <div class="plugRed__Brussel">
            <ul>
                <li>
                    Faites immédiatement vider, dégazer et nettoyer le
                    réservoir.
                </li>
                <li>
                    <Paragraphe
                        >Evacuez les déchets générés via un opérateur
                        autorisé en Région de Bruxelles-Capitale (ce sont des
                        déchets dangereux)
                    </Paragraphe>

                    <Button theme="light"
                        >Accéder à la rubrique « Faire nettoyer le réservoir et
                        évacuez les déchets dangereux  » de l’appli
                    </Button>
                </li>
                <li>
                    <Paragraphe
                        >Faites réaliser une reconnaissance de l’état du sol.
                    </Paragraphe>

                    <Button theme="light"
                        >Accéder à la rubrique « Faire une reconnaissance de
                        l’état du sol » de l’appli
                    </Button>
                </li>
                <li>
                    <Paragraphe
                        >. Remplacez le réservoir ou faites-le réparer par un
                        expert en installations de stockage le plus vite
                        possible (maximum 6 mois). 5. Dans ce cas, transmettez à
                        Bruxelles Environnement les attestations de réparation
                        dans les 8 jours.
                    </Paragraphe>

                    <Button theme="light"
                        >Accéder à la rubrique « Faire une reconnaissance de
                        l’état du sol » de l’appli
                    </Button>
                </li>
                <li>
                    <Paragraphe
                        >Si le réservoir ne peut plus être réparé, vous devez le
                        mettre définitivement hors service en suivant la
                        procédure adéquate. 
                    </Paragraphe>

                    <Button theme="light"
                        >Accéder à la rubrique « Faire une reconnaissance de
                        l’état du sol » de l’appli
                    </Button>
                </li>
            </ul>
        </div>

        <div class="plugRed__wallonie">
            <ul>
                <li>Le réservoir ne pourra pas être rempli</li>
                <li>
                    <Paragraphe>le réservoir peut être réparé </Paragraphe>

                    <Button theme="light"
                        >Accéder à la rubrique « Travaux à la citerne » de
                        l’appli
                    </Button>
                </li>
                <li>
                    <Paragraphe
                        >le réservoir peut également être mis hors service
                    </Paragraphe>

                    <Button theme="light"
                        >Accéder à la rubrique « Mise hors service de la citerne
                        » de l’appli
                    </Button>
                </li>
                <li>
                    <Paragraphe>
                        le réservoir doit faire l’objet d’un nouveau contrôle.
                    </Paragraphe>

                    <Button theme="light"
                        >Faire procéder à un contrôle de ma citerne -> RETOUR
                    </Button>
                </li>
            </ul>
        </div>

        <div class="plugRed__Flandre">
            <ul>
                <li>
                    Het is verboden houders waarvan de vulleiding voorzien is
                    van een rode klever of plaat, bedoeld in artikel 5.17.3.17,
                    te vullen of te laten vullen.
                </li>
                <li>
                    <Paragraphe>
                        Binnen de veertien dagen nadat een rode klever of plaat
                        aangebracht werd maakt de exploitant of op zijn verzoek
                        de erkende milieudeskundige hiervan melding bij de
                        afdeling van de Vlaamse Milieumaatschappij bevoegd voor
                        grondwater.
                    </Paragraphe>

                    <Button theme="light"
                        >Envoyer une copie du rapport à la « Vlaamse
                        Milieumaatschappij “
                    </Button>
                </li>
                <li>
                    <Paragraphe>
                        De exploitant dient alle nodige maatregelen te treffen,
                        overeenkomstig het verslag van de erkende
                        milieudeskundige, om de opslaginstallatie terug in goede
                        staat te brengen
                    </Paragraphe>

                    <Button theme="light"
                        >Accéder à la rubrique « Travaux à la citerne » de
                        l’appli
                    </Button>
                </li>
                <li>
                    <Paragraphe>
                        Na vakkundige herstelling mag de houder slechts opnieuw
                        in gebruik worden genomen indien een attest werd
                        afgeleverd door een milieudeskundige erkend in de
                        discipline houders voor gassen of gevaarlijke stoffen of
                        door een bevoegd deskundige of voor de opslag van P3-
                        en/of P4-producten bestemd voor de verwarming van
                        gebouwen door een erkend technicus. Hieruit moet
                        ondubbelzinnig blijken dat de houder en de installatie
                        voldoen aan de voorschriften van VLAREM II
                    </Paragraphe>

                    <Button theme="light"
                        >Faire procéder à un contrôle de ma citerne -> RETOUR
                    </Button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
</script>

<style scoped lang="scss">
    .plugRed {
        &:deep() {
            Button {
                @apply font-normal text-black;
            }
        }
    }
</style>
