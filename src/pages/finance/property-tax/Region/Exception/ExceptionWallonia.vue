<template>
    <div class="property-tax__items">
        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span>
                            Les réserves naturelles ou forestières
                        </span>
                    </label>
                    <Switch
                        name="Les réserves naturelles ou forestières"
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label=""
                        class="property-tax__form-item"
                        @handle-switch="handleValue"
                    />
                </div>
            </div>
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span>
                            les entreprises bénéficiant de prime à l'investissement de la part de la Région wallonne (exonération temporaire).
                        </span>
                    </label>
                    <Switch
                        name="les entreprises bénéficiant de prime à l'investissement de la part de la Région wallonne (exonération temporaire)."
                        checked-name="OUI"
                        unchecked-name="NON"
                        item-label=""
                        class="property-tax__form-item"
                        @handle-switch="handleValue"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';

    import useCmp from '../useCmp';
    const exception = ref<object>({});

    const emit = defineEmits<{
        (fn: 'on-get-json-value', v: string): void;
    }>()
    function handleValue(obj: any) {
        Object.keys(obj).forEach((key: string) => {
            const value = obj[key];
            exception.value = {
                ...exception.value,
                [key]: value
            };
        })
        emit("on-get-json-value", JSON.stringify(exception.value))
    }

    let { InfoIcon, Switch } = useCmp();
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    @import '@/assets/style/precompte.scss';
    table {
        border-collapse: collapse;
    }
    td,
    th {
        border: 1px solid var(--color-primary);
        @apply p-[10px];
    }
    th {
        @apply bg-gray;
    }
    .options {
        @apply bg-gray p-[10px];
        border-radius: 8px;
        &__label {
            font-weight: 400 !important;
        }
    }
</style>
