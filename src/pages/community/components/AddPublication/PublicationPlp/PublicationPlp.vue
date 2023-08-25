<template>
    <div class="plp">
        <a-drawer
            :visible="visible"
            title="Partenariat Local de Prévention (PLP)"
            placement="right"
            @close="$emit('close')"
            class="plp__drawer"
            :get-container="false"
        >
            <div>
                <div
                    class="plp__partner-wrap-content"
                    v-for="(p, index) in dataElement"
                    :key="index"
                >
                    <div class="plp__partner-flex-field">
                        <div
                            class="plp__partner-input"
                            v-for="(flex, i) in p.contentFlex"
                            :key="i"
                        >
                            <Input
                                :placeholder="flex.placeholder"
                                :nameInput="flex.name"
                                @input="hanldleChangeInput"
                            />
                        </div>
                    </div>
                    <h3 class="plp__partner-title" v-if="p.title">
                        {{ p.title }}
                    </h3>
                    <p class="plp__partner-condition-list" v-if="p.label">
                        {{ p.label }}
                    </p>
                    <div v-if="p.textarea">
                        <div
                            class="plp__partner-input"
                            v-for="(t, indexT) in p.textarea"
                            :key="indexT"
                        >
                            <TextArea
                                :placeholder="t.placeholder"
                                :nameInput="t.name"
                                @handleChange="hanldleChangeInput"
                            />
                        </div>
                    </div>
                    <div v-if="p.select">
                        <Select
                            :name="`${p.selectValue}`"
                            :options="p.select"
                            placeholder="Selectionner"
                        />
                        <!-- <AppSelect
                            container-class="plp__partner-input"
                            :options="p.select"
                            :name="p.selectValue"
                            :value="-1"
                            @handleSelect="hanldleChangeInput"
                        /> -->
                        <div class="plp__partner-input">
                            <Input
                                placeholder="autre"
                                :nameInput="`${p.other}`"
                                @input="hanldleChangeInput"
                            />
                        </div>
                    </div>
                    <div v-if="p.creationRaison">
                        <Select
                            name="creationReasons"
                            :options="p.creationRaison"
                            placeholder="Raison de la création"
                            mode="tags"
                            @change-select="hanldleChangeInput"
                        />
                    </div>
                    <div v-if="p.content">
                        <div
                            class="plp__partner-input"
                            v-for="(c, indexC) in p.content"
                            :key="indexC"
                        >
                            <label
                                for=""
                                class="plp__partner-label-title"
                                v-if="c.label"
                                >{{ c.label }}
                            </label>
                            <div v-if="c.textarea">
                                <TextArea
                                    v-for="(ct, indexCt) in c.textarea"
                                    :key="indexCt"
                                    :placeholder="ct.placeholder"
                                    :nameInput="ct.name"
                                    @handleChange="hanldleChangeInput"
                                />
                            </div>
                            <div v-if="c.inputField">
                                <div
                                    class="plp__partner-input"
                                    v-for="(f, indexF) in c.inputField"
                                    :key="indexF"
                                >
                                    <Input
                                        :placeholder="f.placeholder"
                                        :nameInput="f.name"
                                        @input="hanldleChangeInput"
                                        :type="f.type ? f.type : 'text'"
                                    />
                                </div>
                            </div>
                            <div v-if="c.contentChild">
                                <div
                                    v-for="(cc, indexCc) in c.contentChild"
                                    :key="indexCc"
                                >
                                    <label class="plp__partner-label-title"
                                        >{{ cc.label }}
                                    </label>
                                    <div v-if="cc.select">
                                        <Select
                                            :name="`${cc.selectValue}`"
                                            :options="cc.select"
                                            placeholder="Selectionner"
                                            @change-select="hanldleChangeInput"
                                        />
                                        <div class="plp__partner-input">
                                            <Input
                                                placeholder="autre"
                                                :nameInput="cc.other"
                                                @input="hanldleChangeInput"
                                            />
                                        </div>
                                    </div>
                                    <div v-if="cc.textarea">
                                        <TextArea
                                            v-for="(
                                                cct, indexCct
                                            ) in cc.textarea"
                                            :key="indexCct"
                                            :placeholder="cct.placeholder"
                                            :nameInput="cct.name"
                                            @handleChange="hanldleChangeInput"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="p.description">
                        <p class="plp__partner-warning">
                            {{ p.description }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="plp__partner-pub-desc">
                <label class="plp__partner-label-title">
                    Fin de vote de demande de plp
                </label>
                <div class="plp__blockParty-field">
                    <div class="plp__blockParty-field-item w-100">
                        <InputDate
                            @handleDateFormat="hanldleChangeInput"
                            placeholder="Date"
                            name="dateCloture"
                        />
                    </div>
                </div>
                <TextArea
                    placeholder="Ajouter une description..."
                    nameInput="content"
                    @handleChange="hanldleChangeInput"
                />
            </div>
            <div class="modal-button">
                <Button typeButton="secondary" :disabled="loading" @click="handleSubmit">
                    <LoadingButton size="xs" v-if="loading" />
                    Publier
                </Button>
            </div>
        </a-drawer>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { CommunityService } from '@/services/communityService';
    import { Drawer as ADrawer, notification } from 'ant-design-vue';
    import { ref, watch } from 'vue';
    import { elementPartner, DataElement } from './data';

    const props = defineProps({
        visible: {
            type: Boolean,
        },
    });

    const isVisible = ref<boolean>(true);
    const dataElement = ref<Array<DataElement>>(elementPartner);
    const loading = ref<boolean>(false);
    const params = ref<any>({
        type: "plp"
    });
    const emit = defineEmits(['close']);

    watch(
        () => props.visible,
        (v: boolean) => {
            isVisible.value = v;
        },
        { immediate: true }
    );

    const hanldleChangeInput = function (value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
    };
    const handleSubmit = async function () {
        loading.value = true;
        try {
            const { data } = await CommunityService.plp(params.value);
            console.log(data);
            notification['success']({
                message: 'Succèss',
                description: 'Publié avec succès',
            });
        } catch (error) {
            console.error(error);
            notification['error']({
                message: 'Erreur',
                description: "Une erreur s'est produit",
            });
        } finally {
            loading.value = false;
        }
    };
    const hanldleChangeTextarea = function () {};
    const handleChangeSelect = function () {};
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .plp {
        &__partner {
            width: 500px;
            background-color: #fff;
            height: calc(100vh - 53px);
            position: fixed;
            right: 0;
            top: 53px;
            z-index: 9;
            border-top: 1px solid #bebebe;
            transform: translate(100%);
            transition: transform 0.25s ease;
        }
        &__partner-close {
            position: absolute;
            top: 7px;
            left: 15px;
            display: flex;
            cursor: pointer;
        }
        &__partner-flex-field {
            display: flex;
            justify-content: space-between;
            > div {
                width: calc(50% - 5px);
            }
        }
        &__partner-input {
            width: 100%;
            margin-bottom: 10px;
            input,
            textarea,
            select {
                border: 1px solid #bebebe;
                height: 30px;
                border-radius: 5px;
                font-size: 13px;
                width: 100%;
                padding: 0 10px;
                display: block;
            }
            input {
                margin-bottom: 10px;
            }
            label {
                font-size: 13px;
                margin-bottom: 0;
            }
            textarea {
                height: 50px;
                resize: none;
                margin-bottom: 10px;
            }
        }
        &__partner-title {
            font-size: 14px;
            font-weight: 600;
        }
        &__partner-wrap-content {
            // margin-bottom: 15px;
            &:deep() {
                .custom-input__fields {
                    margin-bottom: 15px;
                }
            }
        }
        &__partner-condition-list {
            font-size: 14px;
            margin-bottom: 0;
        }
        &__partner-label-title {
            font-size: 13px;
            font-weight: 600;
        }
        &__partner-warning {
            font-size: 13px;
            padding: 0 15px;
            background-color: rgb(241, 241, 241);
            border: 1px solid #bebebe;
            border-radius: 5px;
        }
        &__partner-overlay {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: var(--color-secondary);
            opacity: 0;
            left: 0;
            top: 0;
            z-index: 9;
            visibility: hidden;
            transition: opacity 0.25s ease;
        }
        &__partner-content-container {
            position: relative;
            overflow-y: auto;
            height: calc(100% - 40px);
            padding: 15px;
            margin-right: 5px;
            &::-webkit-scrollbar {
                width: 7px;
                background-color: rgb(158, 158, 158);
                border-radius: 5px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: #14223c;
                border-radius: 5px;
            }
        }
        &__partner-container {
            position: relative;
            z-index: 15;
        }
        &__partner-field-active {
            .plp__partner {
                transform: translate(0);
                transition: transform 0.25s ease;
            }
            .plp__partner-overlay {
                opacity: 0.5;
                visibility: visible;
                transition: opacity 0.25s ease;
            }
        }
        &__publication-partner-file {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            margin-bottom: 10px;
            align-items: center;
        }
        &__publication-partner-bg {
            height: 400px;
            background-color: #f4f5f7;
        }
        &__vote-accepted {
            position: relative;
        }
        &__vote-accepted-title {
            font-size: 19px;
            font-weight: bold;
        }
        &__vote-accepted-content {
            text-align: center;
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            z-index: 3;
            justify-content: center;
            top: 0;
            left: 0;
            flex-direction: column;
        }
        &:deep() {
            .ant-drawer {
                height: calc(100vh - 60px);
                top: 60px;
            }
            .ant-drawer-content-wrapper {
                box-shadow: none;
                margin-top: 1px;
            }
            .ant-drawer-body {
                @include scrollbar;
            }
        }
    }
    .modal-button {
        @apply flex justify-center mt-[15px];
    }
</style>
