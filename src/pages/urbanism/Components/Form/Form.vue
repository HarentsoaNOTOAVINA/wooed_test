<template>
    <div>
        <div>
            <span class="publicInquiry__firstText">{{ headText }}</span>
            <Select
                :name="selectData.name"
                :options="selectData.options"
                @change-select="handleSelect"
                placeholder="Rayou ou traçage"
            />
            <!-- ra tsy tratra d averina state.isShowInput -->
            <div v-if="isshowInput">
                <Input
                    :label="publicInquiryText.second"
                    :placeholder="publicInquiryText.placeholderInput"
                    @input="handleInput"
                    name-input="rayon"
                />
            </div>
            <Button :disabled="toggleBtnDisable" @on-click="postData"
                ><LoadingButton size="xs" v-if="btnLoad" /><span>{{
                    btnData
                }}</span></Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, watch } from 'vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const props = defineProps({
        headText: {
            type: String,
        },
        isshowInput: {
            type: Boolean,
            default: false,
        },
        butondisabled: {
            type: Boolean,
        },
        btnLoading: {
            type: Boolean,
            default: true
        },
    });

    const publicInquiryText = ref<any>({
        first: "M'avertir en cas de publication d'une enquete public",
        second: 'Rayon en km de mon domicile',
        placeholderInput: 'km',
    });

    const selectData = ref<any>({
        name: 'choiceAlert',
        options: [
            {
                label: 'Rayon en km',
                value: 'rayon',
            },
            {
                label: 'Traçer sur la carte',
                value: 'tracer',
            },
        ],
    });

    let state = reactive({
        isShowInput: false,
        doNeedDrawPolygon: false,
    });

    let toggleBtnDisable = ref<boolean>(props.butondisabled);
    let btnLoad = ref<boolean>(props.btnLoading);

    watch(
        () => props.btnLoading,
        (value) => {
            btnLoad.value = value;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => props.butondisabled,
        (value) => {
            toggleBtnDisable.value = value;
        },
        { immediate: true, deep: true }
    );
    const btnData = ref<string>("M'envoyer les coordonnées");

    const emit = defineEmits<{
        (event: 'handleSelectOption', value: object): void;
        (event: 'handleInputField', value: object): void;
        (event: 'postData', value: object): void;
    }>();

    const postData = (value: any) => {
        emit('postData', value);
    };

    const handleSelect = (value: any) => {
        emit('handleSelectOption', value);
    };

    const handleInput = (value: any) => {
        emit('handleInputField', value);
        // radius.value = value.rayon;
        // btndisabled.value = false;
    };
</script>

<style lang="scss" scoped>
    .publicInquiry {
        &__firstText {
            color: var(--color-primary);
            @apply mb-[10px] block;
        }
        &__map {
            @apply h-[258px] mt-[18px] rounded-sm;
        }
        &__list {
            @apply flex items-center justify-center;
        }
    }
</style>
