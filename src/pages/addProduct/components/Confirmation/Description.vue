<template>
    <div class="confirmation-base">
        <div class="confirmation-base__item">
            <!-- <Paragraphe>{{ props.data.details }}</Paragraphe> -->
            <Paragraphe>
                <span v-if="props.data.propertyType">{{
                    getPropertyType(props.data.propertyType, propertyType)
                }}</span>
                d’une superficie habitable d’environ
                <span v-if="props.data.livingArea"
                    >{{ props.data.livingArea }} m²,
                </span>
                avec
                <span v-if="props.data.thepropertyFeatures">
                    <template
                        v-for="(feat, idFeat) in props.data.thepropertyFeatures"
                        :key="idFeat"
                    >

                     <span v-for="(item, index) in feat.features" :key="index">
                        {{ getDetails(item.feature , features.data)['name'] }},
                     </span>
                        <!-- <span v-for="(item, index) in feat" :key="index">
                            <span v-if="item.feature">
                                {{ getDetails(item.feature, features) }},</span
                            >
                        </span> -->
                    </template>
                </span>

                <span v-if="props.data.options">
                    <template
                        v-for="(opt, idOpt) in props.data.options"
                        :key="idOpt"
                    >   
                        <span>{{ opt.name  }}</span> 
                        <span v-if="opt.name.toLowerCase()==='garage'.toLowerCase()"> 
                            <span v-if="+opt.garageNumberPlace > 0">
                                <span> {{ opt.garageNumberPlace }}</span> place<span v-if="+opt.garageNumberPlace > 1">s</span> de parking
                            </span>
                        </span>
                        <span v-if="idOpt+1 < props.data.options.length">, </span>
                        <span v-else>.</span>
                    </template>
                </span>
                Le bien a obtenu le résultat énergétique « A+ »<span
                    v-if="!props.data.cadastre"
                    >,</span
                >
                <span v-if="props.data.cadastre"
                    >le revenu cadastral non-indexé est de
                    {{ props.data.cadastre }}.</span
                >
            </Paragraphe>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { computed } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    const propertyType = computed(
        () => store.getters['AddProductModule/getPropertyType']
    );
    const features = computed(
        () => store.getters['AddProductModule/getFeatures']
    );
    const options = computed(
        () => store.getters['AddProductModule/getOptions']
    );

    const props = defineProps({
        data: {
            type: Object,
            default: () => {},
        },
    });

    function getPropertyType(idPorperty: number, data: Array<any>): string {
            return data.find((elem) => elem.id === idPorperty)['name'];
    }

    function getDetails(id: number, data: Array<any>) {
        return data.find(item => item.id === id);
    }
</script>

<style lang="scss" scoped>
    .confirmation-base {
        padding: 15px;
        background-color: var(--color-gray);
        border-radius: 8px;
    }
</style>
