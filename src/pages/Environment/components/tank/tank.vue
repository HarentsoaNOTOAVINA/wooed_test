<script lang="ts" setup>
    import { ref, reactive, onMounted, computed } from 'vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Layout from '../layout.vue';
    import {itineraire} from '@/utils/google/direction';
    import { TANK_LOCATION, TANK_CAPACITY_BRUXELLE } from './data';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';

    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const text = reactive({
        title: 'Formulaire de déclaration',
        locationTitle: 'La citerne',
        capacityTitle: 'Contenance de la citerne',
    });
    const defaultValues = computed(
        () => store.getters['EnvironmentModule/getTankDeclarationData']
    );
    function handleCapacityRadio({ target }: any) {
        store.commit('EnvironmentModule/setTankCapacity', target.value);
    }
    function handleLocationRadio({ target }: any) {
        store.commit('EnvironmentModule/setTankLocation', target.value);
    }
    function handleNextButton() {
        router.push(`/environnement/${route.params.id}/declaration-citerne`);
    }

</script>
<template>
    <Layout
        :title="text.title"
        :buttons="[
            {
                label : 'suivant',
                handler : handleNextButton
            }
        ]"
    >
        <template #body>
                <!-- ================================== -->
            <div class="tank-body">
            <div class="tank-form-placement">
                <div class="form-title">
                    <Paragraphe>{{ text.locationTitle }}</Paragraphe>
                    <hr />
                </div>

                <Radio
                    class="form-radio"
                    :element="TANK_LOCATION"
                    align="veritcal"
                    name="location"
                    :default-value="defaultValues?.location"
                    @get-radio-input="handleLocationRadio"
                />
            </div>
            <div class="tank-form-capacity">
                <div class="form-title">
                    <Paragraphe>{{ text.capacityTitle }}</Paragraphe>
                    <hr />
                </div>
                <Radio
                    class="form-radio"
                    :element="TANK_CAPACITY_BRUXELLE"
                    align="veritcal"
                    name="location"
                    :default-value="defaultValues?.capacity"
                    @get-radio-input="handleCapacityRadio"
                />
            </div>
        </div>
            <!-- ============================================= -->
        </template>
    </Layout>
</template>
<style lang="scss" scoped>
    .tank {
        &-body{
            @apply flex flex-col;
        }
        &-title {
            &:first-child {
                @apply mb-2;
            }
            color: var(--color-gray-icon);
        }
       
        &-form {
            &-placement,
            &-capacity {
                @apply mt-5;
                @screen sm {
                    flex: 1;
                }
                @screen md {
                    @apply mx-10  mt-10;
                }
                :deep() {
                    .ant-radio-wrapper {
                        font-size: 1rem;
                        font-weight: 500;
                        @apply py-1;
                    }
                }
                .form {
                    &-title {
                        color: var(--color-stroke-gray);
                        @apply mb-5;
                    }
                }
            }
        }
    }
</style>
