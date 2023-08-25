<template>
    <div v-if="connectionSupplier">
        <div style="overflow-x: auto">
            <table class="tabs">
                <thead>
                    <tr>
                        <td
                            v-for="(item, index) in connectionSupplierTitle"
                            :key="index"
                        >
                            {{ item.title }}
                        </td>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in connectionSupplier" :key="index">
                    <tr>
                        <td>
                            {{ item.title }}
                        </td>
                        <td>
                            <div class="title-btn">
                                <Paragraphe class="title-btn__text">{{
                                    item.type
                                }}</Paragraphe>
                            </div>
                        </td>
                        <td style="width: 150px">
                            {{ item.price }}
                        </td>
                        <td>
                            <div
                                class="link"
                                v-if="item.link && !item.redirect"
                            >
                                <a :href="item.link" target="_blank">{{
                                    item.label
                                }}</a>
                            </div>
                            <div
                                v-else-if="item.redirect === 'map'"
                                class="link-form"
                            >
                                <div
                                    @click="
                                        handleShowControlAgree(item.redirect)
                                    "
                                    type-button="gray"
                                    class="link"
                                >
                                    {{ item.label }}
                                </div>
                                <div class="link__info">
                                    {{ item.link && item.link }}
                                </div>
                            </div>
                            <div
                                v-else-if="item.redirect === 'Commander'"
                                @click="handleCommand()"
                                type-button="gray"
                                class="link"
                            >
                                {{ item.redirect }}
                            </div>
                            <div
                                v-else-if="item.redirect === 'Voir la liste'"
                                @click="handleShowControlList()"
                                type-button="gray"
                                class="link"
                            >
                                {{ item.redirect }}
                            </div>
                            <div class="link" v-else>
                                {{ item.label }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { computed, PropType, watch } from 'vue';

    const props = defineProps({
        connectionSupplier: {
            type: Object as PropType<any>,
            default: [
                {
                    label: '',
                    type: '',
                    price: '',
                    link: '',
                },
            ],
        },
        connectionSupplierTitle: {
            type: Object,
        },
    });

    const emit = defineEmits<{
        (event: 'openForm'): void;
        (event: 'openList'): void;
    }>();

    function handleShowControlAgree(redirect: string | any) {
        emit('openForm');
    }

    function handleShowControlList() {
        emit('openList');
    }

    function handleCommand() {
        console.log('command');
    }
</script>

<style lang="scss" scoped>
    table {
        width: 100%;
        background-color: #fff;
        border: 0.5px solid var(--color-gray);
        th {
            width: 100%;
        }
        td {
            border: 0.5px solid var(--color-gray);
            padding: 18px;
            font-weight: 600;
            text-transform: capitalize;
            height: 0;
        }
    }
    .title-btn {
        @apply flex flex-col justify-between gap-[10px] w-[100%] h-[100%];
        &__text {
            text-align: start;
            font-weight: 300;
        }
    }
    .link {
        color: var(--color-primary);
        font-weight: 300;
        cursor: pointer;
        &__info {
            cursor: auto;
            font-weight: 300;
        }
    }
    .link-form {
        @apply flex flex-col gap-[18px];
    }
</style>
