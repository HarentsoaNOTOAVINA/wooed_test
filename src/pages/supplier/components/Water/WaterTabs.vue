<template>
    <div v-if="relativeWork && supplier">
        <!-- TABLEAU DE TYPE COMPLEXE -->
        <div style="overflow-x: auto">
            <!-- DESKTOP -->
            <table class="tabs__desktop">
                <thead>
                    <th>
                        <td>
                            <Title
                                type="h6"
                                weight="600"
                                label="Type de travaux"
                                class="title"
                            />
                        </td>
                        <td colspan="100%">
                            <Title
                                type="h6"
                                weight="600"
                                label="Cout"
                                class="title"
                            />
                        </td>
                    </th>
                </thead>
                <tbody
                    v-for="(item, index) in relativeWork.content"
                    :key="index"
                >
                    <tr>
                        <td colspan="100%" rowspan="100%" style="width: 30%">
                            <div class="title-btn">
                                <Paragraphe class="title-btn__text">{{
                                    item.type
                                }}</Paragraphe>
                                <Button @click="handleClick(relativeWorkLink)">Commander</Button>
                            </div>
                        </td>
                        <td
                        >
                            {{ item.price }}
                        </td> 
                    </tr>
                </tbody>
            </table>

            <!-- MOBILE -->
            <table
                v-for="(item, index) in relativeWork.content"
                :key="index"
                class="tabs__mobile"
            >
                <tr>
                    <td colspan="100%">
                        <Title
                            type="h4"
                            weight="600"
                            label="Type de travaux"
                            class="title"
                        />
                    </td>
                </tr>
                <tr>
                    <td colspan="100%">
                        <div class="title-btn-mobile">
                            <Paragraphe class="title-btn__text">{{
                                item.type
                            }}</Paragraphe>
                            <Download />
                        </div>
                    </td>
                </tr>
                <tr v-if="!item.price">
                    <td colspan="100%">
                        <Title
                            type="h6"
                            weight="600"
                            label="Cout"
                            class="title"
                        />
                    </td>
                </tr>
                <tr>
                    <td
                        colspan="1"
                        v-for="title in item.titles"
                        :key="title"
                        class="tabs__title"
                    >
                        <Title
                            type="h4s"
                            weight="600"
                            :label="title"
                            class="element-title"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ item.price }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Download from '@/components/Icon/Download.vue';
    import { computed, PropType, watch } from 'vue';

    const props = defineProps({
        relativeWork: {
            type: Object as PropType<any>,
        },
        supplier: {
            type: String,
        },
        relativeWorkLink: {
            type: String,
        }
    });

    const subWork = computed(() => props.relativeWork.key);

    watch(
        () => props.relativeWork,
        (v) => {
            v ? console.log(v) : console.log('no response');
        },
        { immediate: true }
    );

    function handleRedirection() {
        window.open(props.relativeWork[props.supplier as string], "_blank");
    }

    function handleClick(url: string | any) {
        window.open(url, "_blank");
    }
</script>

<style lang="scss" scoped>
    .operation {
        @apply mt-[20px];
        &__btn {
            @apply flex justify-end w-full;
            &:deep() {
                button {
                    @apply w-full md:w-auto;
                }
            }
        }
    }
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
            text-align: center;
            font-weight: 600;
            text-transform: capitalize;
            height: 0;
        }
    }
    .tabs {
        &__title {
            border: 0.5px solid var(--color-gray);
            padding: 18px;
            text-align: center;
            background-color: var(--color-gray);
        }
        &__desktop {
            @apply max-[767px]:hidden;
        }
        &__mobile {
            td {
                border-bottom: 0.5px solid var(--color-gray);
                padding: 18px;
                text-align: center;
                font-weight: 600;
                text-transform: capitalize;
            }
            @apply md:hidden;
        }
        &__value {
            font-weight: 600;
        }
        &__value-key {
            text-align: start;
            color: var(--color-gray-icon);
        }
    }
    .title-btn {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        &__text {
            text-align: start;
            font-weight: 300;
        }
        @apply gap-[10px];
    }
    .title-btn-mobile {
        display: flex;
        gap: 25px;
        justify-content: space-between;
    }
    .title {
        color: var(--color-primary);
        text-align: start;
    }
    .element-title {
        color: var(--color-gray-icon);
    }
</style>
