<template>
    <div class="property-tax__items">
        <div class="property-tax__form-item-wrap">
            <div class="property-tax__haschild">
                <div class="property-tax__child">
                    <label>
                        <span>
                            verbouwing van een handelspand in een winkelarm
                            gebied
                        </span>
                        <InfoIcon
                            @click="
                                $emit('on-modal-handled', 'flanders_1')
                            "
                        />
                    </label>
                    <Switch
                        name="verbouwing van een handelspand in een winkelarm gebied"
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
                            verbouwing van een handelspand in kernwinkelgebied
                        </span>
                        <InfoIcon
                            @click="
                                $emit('on-modal-handled', 'flanders_2')
                            "
                        />
                    </label>
                    <Switch
                        name="verbouwing van een handelspand in kernwinkelgebied"
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
                            sloop en vervanging van een ongeschikte of
                            onbewoonbare woning
                        </span>
                        <InfoIcon
                            @click="
                                $emit('on-modal-handled', 'flanders_3')
                            "
                        />
                    </label>
                    <Switch
                        name="sloop en vervanging van een ongeschikte of onbewoonbare woning"
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
                            sloop en vervanging van een leegstaande of
                            verwaarloosde bedrijfsruimte
                        </span>
                        <InfoIcon
                            @click="
                                $emit('on-modal-handled', 'flanders_4')
                            "
                        />
                    </label>
                    <Switch
                        name="sloop en vervanging van een leegstaande of verwaarloosde bedrijfsruimte"
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
                            Bijzondere bestemming van het onroerend goed (PM)
                        </span>
                    </label>
                    <Switch
                        name="Bijzondere bestemming van het onroerend goed (PM)"
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
                            natuurreservaten
                        </span>
                        <InfoIcon
                            @click="
                                $emit('on-modal-handled', 'flanders_6')
                            "
                        />
                    </label>
                    <Switch
                        name="natuurreservaten"
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
                            monumenten
                        </span>
                        <InfoIcon
                            @click="
                                $emit('on-modal-handled', 'flanders_7')
                            "
                        />
                    </label>
                    <Switch
                        name="monumenten"
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
                            Vrijstelling van de onroerende voorheffing voor jeugdwerkorganisaties en jeugdverblijfscentra (PM)
                        </span>
                    </label>
                    <Switch
                        name="Vrijstelling van de onroerende voorheffing voor jeugdwerkorganisaties en jeugdverblijfscentra (PM)"
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
