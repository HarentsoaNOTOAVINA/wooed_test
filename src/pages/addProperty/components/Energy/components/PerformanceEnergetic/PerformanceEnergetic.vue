<template>
    <CardWrap :title="data.title" ref="requiredSectionRef">
        <Title type="h3" class="perf__title">Résultat PEB</Title>
        <div class="perf__wrap-field">
            <template v-for="(item, index) in data.content" :key="index">
                <Input
                    :name-input="item.name"
                    :label="item.label"
                    :input-type="item.type"
                    :required="item.required"
                    :placeholder="item.placeholder"
                    :unity="item.unity"
                    :vmodel="params[item.name]"
                    :has-error="{
                        status: error[`${item.name}`] === '',
                        errorMsg: 'Ce champ est obligatoire',
                    }"
                    @input="handleChange"
                />
            </template>
        </div>
        <ResultPEB :value="params?.primaryenergy" />
    </CardWrap>
</template>

<script setup lang="ts">
    import Input from '@/components/Common/Input/Input.vue';
    import CardWrap from '../CardWrap.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import ResultPEB from '../ResultPEB/ResultPEB.vue';

    import { data } from './data';
    import { ref, onMounted, watch } from 'vue';
    import { valueParams } from '@/pages/addProperty/utils/default-value';
    import store from '@/store';

    const props = defineProps({
        required: {
            type: Object,
            default: {},
        },
    });

    const params = ref<any>({});
    const emit = defineEmits(['change', 'data', 'refs']);
    const error = ref<any>(props.required);
    const requiredSectionRef = ref()

    onMounted(async () => {
        params.value = valueParams((data as any).content);
        
        emit('data', data.content, params.value);
        emit('refs', requiredSectionRef.value);
        
    });

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        () => {
            params.value = valueParams((data as any).content);
        },
        { immediate: true, deep: true }
    );

    watch(
        () => props.required,
        (value) => {
            error.value = value
        },
        { immediate: true }
    );

    const handleChange = function (value: object) {
        params.value = {
            ...params.value,
            ...value,
        };

        emit('change', params.value);

        console.log("perf energy >>>>", value);
        
    };
</script>

<style lang="scss" scoped>
    .perf {
        &__wrap-field {
            @apply lg:grid grid-cols-3 gap-[15px] mb-4;
        }
        &__title {
            @apply text-[16px];
            font-weight: 600;
        }
    }
</style>
