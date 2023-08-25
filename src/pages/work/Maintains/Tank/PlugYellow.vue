<template>
    <div class="plugYellow">
        <div class="plugYellow__Brussel">
            <ul>
                <li>
                    <Paragraphe>
                        Faites procéder au plus vite aux réparations nécessaires
                        mais au plus tard six mois après la date du rapport de
                        contrôle.​</Paragraphe
                    >

                    <Button theme="light"
                        >Accéder à la rubrique « Travaux à la citerne » de
                        l’appli</Button
                    >
                </li>
                <li>
                    <Paragraphe>
                        Vous pouvez continuer à utiliser le réservoir mais si
                        les réparations n’ont pas été faites dans ce délai, vous
                        devrez mettre l’installation définitivement hors
                        service. ​</Paragraphe
                    >

                    <Button theme="light"
                        >Accéder à la rubrique « Mise hors service » de
                        l’applii</Button
                    >
                </li>
            </ul>
        </div>

        <div class="plugYellow__Wallonie">
            <Paragraphe
                >Le réservoir et les tuyauteries répondent aux normes
                d’étanchéité mais la conformité n’est plus assurée.
            </Paragraphe>
            <ul>
                <li>Le réservoir ne peut être rempli que pendant six​ mois.</li>
                <li>
                    <Paragraphe>
                        Il faut remédier aux défectuosités endéans les six mois
                    </Paragraphe>
                    <Button theme="light"
                        >Accéder à la rubrique « Travaux à la citerne » de
                        l’appli</Button
                    >
                </li>
            </ul>
        </div>

        <div class="plugYellow__Flandre">
            <ul>
                <li>
                    De tank mag nog worden gevuld of bijgevuld tijdens een
                    overgangsperiode van maximum zes maanden. Die gaat in op de
                    eerste van de maand die volgt op de maand, vermeld op de
                    bedoelde oranje klever of plaat.
                </li>
                <li>
                    <Paragraphe
                        >Il faut remédier aux défectuosités endéans les six​
                        mois</Paragraphe
                    >

                    <Button theme="light"
                        >Accéder à la rubrique « Travaux à la citerne » de
                        l’appli</Button
                    >
                </li>
                <li>
                    <Paragraphe
                        >In dit geval dient een nieuwe controle te worden
                        uitgevoerd vóór het verstrijken van voormelde
                        termijn.</Paragraphe
                    >

                    <Button theme="light"
                        >Faire procéder à un contrôle de ma citerne ->
                        RETOUR</Button
                    >
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
    .plugYellow {
        &:deep() {
            Button {
                @apply font-normal text-black;
            }
        }
    }
</style>
