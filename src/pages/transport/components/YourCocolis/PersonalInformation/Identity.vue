<template>
    <CardWrapper class="identity__container">
        <div class="identity__title">
            <Title
                type="h2"
                weight="600"
                label="Piece d’identité"
                class="identity__title-content"
            />
        </div>

        <div class="identity__items">
            <Alert class="identity__alert">
                <Paragraphe>
                    Pour garantir une validation rapide des documents,
                    transmettez des photos ou des scans :
                </Paragraphe>

                <ul>
                    <li>
                        En couleur : les documents noir et blanc ne seront pas
                        acceptes.
                    </li>

                    <li>
                        Complets : toutes les pages sont présentes, aucune
                        information n’est masquée ou trompée.
                    </li>

                    <li>
                        Lisibles et de bonne qualité : ni flou, ni sombre, ni
                        abime et sans reflet.
                    </li>
                </ul>

                <Paragraphe> Formats acceptés: JPG. </Paragraphe>

                <Paragraphe> La taille maximale par image est 5MB. </Paragraphe>
            </Alert>
            <Transition appear name="fadeHeight" mode="out-in">
                <Paragraphe>
                    {{ typeViewPrg }}
                </Paragraphe>
            </Transition>

            <Select
                name="select"
                placeholder="Sélectionner une pièce d'identité"
                :options="options"
                @change-select="handleChange"
            />

            <Paragraphe>
                La piece d’identite doit etre au nom du titulaire du compte
                Cocolis. Si ce n’est pas le cas, modifiez les informations
                personnelles avant de transmettre le document.
            </Paragraphe>

            <UploadImage />

            <div class="identity__button">
                <Button> Envoyer le document </Button>
            </div>
        </div>
    </CardWrapper>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { ref } from 'vue';

    interface Option {
        value: string;
        label: string;
    }

    const typeParagraphe: any = {
        "Carte d'identité - recto verso":
            'Assurez-vous que vous avez bien selectionner le recto et le verso avant de cliquer sur le bouton “Envoyer le document”',
        'Permis de conduire - recto verso':
            "Si votre permis est trop abîmé, préférez un autre type de document. Si c'est un permis récent (format carte), assurez-vous que vous avez bien sélectionné le recto ET le verso avant de cliquer sur le bouton “Envoyer le document”.",
        Passeport:
            'Veillez à bien transmettre la page du haut et la page du bas. Les informations personnelles, la signature et le numéro de passeport doivent être visibles.',
        'Titre de séjour - recto verso':
            'Assurez-vous que vous avez bien sélectionné le recto ET le verso avant de cliquer sur le bouton “Envoyer le document”. Seuls les titres de séjour (carte) sont acceptés, les demandes de titre de séjour (formulaire papier) seront refusées.',
    };

    const typeViewPrg = ref();

    const options = ref<Option[]>([
        {
            value: "Carte d'identité - recto verso",
            label: "Carte d'identité - recto verso",
        },
        {
            value: 'Permis de conduire - recto verso',
            label: 'Permis de conduire - recto verso',
        },
        {
            value: 'Passeport',
            label: 'Passeport',
        },
        {
            value: 'Titre de séjour - recto verso',
            label: 'Titre de séjour - recto verso',
        },
    ]);

    const handleChange = function (value: any) {
        console.log(typeParagraphe[value.select]);
        for (const key in typeParagraphe) {
            if (value.select === key) {
                typeViewPrg.value = typeParagraphe[value.select];
            }
        }
    };
</script>

<style lang="scss" scoped>
    .identity {
        &__container {
            @apply flex flex-col gap-[14px];
        }
        &__title {
            @apply flex justify-between items-center gap-[14px];
        }
        &__title-content {
            @apply text-[14px];
        }
        &__items {
            @apply flex flex-col gap-[14px];
        }
        &__alert {
            li {
                padding-left: 1em;
                @apply relative;
                &::before {
                    content: '.';
                    @apply text-[20px] absolute left-[2px] -top-[11px];
                }
            }
        }
        &__button {
            @apply flex justify-end;
        }
    }
    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.3s ease-in-out;
        max-height: 200px;
    }

    .fadeHeight-enter-from,
    .fadeHeight-leave-to {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0px;
    }
</style>
