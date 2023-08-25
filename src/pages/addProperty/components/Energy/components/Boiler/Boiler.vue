<template>
    <CardWrap :title="data.title">
        <div v-for="(item, index) in data.content" :key="index">
            <RadioGroup
                v-if="item.type === 'radio'"
                :name="item.name"
                :items="(item.options as any)"
                :label="item.label"
                :default-value="params[item.name]"
                @change="handleChange($event, item.label)"
            />
            <div v-if="item.type === 'file'">
                <label for="" class="energy-label">{{ item.label }}</label>
                <UploadImage
                    :name="item.name"
                    @upload-single-with-name="handleChange($event, 'certificat de contrôle de la chaudière')"
                    :max-count="1"
                    :default-file-list="defaultFile[item.name]"
                />
            </div>
            <Input
                v-if="item.type === 'number'"
                :label="item.label"
                :name-input="item.name"
                :input-type="item.type"
                unity="€"
                placeholder="0"
                :vmodel="params[item.name]"
                @input="handleChange($event, item.label)"
            />
        </div>
    </CardWrap>
</template>

<script setup lang="ts">
    import RadioGroup from '@/components/Common/RadioGroup/RadioGroup.vue';
    import CardWrap from '../CardWrap.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Input from '@/components/Common/Input/Input.vue';

    import { data } from './data';
    import { ref, onMounted, watch, computed } from 'vue';
    import { valueParams } from '@/pages/addProperty/utils/default-value';
    import store from '@/store';

    const params = ref<any>({
        isBoilerConforme: false,
    });
    const emit = defineEmits(['change']);
    // const defaultFile = ref<any>([]);
    const defaultFile = valueParams((data as any).content); // Obtenez la valeur du getter
    

    onMounted(async () => {
        params.value = valueParams((data as any).content);
    });



    const handleChange = function (value: object, label: any) {
        params.value = {
            ...params.value,
            ...value,
        };
        
        emit('change', params.value, label);
    };
</script>

<style lang="scss" scoped>
    .energy-label {
        @apply font-[600] text-grayIcon mb-[10px] block;
    }
</style>
