<template>
    <div>
        <RegulationComp
            v-if="region == 'Wallonie'"
            :dataRegulationMaintainsTank="regulationMaintainsTankWallonie"
            @prev="$emit('prev')"
        >
            <template #SlotrequiredAction>
                <div class="plaque">
                    <div class="plaque__title">
                        <Title
                            type="h3"
                            label="La plaquette peut être :"
                            weight="600"
                        />
                    </div>
                    <div class="plaque__card-content">
                        <div class="plaque__card">
                            <Paragraphe
                                class="text-[var(--color-green)] font-bold"
                                >Vert :</Paragraphe
                            >
                            <Paragraphe
                                >Le réservoir peut être rempli. Il ne faut
                                toutefois pas oublier que cette plaquette n’est
                                valable que pour une durée limitée à 3 ou à 10
                                ans. Une fois ce délai dépassé, il faut procéder
                                à la vérification périodique qui porte sur les
                                deux étapes : la conformité et
                                l’étanchéité.</Paragraphe
                            >
                        </div>
                        <div class="plaque__card">
                            <Paragraphe
                                class="text-[var(--color-warn)] font-bold"
                                >Orange :</Paragraphe
                            >
                            <Paragraphe
                                >Le réservoir ne peut être rempli que pendant
                                six mois. Le réservoir et les tuyauteries
                                répondent aux normes d’étanchéité mais la
                                conformité n’est plus assurée. C’est le cas si
                                le technicien agréé constate une défaillance
                                dans le dispositif anti-débordement par exemple.
                                Il faut y remédier endéans les six
                                mois.</Paragraphe
                            >
                        </div>
                        <div class="plaque__card">
                            <Paragraphe
                                class="text-[var(--color-red)] font-bold"
                                >Rouge :</Paragraphe
                            >
                            <Paragraphe
                                >Le réservoir ne peut pas ou plus être rempli.
                                Le réservoir et/ou les tuyauteries ne sont pas
                                étanches.</Paragraphe
                            >
                        </div>
                    </div>
                </div>
            </template>
        </RegulationComp>

        <RegulationComp
            v-else-if="region == 'Flandre'"
            class="regulationFlandre"
            :dataRegulationMaintainsTank="regulationMaintainsTankFlandre"
            @prev="$emit('prev')"
        />
        <RegulationComp
            v-else-if="region == 'Bruxelles-Capitale'"
            class="regulationBrussel"
            :dataRegulationMaintainsTank="regulationMaintainsTankBrussel"
            @prev="$emit('prev')"
        />

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
    import { regulationMaintainsTankBrussel } from './dataTank/regulationMaintainsTankBrussel';
    import { regulationMaintainsTankWallonie } from './dataTank/regulationMaintainsTankWallonie';
    import { regulationMaintainsTankFlandre } from './dataTank/regulationMaintainsTankFlandre';
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
